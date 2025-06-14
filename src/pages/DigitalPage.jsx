"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import "./InfoPage.css"

const digitalPortals = [
  {
    id: 1,
    name: "LNCT Learning Management System",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "LNCT Learning Management System is a comprehensive digital platform for online learning, course management, and student-teacher interaction.",
    features: ["Online Courses", "Virtual Classrooms", "Assessment Tools", "Learning Analytics"],
    established: 2015,
    website: "https://lnctlms.ac.in",
  },
  {
    id: 2,
    name: "LNCT Research Portal",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "LNCT Research Portal provides access to research papers, journals, and collaboration tools for researchers and students.",
    features: ["Research Repository", "Collaboration Tools", "Journal Access", "Research Analytics"],
    established: 2017,
    website: "https://lnctresearch.ac.in",
  },
  {
    id: 3,
    name: "LNCT Student Portal",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "LNCT Student Portal is a one-stop platform for students to access academic information, results, attendance, and other services.",
    features: ["Academic Records", "Fee Payment", "Attendance Tracking", "Exam Results"],
    established: 2016,
    website: "https://lnctstudent.ac.in",
  },
]

const DigitalPage = () => {
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

                 <Link 
                    to="/about" 
                    className="btn"
                  >
                    Explore More
                  </Link>
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
