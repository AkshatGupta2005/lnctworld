"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import "./InfoPage.css"

import { useEffect, useState } from "react"

const IndustriesPage = () => {
  const [industries, setIndustries] = useState([]);
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/industries");
        const data = await response.json();
        setIndustries(data);
      } catch (error) {
        console.error("Error fetching industries:", error);
      }
    };

    fetchIndustries();
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
          <h1>Industries & Companies</h1>
          <p>Explore our industrial ventures and companies across various sectors</p>
        </div>
      </div>

      <div className="container">
        <div className="info-content">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              className="info-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="info-card-image">
                <img src={industry.image || "/placeholder.svg"} alt={industry.name} />
              </div>
              <div className="info-card-content">
                <h2>{industry.name}</h2>
                <p className="info-description">{industry.description}</p>

                <div className="info-details">
                  <div className="info-detail">
                    <h3>Established</h3>
                    <p>{industry.established}</p>
                  </div>
                  <div className="info-detail">
                    <h3>Sectors</h3>
                    <div className="info-tags">
                      {industry.sectors.map((sector, i) => (
                        <span key={i} className="info-tag">
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <a href={industry.website} className="btn" target="_blank" rel="noopener noreferrer">
                  Visit Website
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

export default IndustriesPage
