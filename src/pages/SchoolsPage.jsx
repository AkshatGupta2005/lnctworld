"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import "./InfoPage.css"

const schools = [
  {
    id: 1,
    name: "LNCT World School, Bhopal",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "LNCT World School in Bhopal provides quality education from kindergarten to high school with a focus on holistic development.",
    features: ["Smart Classrooms", "Sports Facilities", "Science Labs", "Arts & Music"],
    established: 2005,
    website: "https://lnctworldschool.ac.in",
  },
  {
    id: 2,
    name: "LNCT Public School, Indore",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "LNCT Public School in Indore offers a comprehensive curriculum with a blend of academics, sports, and extracurricular activities.",
    features: ["Digital Learning", "Swimming Pool", "Robotics Lab", "Performing Arts"],
    established: 2010,
    website: "https://lnctpublicschool.ac.in",
  },
  {
    id: 3,
    name: "LNCT International School, Bhopal",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "LNCT International School provides international standard education with a global perspective and modern teaching methodologies.",
    features: ["International Curriculum", "Language Labs", "Cultural Exchange", "Advanced Technology"],
    established: 2015,
    website: "https://lnctinternational.ac.in",
  },
]

const SchoolsPage = () => {
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
          <h1>Schools</h1>
          <p>Discover our schools providing quality education from kindergarten to high school</p>
        </div>
      </div>

      <div className="container">
        <div className="info-content">
          {schools.map((school, index) => (
            <motion.div
              key={school.id}
              className="info-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="info-card-image">
                <img src={school.image || "/placeholder.svg"} alt={school.name} />
              </div>
              <div className="info-card-content">
                <h2>{school.name}</h2>
                <p className="info-description">{school.description}</p>

                <div className="info-details">
                  <div className="info-detail">
                    <h3>Established</h3>
                    <p>{school.established}</p>
                  </div>
                  <div className="info-detail">
                    <h3>Features</h3>
                    <div className="info-tags">
                      {school.features.map((feature, i) => (
                        <span key={i} className="info-tag">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <a href={school.website} className="btn" target="_blank" rel="noopener noreferrer">
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

export default SchoolsPage
