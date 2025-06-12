"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import "./InfoPage.css"
import web from "./AboutPage.jsx"

const colleges = [
  {
    id: 1,
    name: "LNCT University, Bhopal",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "LNCT University, Bhopal is a premier institution offering a wide range of undergraduate and postgraduate courses in engineering, management, pharmacy, and more.",
    courses: ["B.Tech", "M.Tech", "MBA", "BBA", "B.Pharm", "M.Pharm"],
    established: 1994,
    website: "https://lnctu.ac.in/",
  },
  {
    id: 2,
    name: "LNCT College, Indore",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "LNCT College, Indore provides quality education in various disciplines with state-of-the-art infrastructure and experienced faculty.",
    courses: ["B.Tech", "MBA", "BCA", "MCA"],
    established: 2005,
    website: "https://lnct.ac.in/indore",
  },
  {
    id: 3,
    name: "LNCT College, Jabalpur",
    image: "/placeholder.svg?height=300&width=500",
    description:
      "LNCT College, Jabalpur is known for its academic excellence and industry-oriented curriculum, preparing students for successful careers.",
    courses: ["B.Tech", "Polytechnic", "B.Ed"],
    established: 2010,
    website: "https://lnct.ac.in/jabalpur",
  },
]

const CollegesPage = () => {
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
          <h1>Colleges & Universities</h1>
          <p>Explore our prestigious colleges and universities offering a wide range of courses</p>
        </div>
      </div>

      <div className="container">
        <div className="info-content">
          {colleges.map((college, index) => (
            <motion.div
              key={college.id}
              className="info-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="info-card-image">
                <img src={college.image || "/placeholder.svg"} alt={college.name} />
              </div>
              <div className="info-card-content">
                <h2>{college.name}</h2>
                <p className="info-description">{college.description}</p>

                <div className="info-details">
                  <div className="info-detail">
                    <h3>Established</h3>
                    <p>{college.established}</p>
                  </div>
                  <div className="info-detail">
                    <h3>Courses Offered</h3>
                    <div className="info-tags">
                      {college.courses.map((course, i) => (
                        <span key={i} className="info-tag">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link to="/about" className="btn">
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

export default CollegesPage
