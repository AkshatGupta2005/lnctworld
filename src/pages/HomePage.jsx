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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <HeroSection />
      <CategoryCards />
      <CampusCarousel />
      <AboutSection />
      <MapSection />
      <ContactSection />
    </motion.div>
  )
}

export default HomePage
