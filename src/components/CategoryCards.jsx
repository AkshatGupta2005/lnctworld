"use client"

import { useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import "./CategoryCards.css"

const categories = [
  {
    id: 1,
    title: "Colleges & Universities",
    description:
      "Explore our prestigious colleges and universities offering a wide range of courses with world-class facilities.",
    icon: "🎓",
    path: "/colleges",
    gradient: "linear-gradient(135deg, #FF7F3E 0%, #FFB366 100%)",
    count: "15+ Institutions",
  },
  {
    id: 2,
    title: "Schools",
    description:
      "Discover our schools providing quality education from kindergarten to high school with modern teaching methods.",
    icon: "🏫",
    path: "/schools",
    gradient: "linear-gradient(135deg, #604CC3 0%, #8B7ED8 100%)",
    count: "25+ Schools",
  },
  {
    id: 3,
    title: "Medical, Ayurveda & Homeopathy",
    description:
      "Learn about our institutions offering medical, ayurvedic, and homeopathic education with advanced research facilities.",
    icon: "⚕️",
    path: "/medical",
    gradient: "linear-gradient(135deg, #80C4E9 0%, #A8D8EA 100%)",
    count: "8+ Medical Colleges",
  },
  {
    id: 4,
    title: "Industries & Companies",
    description: "Explore our industrial ventures and companies across various sectors driving innovation and growth.",
    icon: "🏭",
    path: "/industries",
    gradient: "linear-gradient(135deg, #FF7F3E 0%, #E06A2B 100%)",
    count: "50+ Companies",
  },
  {
    id: 5,
    title: "Digital & Academic Portals",
    description: "Access our cutting-edge digital platforms and academic portals for enhanced learning and research.",
    icon: "💻",
    path: "/digital",
    gradient: "linear-gradient(135deg, #604CC3 0%, #4A3B9A 100%)",
    count: "10+ Platforms",
  },
]

const CategoryCards = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: {
      y: 80,
      opacity: 0,
      rotateX: 45,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <section className="categories-section" id="categories">
      <div className="categories-bg">
        <div className="bg-gradient"></div>
      </div>

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            <span className="title-main">Explore Our</span>
            <span className="title-highlight">Educational Universe</span>
          </h2>
          <p className="section-subtitle">
            Discover a world of opportunities across our diverse educational institutions and innovative platforms
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="categories-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="category-card"
              variants={cardVariants}
              whileHover={{
                y: -15,
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              style={{
                "--card-gradient": category.gradient,
              }}
            >
              <div className="card-glow"></div>
              <div className="card-content">
                <div className="card-header">
                  <motion.div
                    className="category-icon"
                    whileHover={{
                      scale: 1.2,
                      rotate: 10,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {category.icon}
                  </motion.div>
                  <div className="card-count">{category.count}</div>
                </div>

                <div className="card-body">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>

                <div className="card-footer">
                  <Link to={category.path} className="category-link">
                    <span>Explore More</span>
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </motion.svg>
                  </Link>
                </div>
              </div>

              <div className="card-overlay"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CategoryCards
