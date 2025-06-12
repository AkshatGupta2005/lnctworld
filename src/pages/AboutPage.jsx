"use client";
import React from "react";
import Navbar from "../components/Navbar";
import "./AboutPage.css";


// College logo image (update the path as per your setup)
import clgLogo from "../assets/logo.png";


// Faculties data
const faculties = [
  {
    name: "Prof. (Dr.) A. K. Jain",
    role: "Principal",
    image: "https://lnct.ac.in/wp-content/uploads/2022/12/akjain.jpg",
    about: "PhD, M.Tech, 25+ years in academic leadership."
  },
  {
    name: "Dr. S. Sharma",
    role: "Head of Department, CSE",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    about: "Expert in AI & ML, 15+ years teaching experience."
  },
  {
    name: "Dr. P. Gupta",
    role: "Head of Department, ECE",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    about: "Specialist in VLSI & Embedded Systems."
  },
  // Add more as needed
];


// Notable Alumni data
const alumni = [
  {
    name: "Siddharth Singh",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    desc: "CEO at TechNova, Forbes 30 Under 30. Led global teams in AI-driven product development."
  },
  {
    name: "Priya Mehra",
    image: "https://randomuser.me/api/portraits/women/27.jpg",
    desc: "Founder of EduBridge. Social entrepreneur recognized for educational outreach in rural India."
  },
  {
    name: "Ankit Verma",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    desc: "Lead Scientist at ISRO. Key contributor to space instrumentation and satellite launches."
  },
  {
    name: "Sneha Chatterjee",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    desc: "Senior Software Engineer at Google, USA. Advocate for women in tech and open source."
  },
];


// Options sections
const sections = [
  {
    key: "research",
    title: "Research & Patents",
    desc: "LNCT fosters a vibrant research culture, encouraging faculty and students to innovate. The institute holds several national and international patents and regularly publishes in reputed journals."
  },
  {
    key: "clubs",
    title: "Clubs & Societies",
    desc: "From technical clubs like CodeChef LNCT Chapter to cultural societies and sports teams, our students lead and participate in diverse extracurricular activities."
  },
  {
    key: "placements",
    title: "Placements",
    desc: "Top recruiters visit LNCT each year. 90%+ placement record with students placed in companies like Infosys, TCS, Amazon, and more."
  },
  {
    key: "collab",
    title: "International Collaborations",
    desc: "LNCT has signed MoUs with leading global universities and companies for student exchange, research, and collaborative projects."
  }
];


// Vision and Mission
const vision = "To be a premier technical institution fostering innovation, research, and entrepreneurship.";
const mission = [
  "Provide quality technical education to develop competent professionals.",
  "Promote research, innovation, and value-based learning.",
  "Nurture students to become responsible citizens and leaders."
];


function AboutPage() {
  return (
    <div className="lnct-page">
      <Navbar />
      {/* College Info Card (below navbar) */}
      <div className="college-info-card">
        <div className="college-logo">
          <img src={clgLogo} alt="LNCT Logo" width={60} height={60} />
        </div>
        <div>
          <div className="college-name">LNCT</div>
          <div className="college-desc">Lakshmi Narain College of Technology, Bhopal</div>
        </div>
      </div>


      {/* Vision & Mission Section */}
      <section className="vision-mission-section">
        <h2>Vision &amp; Mission</h2>
        <div className="section-content">
          <div>
            <h3>Vision</h3>
            <p>{vision}</p>
          </div>
          <div>
            <h3>Mission</h3>
            <ul>
              {mission.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* Notable Alumni Section */}
      <section className="alumni-section">
        <h2 className="section-title">Notable Alumni</h2>
        <div className="alumni-list">
          {alumni.map((alum, idx) => (
            <div className="alumni-card" key={idx}>
              <img src={alum.image} alt={alum.name} className="alumni-img" />
              <div className="alumni-name">{alum.name}</div>
              <div className="alumni-desc">{alum.desc}</div>
            </div>
          ))}
        </div>
      </section>


      {/* Each option as a separate section */}
      {sections.map(section => (
        <section className="option-section" key={section.key}>
          <h2 className="section-title">{section.title}</h2>
          <div className="option-desc">{section.desc}</div>
        </section>
      ))}


      {/* Faculties Section */}
      <section className="faculties-section">
        <h2>Our Faculties</h2>
        <div className="faculty-list">
          {faculties.map((f, idx) => (
            <div className="faculty-card" key={idx}>
              <img src={f.image} alt={f.name} />
              <h4>{f.name}</h4>
              <p><strong>{f.role}</strong></p>
              <p>{f.about}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


export default AboutPage;
