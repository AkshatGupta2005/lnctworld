"use client"

import { useState, useEffect } from "react"
import "./Navbar.css"
import logo from "../assets/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    document.body.setAttribute("data-theme", theme)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Services", href: "/" },
    { title: "About", href: "#about" },
    { title: "Contact", href: "#contact" },
  ]

  return (
    <nav className="navbar">
      <div className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
        {/* Logo */}
        <a href="#home" className="logo">
          <span><img src={logo} alt="Logo" className="logoImg"/></span>
        </a>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {navLinks.map((link, index) => (
            <a key={index} href={link.href} className="nav-link">
              {link.title}
            </a>
          ))}
        </div>

        {/* Right side buttons */}
        <div className="nav-actions">
          <div className="login-btn">Login</div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className={`mobile-menu-btn ${isOpen ? "active" : ""}`} aria-label="Toggle menu">
          <span class="bar top"></span>
          <span class="bar middle"></span>
          <span class="bar bottom"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isOpen ? "active" : ""}`}>
        {navLinks.map((link, index) => (
          <a key={index} href={link.href} className="mobile-nav-link" onClick={() => setIsOpen(false)}>
            {link.title}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
