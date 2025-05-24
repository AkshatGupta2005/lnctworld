"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CollegesPage from "./pages/CollegesPage"
import SchoolsPage from "./pages/SchoolsPage"
import MedicalPage from "./pages/MedicalPage"
import IndustriesPage from "./pages/IndustriesPage"
import DigitalPage from "./pages/DigitalPage"
import Footer from "./components/Footer"
import ChatBot from "./components/ChatBot"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/colleges" element={<CollegesPage />} />
            <Route path="/schools" element={<SchoolsPage />} />
            <Route path="/medical" element={<MedicalPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/digital" element={<DigitalPage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  )
}

export default App
