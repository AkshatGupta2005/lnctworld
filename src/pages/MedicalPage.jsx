"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import "./InfoPage.css"

const medicalInstitutions = [
  {
    id: 1,
    name: "LNCT Medical College, Bhopal",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "LNCT Medical College in Bhopal offers MBBS and other medical courses with state-of-the-art facilities and experienced faculty.",
    courses: ["MBBS", "MD", "MS", "Nursing"],
    established: 2010,
    website: "https://lnctmedical.ac.in",
  },
  {
    id: 2,
    name: "LNCT Ayurvedic College, Bhopal",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "LNCT Ayurvedic College provides education in traditional Ayurvedic medicine with modern research facilities.",
    courses: ["BAMS", "MD Ayurveda", "Panchakarma Specialist"],
    established: 2012,
    website: "https://lnctayurveda.ac.in",
  },
  {
    id: 3,
    name: "LNCT Homeopathic Medical College",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "LNCT Homeopathic Medical College offers courses in homeopathic medicine with a focus on practical training and research.",
    courses: ["BHMS", "MD Homeopathy"],
    established: 2015,
    website: "https://lncthomeopathy.ac.in",
  },
]

const MedicalPage = () => {
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
          <h1>Medical, Ayurveda & Homeopathy</h1>
          <p>Learn about our institutions offering medical, ayurvedic, and homeopathic education</p>
        </div>
      </div>

      <div className="container">
        <div className="info-content">
          {medicalInstitutions.map((institution, index) => (
            <motion.div
              key={institution.id}
              className="info-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="info-card-image">
                <img src={institution.image || "/placeholder.svg"} alt={institution.name} />
              </div>
              <div className="info-card-content">
                <h2>{institution.name}</h2>
                <p className="info-description">{institution.description}</p>

                <div className="info-details">
                  <div className="info-detail">
                    <h3>Established</h3>
                    <p>{institution.established}</p>
                  </div>
                  <div className="info-detail">
                    <h3>Courses Offered</h3>
                    <div className="info-tags">
                      {institution.courses.map((course, i) => (
                        <span key={i} className="info-tag">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <a href={institution.website} className="btn" target="_blank" rel="noopener noreferrer">
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

export default MedicalPage
