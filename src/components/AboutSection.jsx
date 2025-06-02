"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import "./AboutSection.css"
import director from "../assets/director_img.png"
import secretary from "../assets/Secretary_Img.png"
import viceChair from "../assets/viceChair_img.png"
import exe_director from "../assets/executiveDir_img.png"


const timelineEvents = [
  { year: "1994", event: "Establishment of LNCT Bhopal" },
  { year: "2000", event: "Expansion with new courses and facilities" },
  { year: "2008", event: "Opening of LNCT University" },
  { year: "2012", event: "Establishment of LNCT Medical College" },
  { year: "2018", event: "Launch of Digital Learning Platforms" },
  { year: "2023", event: "Celebrating 30 years of excellence" },
]

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="about-section" id="about" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Visionaries Behind LNCT
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>
              The LNCT Group of Institutions was founded by the visionary Chouksey family with a mission to provide
              quality education and create future leaders. What started as a single institution has now grown into a
              vast educational ecosystem spanning across multiple cities.
            </p>
            <p>
              With a strong focus on academic excellence, research, and innovation, LNCT has consistently maintained its
              position as one of the premier educational groups in central India. The group's philosophy revolves around
              holistic development, combining theoretical knowledge with practical skills.
            </p>
            <p>
              Today, the LNCT Group stands as a testament to the Chouksey family's dedication to education and their
              unwavering commitment to nurturing talent and fostering growth.
            </p>
          </motion.div>

          <motion.div
            className="about-images"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="image-grid">
              <img src={director} alt="Founder" />
              <img src={exe_director} alt="Executive Director" />
              <img src={secretary} alt="New Campus" />
              <img src={viceChair} alt="Graduation Ceremony" />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h3>Our Journey</h3>
          <div className="timeline-container">
            {timelineEvents.map((event, index) => (
              <motion.div key={index} className="timeline-item" variants={itemVariants}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>{event.year}</h4>
                  <p>{event.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
