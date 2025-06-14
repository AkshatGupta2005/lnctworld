"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import "./InfoPage.css"

import { useEffect, useState } from "react"

const DigitalPage = () => {
  const [digitalPortals, setPortals] = useState([]);

  useEffect(() => {
    const fetchPortals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/digitalPortals");
        const data = await response.json();
        setPortals(data);
      } catch (error) {
        console.error("Error fetching Portals:", error);
      }
    };

    fetchPortals();
  }, []);
  return (
    <motion.div
      className="info-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="info-header">
        <div className="container">
          <h1>Digital & Academic Portals</h1>
          <p>Access our digital platforms and academic portals for enhanced learning</p>
        </div>
      </div>

      <div className="container">
        <div className="info-content">
          {digitalPortals.map((portal, index) => (
            <motion.div
              key={portal.id}
              className="info-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="info-card-image">
                <img src={portal.image || "/placeholder.svg"} alt={portal.name} />
              </div>
              <div className="info-card-content">
                <h2>{portal.name}</h2>
                <p className="info-description">{portal.description}</p>

                <div className="info-details">
                  <div className="info-detail">
                    <h3>Established</h3>
                    <p>{portal.established}</p>
                  </div>
                  <div className="info-detail">
                    <h3>Features</h3>
                    <div className="info-tags">
                      {portal.features.map((feature, i) => (
                        <span key={i} className="info-tag">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <a href={portal.website} className="btn" target="_blank" rel="noopener noreferrer">
                  Visit Portal
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="back-link">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default DigitalPage
