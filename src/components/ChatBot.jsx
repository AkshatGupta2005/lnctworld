"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./ChatBot.css"
import chatIcon from "../assets/chatLogo.svg"

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Enhanced predefined responses
  const botResponses = {
    greetings: {
      keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "namaste"],
      responses: [
        "🌟 Hello! Welcome to the LNCT Universe! I'm your cosmic guide. How can I help you explore our educational galaxy today?",
        "✨ Hi there, space explorer! Ready to discover the wonders of LNCT? What would you like to know?",
        "🚀 Greetings, fellow traveler! I'm here to guide you through the LNCT cosmos. What interests you most?",
      ],
    },
    lnct_info: {
      keywords: ["lnct", "about lnct", "what is lnct", "lnct university", "lnct group"],
      responses: [
        "🎓 LNCT (Lakshmi Narain College of Technology) is a premier educational constellation established in 1994. We offer stellar education across engineering, management, medical sciences, and more across multiple campuses in Madhya Pradesh.",
        "🌟 LNCT Group is a universe of educational excellence with 30+ years of legacy. We're known for our innovative teaching, industry partnerships, and holistic student development.",
        "✨ The LNCT Universe encompasses colleges, schools, medical institutions, and digital platforms, creating a complete educational ecosystem for learners at every level.",
      ],
    },
    courses: {
      keywords: ["courses", "programs", "degree", "engineering", "medical", "management", "what courses"],
      responses: [
        "📚 Our cosmic curriculum includes:\n🔹 Engineering (B.Tech, M.Tech)\n🔹 Management (MBA, BBA)\n🔹 Medical (MBBS, Nursing)\n🔹 Pharmacy (B.Pharm, M.Pharm)\n🔹 Computer Applications (BCA, MCA)\n🔹 And many more stellar programs!",
        "🎯 We offer programs across multiple galaxies of knowledge:\n⭐ Technical Education\n⭐ Healthcare & Medical\n⭐ Business & Management\n⭐ Digital & IT\n⭐ Research & Innovation",
        "🚀 From undergraduate to doctoral programs, our educational universe has something for every aspiring mind. Which field interests you most?",
      ],
    },
    admission: {
      keywords: ["admission", "apply", "application", "how to join", "eligibility", "entrance"],
      responses: [
        "🎯 Ready to join our universe? Admissions are open! Visit our admission portal or contact our helpline at +91 755 123 4567. Our cosmic counselors will guide you through the process.",
        "✨ To begin your journey in the LNCT Universe:\n🔹 Check eligibility criteria\n🔹 Fill online application\n🔹 Appear for entrance test (if required)\n🔹 Attend counseling\n🔹 Secure your seat among the stars!",
        "🌟 Admission process varies by program. For detailed information about your preferred course, please visit our website or speak with our admission team.",
      ],
    },
    campus: {
      keywords: ["campus", "location", "bhopal", "indore", "jabalpur", "facilities"],
      responses: [
        "🏫 Our educational universe spans across:\n🌟 Bhopal (Main Campus)\n🌟 Indore\n🌟 Jabalpur\nEach campus is equipped with state-of-the-art facilities, modern labs, and cosmic learning environments!",
        "🌍 LNCT campuses are strategically located across Madhya Pradesh, offering world-class infrastructure, research facilities, and a vibrant campus life.",
        "✨ Our campuses feature smart classrooms, advanced laboratories, libraries, sports complexes, hostels, and everything needed for a stellar educational experience.",
      ],
    },
    placement: {
      keywords: ["placement", "job", "career", "companies", "salary", "recruitment"],
      responses: [
        "🚀 Our placement record is stellar! Students are recruited by top companies like TCS, Infosys, Wipro, Microsoft, Google, and many more. Average packages range from 3-15 LPA with highest going up to 50+ LPA!",
        "⭐ LNCT has a dedicated placement cell that works tirelessly to connect our students with leading companies across various industries. We maintain 85%+ placement rates consistently.",
        "🌟 Career opportunities are infinite in the LNCT Universe! Our industry partnerships ensure students get exposure to real-world projects and excellent job prospects.",
      ],
    },
    fees: {
      keywords: ["fee", "cost", "fees structure", "scholarship", "financial"],
      responses: [
        "💰 Fee structure varies by program and campus. We also offer various scholarships based on merit and need. For detailed fee information, please contact our admission office or visit our website.",
        "🌟 We believe quality education should be accessible. LNCT offers competitive fees with flexible payment options and scholarship opportunities for deserving students.",
        "✨ Investment in your future at LNCT is worth every penny! Contact our financial aid team to learn about fee structure and available scholarships.",
      ],
    },
    contact: {
      keywords: ["contact", "phone", "email", "address", "reach"],
      responses: [
        "📞 Connect with the LNCT Universe:\n🔹 Phone: +91 755 123 4567\n🔹 Email: info@lnct.ac.in\n🔹 Address: Raisen Road, Bhopal, MP\n🔹 Website: www.lnct.ac.in",
        "🌟 Our cosmic support team is always ready to help! Reach out through any of our communication channels and we'll guide you through your queries.",
        "✨ For immediate assistance, call our helpline. For detailed queries, email us. Our team responds faster than light speed!",
      ],
    },
    default: [
      "🤔 That's an interesting question! While I'm still learning about the vast LNCT Universe, I'd recommend contacting our expert team at +91 755 123 4567 for detailed information.",
      "🌟 I'm constantly expanding my knowledge of the LNCT cosmos! For specific queries, our human experts would be better equipped to help. Try calling +91 755 123 4567.",
      "✨ Great question! While I navigate through my cosmic database, feel free to reach out to our support team for immediate assistance.",
    ],
  }

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300)
    }
  }, [isOpen])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMaximized(false)

    if (!isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            text: "🌟 Welcome to the LNCT Universe! I'm your AI guide ready to help you explore our educational cosmos. What would you like to discover today?",
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ])
      }, 500)
    }
  }

  const maximizeChat = () => {
    setIsMaximized(!isMaximized)
  }

  const clearChat = () => {
    setMessages([])
    setMessages([
      {
        id: 1,
        text: "🌟 Chat cleared! How can I help you explore the LNCT Universe?",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const findBestResponse = (userInput) => {
    const input = userInput.toLowerCase()

    for (const [category, data] of Object.entries(botResponses)) {
      if (category === "default") continue

      const hasKeyword = data.keywords.some((keyword) => input.includes(keyword))
      if (hasKeyword) {
        const responses = data.responses
        return responses[Math.floor(Math.random() * responses.length)]
      }
    }

    const defaultResponses = botResponses.default
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (inputValue.trim() === "") return

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(
      () => {
        const botResponse = findBestResponse(inputValue)

        const botMessage = {
          id: messages.length + 2,
          text: botResponse,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const quickActions = [
    { text: "📚 Courses", action: "Tell me about courses offered" },
    { text: "🎯 Admissions", action: "How can I apply for admission?" },
    { text: "🏫 Campus", action: "Tell me about campus facilities" },
    { text: "🚀 Placements", action: "What about placement opportunities?" },
  ]

  const handleQuickAction = (action) => {
    setInputValue(action)
    setTimeout(() => {
      const event = { preventDefault: () => {} }
      handleSubmit(event)
    }, 100)
  }

  return (
    <>
      {/* Premium Chat Toggle Button */}
      <div
        className="premium-chat-toggle"
        onClick={toggleChat}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
      >
        <div className="toggle-aurora"></div>
        <div className="toggle-gradient"></div>
        <div className="toggle-icon">
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <img src={chatIcon} alt="Chat Bot Icon" />
          )}
        </div>
        <div className="toggle-ripple"></div>
      </div>

      {/* Premium Chat Container */}
      <AnimatePresence>
        {isOpen && (
          <div
            className={`premium-chat-container ${isMaximized ? "maximized" : ""}`}
          >
            <div className="chat-glass-bg"></div>
            <div className="chat-mesh-gradient"></div>

            {/* Premium Header */}
            <div className="premium-chat-header">
              <div className="header-main">
                <div className="bot-profile">
                  <div className="avatar-wrapper">
                    <div className="avatar-rings">
                      <div className="ring ring-1"></div>
                      <div className="ring ring-2"></div>
                      <div className="ring ring-3"></div>
                    </div>
                    <div className="avatar-core">
                      <div className="avatar-bg"></div>
                      <span className="avatar-icon">🤖</span>
                    </div>
                    <div className="status-dot">
                      <div className="dot-pulse"></div>
                    </div>
                  </div>
                  <div className="bot-details">
                    <h3 className="bot-title">LNCT AI Assistant</h3>
                    <p className="bot-subtitle">{isTyping ? "✨ Thinking..." : "🌟 Online & Ready"}</p>
                  </div>
                </div>

                <div className="header-actions">
                  <button
                    className="action-btn maximize-btn"
                    onClick={maximizeChat}
                    title={isMaximized ? "Restore" : "Maximize"}
                  >
                    {isMaximized ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                        <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
                        <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
                        <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 3h6v6"></path>
                        <path d="M9 21H3v-6"></path>
                        <path d="M21 3l-7 7"></path>
                        <path d="M3 21l7-7"></path>
                      </svg>
                    )}
                  </button>
                  <button
                    className="action-btn clear-btn"
                    onClick={clearChat}
                    title="Clear Chat"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                  <button
                    className="action-btn close-btn"
                    onClick={toggleChat}
                    title="Close"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Premium Messages Area */}
            <div className="premium-messages-area">
              <div className="messages-bg-pattern"></div>
              <div className="messages-list">
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`premium-message ${message.sender}`}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      layout
                    >
                      <div className="message-container">
                        <div className="message-content">
                          <p className="message-text">{message.text}</p>
                          <span className="message-time">{message.timestamp}</span>
                        </div>
                        {message.sender === "bot" && <div className="message-glow"></div>}
                      </div>
                    </div>
                  ))}
                </AnimatePresence>

                {/* Premium Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <div
                      className="typing-indicator"
                    >
                      <div className="typing-container">
                        <div className="typing-animation">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Premium Quick Actions */}
            {messages.length <= 1 && (
              <div
                className="premium-quick-actions"
              >
                <p className="quick-actions-title">Quick Explore:</p>
                <div className="quick-actions-list">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="quick-action-item"
                      onClick={() => handleQuickAction(action.action)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="action-label">{action.text}</span>
                      <div className="action-shine"></div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Premium Input Area */}
            <div className="premium-input-area">
              <div className="input-bg-blur"></div>
              <form onSubmit={handleSubmit} className="input-form">
                <div className="input-container">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Ask me about the LNCT Universe..."
                    value={inputValue}
                    onChange={handleInputChange}
                    className="premium-input"
                  />
                  <motion.button
                    type="submit"
                    className="premium-send-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!inputValue.trim()}
                  >
                    <div className="send-btn-bg"></div>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    <div className="send-btn-shine"></div>
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
