"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import "./CampusCarousel.css"

const CampusCarousel = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const res = await fetch("https://lnctworld.onrender.com/api/events")
        const data = await res.json()
        if (data.success) {
          setEvents(data.data)
          setError(null)
        } else {
          setError("Failed to load events")
        }
      } catch (err) {
        setError("Error fetching events")
        console.error("Error fetching events:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) return <p className="loading-text">Loading events...</p>
  if (error) return <p className="error-text">{error}</p>
  if (!events.length) return <p className="no-events-text">No events found.</p>

  return (
    <section className="campus-carousel-section" id="campus-life">
      <div className="container">
        <h2 className="section-title" ref={ref}>
          Events
        </h2>
        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--text-secondary)",
            maxWidth: 600,
            margin: "0 auto 2rem auto",
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Stay updated with our latest events, workshops, and networking opportunities designed to connect, inspire, and grow together
        </p>

        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          loop
          className="campus-swiper"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="campus-slide">
                <div className="campus-image">
                  <img
                    src={`https://lnctworld.onrender.com/api/event/image/${event.image}`}
                    alt={event.title ?? "Event image"}
                    onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                  />
                </div>
                <div className="campus-content">
                  <h3>{event.title ?? "Untitled Event"}</h3>
                  <p>{event.description ?? "No description available."}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default CampusCarousel
