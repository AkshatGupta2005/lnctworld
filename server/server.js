import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { Pool } from "pg";
import dotenv from "dotenv";
import fs from "fs";
import { LargeObjectManager } from "pg-large-object";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    ca: fs.readFileSync("rds-ca.pem").toString(),
    rejectUnauthorized: false, // change to true in production
  },
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or "hotmail", or configure with your SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // Save to PostgreSQL
    await pool.query(
      "INSERT INTO contact_queries (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    // Send acknowledgment email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We Received Your Message",
      text: `Hi ${name},\n\nThank you for contacting us. Our team will reach out to you shortly.\n\nBest regards,\nLNCT Group`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Message sent and saved!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    // Save to PostgreSQL
    const response = await pool.query("SELECT * FROM events");
    res
      .status(200)
      .json({ success: true, message: "Event Fetched", data: response.rows });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});
app.get("/api/image/:oid", async (req, res) => {
  const client = await pool.connect();
  const oid = parseInt(req.params.oid, 10);

  if (isNaN(oid)) {
    client.release();
    return res.status(400).send("Invalid OID");
  }

  try {
    await client.query("BEGIN");
    const lom = new LargeObjectManager({ pg: client });

    lom.openAndReadableStream(oid, async (err, largeObject, length) => {
      if (err) {
        await client.query("ROLLBACK");
        client.release();
        return res.status(500).send("Failed to open large object");
      }

      res.setHeader("Content-Type", "image/jpeg");
      res.setHeader("Content-Length", length);

      const bufferSize = 16384; // 16 KB

      const readAndSend = async () => {
        try {
          const buffer = await largeObject.readAsync(bufferSize);
          if (buffer.length === 0) {
            await largeObject.closeAsync();
            await client.query("COMMIT");
            client.release();
            res.end(); // finished
            return;
          }
          res.write(buffer);
          readAndSend(); // continue reading
        } catch (err) {
          console.error("Error reading large object:", err);
          await client.query("ROLLBACK");
          client.release();
          res.status(500).send("Error reading image");
        }
      };

      readAndSend();
    });
  } catch (e) {
    console.error("Unexpected error:", e);
    await client.query("ROLLBACK");
    client.release();
    res.status(500).send("Unexpected server error");
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
