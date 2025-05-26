"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import "./HeroSection.css"

const HeroSection = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const currentMount = mountRef.current

    // Basic Three.js setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    currentMount.appendChild(renderer.domElement)

    // Load globe texture
    const textureLoader = new THREE.TextureLoader()
    const earthTexture = textureLoader.load(
      "/textures/Untitled (4).png"
    )

    const geometry = new THREE.SphereGeometry(1.2, 64, 64)
    const material = new THREE.MeshStandardMaterial({ map: earthTexture })
    const globe = new THREE.Mesh(geometry, material)
    scene.add(globe)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    // Controls (auto-rotate only)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = false
    controls.enablePan = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.3

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
    }
  }, [])

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
                <span className="letter">L</span>
                <span className="letter">N</span>
                <span className="letter">C</span>
                <span className="letter">T</span>
              </h1>
              <div className="cosmic-glow"></div>
            </motion.div>

            <motion.p
              className="tagline"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <span className="tagline-main">Legacy of Excellence</span>
              <span className="tagline-sub">Across the Educational Universe</span>
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 3.2 }}
            >
              <motion.a
                href="/home"
                className="explore-universe-btn"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Universe
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
          transition={{ duration: 2, repeat: Infinity }}
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
