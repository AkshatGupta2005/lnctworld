"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
import "./HeroSection.css"

const HeroSection = () => {
  const mountRef = useRef(null)
  const earthRef = useRef(null)

  useEffect(() => {
    const currentMount = mountRef.current
    if (!currentMount) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000)
    camera.position.set(0, 0, 5)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    currentMount.appendChild(renderer.domElement)

    // Create half-earth geometry
    const earthGeometry = new THREE.SphereGeometry(2.2, 64, 64, 0, Math.PI)

    // Enhanced earth material with animated shader
    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(currentMount.clientWidth, currentMount.clientHeight) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vec2 uv = vUv;
          
          // Create animated continents
          float continent1 = smoothstep(0.3, 0.7, sin(uv.x * 6.0 + time * 0.1) * cos(uv.y * 4.0));
          float continent2 = smoothstep(0.2, 0.8, sin(uv.x * 4.0 + time * 0.05) * sin(uv.y * 6.0));
          
          // Ocean color
          vec3 oceanColor = vec3(0.1, 0.3, 0.8);
          // Land color
          vec3 landColor = vec3(0.2, 0.6, 0.3);
          // Ice caps
          vec3 iceColor = vec3(0.9, 0.95, 1.0);
          
          // Mix colors based on continents
          vec3 earthColor = mix(oceanColor, landColor, continent1 * continent2);
          
          // Add ice caps at poles
          float iceFactor = smoothstep(0.8, 1.0, abs(uv.y - 0.5) * 2.0);
          earthColor = mix(earthColor, iceColor, iceFactor);
          
          // Add atmospheric glow
          float fresnel = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
          vec3 glowColor = vec3(0.4, 0.7, 1.0);
          earthColor += glowColor * fresnel * 0.3;
          
          // Add subtle animation
          earthColor += sin(time + vPosition.x * 2.0) * 0.05;
          
          gl_FragColor = vec4(earthColor, 0.95);
        }
      `,
      transparent: true,
    })

    // Earth mesh
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    earth.rotation.y = Math.PI
    scene.add(earth)
    earthRef.current = earth

    // Enhanced atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(2.5, 64, 64, 0, Math.PI)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
          
          // Add animated aurora effect
          float aurora = sin(vPosition.x * 3.0 + time) * sin(vPosition.y * 2.0 + time * 0.5) * 0.3;
          atmosphere += vec3(0.2, 1.0, 0.4) * aurora * intensity;
          
          gl_FragColor = vec4(atmosphere, intensity * 0.6);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    })

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    atmosphere.rotation.y = Math.PI
    scene.add(atmosphere)

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
    directionalLight.position.set(5, 3, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0x80c4e9, 0.8, 10)
    pointLight.position.set(-3, 2, 3)
    scene.add(pointLight)

    // Enhanced stars with twinkling effect
    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 2000
    const positions = new Float32Array(starsCount * 3)
    const colors = new Float32Array(starsCount * 3)

    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30

      const color = new THREE.Color()
      color.setHSL(Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.75)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    starsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.03,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    })

    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Handle resize
    const handleResize = () => {
      if (!currentMount) return
      const width = currentMount.clientWidth
      const height = currentMount.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      earthMaterial.uniforms.resolution.value.set(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      if (earthRef.current) {
        earthRef.current.rotation.y += 0.003
        earthRef.current.material.uniforms.time.value = time
      }

      if (atmosphere) {
        atmosphere.rotation.y += 0.002
        atmosphere.material.uniforms.time.value = time
      }

      if (stars) {
        stars.rotation.y += 0.0002
        stars.rotation.x += 0.0001
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="hero-section">
      {/* Cosmic background */}
      <div className="cosmic-bg">
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
        <div className="nebula nebula-3"></div>
      </div>

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
                href="#universe"
                className="explore-universe-btn"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore Universe</span>
                <div className="btn-stars">
                  <span className="star">✦</span>
                  <span className="star">✦</span>
                  <span className="star">✦</span>
                </div>
              </motion.a>

              <motion.button
                className="cosmic-play-btn"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
                <div className="play-glow"></div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating cosmic elements */}
        <motion.div
          className="cosmic-element element-1"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="cosmic-icon">🌟</div>
        </motion.div>

        <motion.div
          className="cosmic-element element-2"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -360],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <div className="cosmic-icon">🚀</div>
        </motion.div>

        <motion.div
          className="cosmic-element element-3"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
        >
          <div className="cosmic-icon">🌌</div>
        </motion.div>
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
        <div className="scroll-stars">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>
      </motion.div>
    </div>
  )
}

export default HeroSection
