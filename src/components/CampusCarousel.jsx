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
    image: "https://i.pinimg.com/236x/1d/f1/43/1df143603c7a9f51f3e8348f0ede6277.jpg",
  },
  {
    id: 2,
    title: "Industry Visits",
    description: "Students visiting leading industries for practical exposure",
    image: "https://i.pinimg.com/736x/44/e3/6d/44e36da9eb3789bb300bda0fd532b429.jpg",
  },
  {
    id: 3,
    title: "News Clips",
    description: "LNCT in the news for its achievements and contributions",
    image: "https://i.pinimg.com/736x/e0/0f/c7/e00fc7c3f8186cfc3f8804cfdad311ac.jpg",
  },
  {
    id: 4,
    title: "Event Images",
    description: "Glimpses of various events organized at LNCT campuses",
    image: "https://i.pinimg.com/736x/35/c3/e2/35c3e220bb6057cbccda2c532004172b.jpg",
  },
  {
    id: 5,
    title: "Graduation Day",
    description: "Celebrating the success of our graduates",
    image: "https://i.pinimg.com/736x/1b/52/88/1b5288594fbebfc4a13ba024516a9b18.jpg",
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
          Events
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
