"use client"

import { motion } from "framer-motion"
import HeroSection from "../components/HeroSection"
import CategoryCards from "../components/CategoryCards"
import CampusCarousel from "../components/CampusCarousel"
import AboutSection from "../components/AboutSection"
import MapSection from "../components/MapSection"
import ContactSection from "../components/ContactSection"

const HomePage = () => {
  return (
    <div>
      <div id="home">
        <HeroSection />
      </div>

      <div id="services">
        <CategoryCards />
        <CampusCarousel />
      </div>

      <div id="about">
        <AboutSection />
      </div>

      <div id="map">
        <MapSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>
    </div>
  )
}

export default HomePage
