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
      <HeroSection />
      <CategoryCards />
      <CampusCarousel />
      <AboutSection />
      <MapSection />
      <ContactSection />
    </div>
  )
}

export default HomePage
