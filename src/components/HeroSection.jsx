"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import "./HeroSection.css"

const HeroSection = () => {
  const mountRef = useRef(null)
  const earthRef = useRef(null)


return (
    <div className="hero-section">
      {/* Animated particles */}
      <div className="cosmic-particles">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="cosmic-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="hero-content">
        <div className="earth-container" ref={mountRef}></div>

        <div className="hero-text-container">
          <motion.div
            className="hero-text"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
          >
            <motion.div
              className="hero-title"
              initial={{ y: 50, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
            >
              <h1 className="lnct-text">
                <span className="letter">D</span>
                <span className="letter">O</span>
                <span className="letter">S</span>
                <span className="letter">A</span>
              </h1>
              <div className="cosmic-glow"></div>
            </motion.div>

            <motion.p
              className="tagline"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <span className="tagline-main">Idli</span>
              <span className="tagline-sub">Sambhar</span>
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 3.2 }}
            >
              <motion.a
                href="#universe"
                className="explore-universe-btn"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Chatni Chatni</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
        
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="cosmic-scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 4 }}
      >
        <motion.div
          className="scroll-cosmic-arrow"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
        <span>Journey into the Universe</span>  
      </motion.div>
    </div>
  )
}

export default HeroSection
