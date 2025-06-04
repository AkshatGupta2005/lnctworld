"use client"

import { useEffect, useRef, useState } from "react"
import "./AboutSection.css"
import director from "../assets/director_img.png"
import secretary from "../assets/Secretary_Img.png"
import viceChair from "../assets/viceChair_img.png"
import exe_director from "../assets/executiveDir_img.png"

const leaders = [
  {
    name: "Founder & Chairman",
    image: director,
    message: "We started LNCT with a mission to empower youth through quality education. The journey has been remarkable.",
  },
  {
    name: "Vice Chairperson",
    image: viceChair,
    message: "Our vision is to constantly innovate and improve the learning experience for our students.",
  },
  {
    name: "Executive Director",
    image: exe_director,
    message: "At LNCT, we focus on holistic development—academics, ethics, and innovation go hand in hand.",
  },
  {
    name: "Secretary",
    image: secretary,
    message: "Every student deserves a bright future. Our institution is committed to making that a reality.",
  },
]

const timelineEvents = [
  { year: "1994", event: "Establishment of LNCT Bhopal" },
  { year: "2000", event: "Expansion with new courses and facilities" },
  { year: "2008", event: "Opening of LNCT University" },
  { year: "2012", event: "Establishment of LNCT Medical College" },
  { year: "2018", event: "Launch of Digital Learning Platforms" },
  { year: "2023", event: "Celebrating 30 years of excellence" },
]

const AboutSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideIntervalRef = useRef(null)

  useEffect(() => {
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % leaders.length)
    }, 10000)

    return () => clearInterval(slideIntervalRef.current)
  }, [])

  return (
    <section className="about-section" id="about">
      <div className="container">
        <h2 className="section-title">Visionaries Behind LNCT</h2>

        {/* Leader Slider */}
        <div className="leader-slider">
          <div className="slide-content">
            <div className="leader-image">
              <img src={leaders[currentSlide].image} alt={leaders[currentSlide].name} />
            </div>
            <div className="leader-info">
              <h3>{leaders[currentSlide].name}</h3>
              <p className="leader-message">{leaders[currentSlide].message}</p>
            </div>
          </div>
          <div className="slider-dots">
            {leaders.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline">
          <h3>Our Journey</h3>
          <div className="timeline-container">
            {timelineEvents.map((event, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>{event.year}</h4>
                  <p>{event.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
