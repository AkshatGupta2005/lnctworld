"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage.jsx"
import CollegesPage from "./pages/CollegesPage.jsx"
import SchoolsPage from "./pages/SchoolsPage.jsx"
import MedicalPage from "./pages/MedicalPage.jsx"
import IndustriesPage from "./pages/IndustriesPage.jsx"
import DigitalPage from "./pages/DigitalPage.jsx"
import Footer from "./components/Footer.jsx"
import ChatBot from "./components/ChatBot.jsx"
import LoginPage from "./components/LoginPage.jsx" // adjust path if needed
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
            <Route path="/school" element={<SchoolsPage />} />
            <Route path="/medical" element={<MedicalPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/digital" element={<DigitalPage />} />
            <Route path="/login" element={<LoginPage />} /> {/* Add login route */}
          </Routes>
        </AnimatePresence>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  )
}

export default App
