"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import "./CampusCarousel.css"

const campusImages = [
  {
    id: 1,
    title: "Campus Activities",
    description: "Students participating in various extracurricular activities",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 2,
    title: "Industry Visits",
    description: "Students visiting leading industries for practical exposure",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 3,
    title: "News Clips",
    description: "LNCT in the news for its achievements and contributions",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 4,
    title: "Event Images",
    description: "Glimpses of various events organized at LNCT campuses",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 5,
    title: "Graduation Day",
    description: "Celebrating the success of our graduates",
    image: "/placeholder.svg?height=600&width=800",
  },
]

const CampusCarousel = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section className="campus-carousel-section" id="campus-life">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Campus Life
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop={true}
            className="campus-swiper"
          >
            {campusImages.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="campus-slide">
                  <div className="campus-image">
                    <img src={item.image || "/placeholder.svg"} alt={item.title} />
                  </div>
                  <div className="campus-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

export default CampusCarousel
