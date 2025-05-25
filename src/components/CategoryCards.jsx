"use client"

import { useRef, useState, useEffect } from "react"
import "./CategoryCards.css"

const servicesData = [
  {
    id: 1,
    title: "Colleges & Universities",
    description:
      "Advanced management systems for higher education institutions with comprehensive academic and administrative solutions.",
    image: "https://lnctu.ac.in/wp-content/uploads/2024/09/LNCT-A-scaled-1-1024x528.jpg?w=400&h=300&fit=crop&crop=center",
    alt: "University Campus",
    features: ["Student Information Systems", "Academic Management", "Campus Administration"],
  },
  {
    id: 2,
    title: "Schools",
    description:
      "Comprehensive educational platforms designed specifically for K-12 institutions and primary education management.",
    image: "https://www.lnctworldschools.com/wp-content/plugins/phastpress/phast.php/c2VydmljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGd3d3LmxuY3R3b3JsZHNjaG9vbHMuY29tJTJGd3AtY29udGVudCUyRnVwbG9hZHMlMkYyMDI1JTJGMDQlMkZzbGlkZXItMDQtbWluLTIuanBnJmNhY2hlTWFya2VyPTE3NDQwOTY0NDQtMjkyOTczJnRva2VuPTdkYjk1Y2JiM2QyODNjMTI.q.jpg?w=400&h=300&fit=crop&crop=center",
    alt: "School Classroom",
    features: ["Classroom Management", "Parent Communication", "Student Progress Tracking"],
  },
  {
    id: 3,
    title: "Medical & Healthcare",
    description:
      "Integrated healthcare solutions for medical practices, including traditional, Ayurveda, and Homeopathy treatments.",
    image: "https://ucsworld.com/wp-content/uploads/2018/04/ln-medical-college-research-centre_bhopal.jpg?w=400&h=300&fit=crop&crop=center",
    alt: "Medical Healthcare",
    features: ["Patient Management", "Electronic Health Records", "Appointment Scheduling"],
  },
  {
    id: 4,
    title: "Industries & Companies",
    description:
      "Enterprise solutions for manufacturing and corporate environments with focus on efficiency and productivity.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEYTbZC7nU4rFkRkEeZLqOzMUZX3QpKJXng&s?w=400&h=300&fit=crop&crop=center",
    alt: "Industrial Manufacturing",
    features: ["Resource Planning", "Supply Chain Management", "Quality Control"],
  },
  {
    id: 5,
    title: "Digital Platforms",
    description:
      "Modern web solutions and digital transformation services for academic portals and online learning environments.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKUCB9d3G08fXBW4K8lrzCaZsAQqtqd39Vyny4D5KeHre45DJDu_ekPQ29buOYLAypV_Y&usqp=CAU?w=400&h=300&fit=crop&crop=center",
    alt: "Digital Technology",
    features: ["Web Development", "Mobile Applications", "Cloud Solutions"],
  },
]

const CategoryCards = () => {
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)

  const updateNavButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      const maxScroll = scrollWidth - clientWidth
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < maxScroll - 1)
    }
  }

  const smoothScrollTo = (element, target, duration = 400) => {
    const start = element.scrollLeft
    const change = target - start
    const startTime = performance.now()

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out-quart)
      const easeOut = 1 - Math.pow(1 - progress, 4)

      element.scrollLeft = start + change * easeOut

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        setIsScrolling(false)
        updateNavButtons()
      }
    }

    setIsScrolling(true)
    requestAnimationFrame(animateScroll)
  }

  const scrollCards = (direction) => {
    if (isScrolling || !scrollContainerRef.current) return

    const cardWidth = 280 + 24 // card width + gap
    const currentScroll = scrollContainerRef.current.scrollLeft

    let targetScroll
    if (direction === "next") {
      targetScroll = currentScroll + cardWidth
    } else {
      targetScroll = currentScroll - cardWidth
    }

    // Ensure we don't scroll beyond bounds
    const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll))

    smoothScrollTo(scrollContainerRef.current, targetScroll)
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      if (!isScrolling) {
        updateNavButtons()
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        scrollCards("prev")
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        scrollCards("next")
      }
    }

    const handleResize = () => {
      updateNavButtons()
    }

    // Touch/swipe support
    let startX = 0
    let startY = 0
    let isTouch = false

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      isTouch = true
    }

    const handleTouchMove = (e) => {
      if (!isTouch) return

      const currentX = e.touches[0].clientX
      const currentY = e.touches[0].clientY
      const diffX = startX - currentX
      const diffY = startY - currentY

      // Prevent vertical scrolling when swiping horizontally
      if (Math.abs(diffX) > Math.abs(diffY)) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e) => {
      if (!isTouch) return

      const endX = e.changedTouches[0].clientX
      const diffX = startX - endX

      if (Math.abs(diffX) > 50) {
        // Minimum swipe distance
        if (diffX > 0) {
          scrollCards("next")
        } else {
          scrollCards("prev")
        }
      }

      isTouch = false
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    document.addEventListener("keydown", handleKeyDown)
    window.addEventListener("resize", handleResize)
    scrollContainer.addEventListener("touchstart", handleTouchStart, { passive: true })
    scrollContainer.addEventListener("touchmove", handleTouchMove, { passive: false })
    scrollContainer.addEventListener("touchend", handleTouchEnd, { passive: true })

    // Initialize navigation buttons
    updateNavButtons()

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll)
      document.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("resize", handleResize)
      scrollContainer.removeEventListener("touchstart", handleTouchStart)
      scrollContainer.removeEventListener("touchmove", handleTouchMove)
      scrollContainer.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isScrolling])

  return (
    <div className="category-cards-container">
      <div className="header">
        <h1>Professional Services</h1>
        <p>Comprehensive solutions designed to drive efficiency and growth across diverse industries</p>
      </div>

      <div className="scroll-wrapper">
        <button
          className={`nav-button prev ${!canScrollLeft ? "disabled" : ""}`}
          onClick={() => scrollCards("prev")}
          disabled={!canScrollLeft}
          aria-label="Previous"
        />
        <button
          className={`nav-button next ${!canScrollRight ? "disabled" : ""}`}
          onClick={() => scrollCards("next")}
          disabled={!canScrollRight}
          aria-label="Next"
        />

        <div className="scroll-container" ref={scrollContainerRef}>
          {servicesData.map((service, index) => (
            <div key={service.id} className={`card card-${index + 1}`} tabIndex="0">
              <img src={service.image || "/placeholder.svg"} alt={service.alt} className="card-image" />
              <div className="card-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="card-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryCards
