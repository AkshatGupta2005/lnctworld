"use client"

import { useState, useEffect, useRef } from "react"
import {
  MessageCircle,
  X,
  Maximize2,
  Minimize2,
  Trash2,
  Send,
  User,
  Bot,
  Keyboard,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Lightbulb,
  AudioWaveformIcon as Waveform,
  StopCircle,
} from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import "./ChatBot.css"

export default function ModernChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: uuidv4(),
      text: "Hi! I'm UniBot, your AI assistant for university information. I can help you with admissions, courses, campus life, and more. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "Tell me about admission requirements",
        "What courses do you offer?",
        "How can I schedule a campus tour?",
        "What financial aid options are available?",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [botStatus, setBotStatus] = useState("Online")
  const [showShortcuts, setShowShortcuts] = useState(false)

  // Voice recognition states
  const [isListening, setIsListening] = useState(false)
  const [isVoiceSupported, setIsVoiceSupported] = useState(false)
  const [voiceError, setVoiceError] = useState(null)
  const [lastVoiceCommand, setLastVoiceCommand] = useState(null)
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true)
  const [isProcessingVoice, setIsProcessingVoice] = useState(false)

  const [showVoiceModal, setShowVoiceModal] = useState(false)
  const [voiceTranscription, setVoiceTranscription] = useState({
    isActive: false,
    transcript: "",
    interimTranscript: "",
    confidence: 0,
    isListening: false,
    error: null,
  })
  const [transcriptionHistory, setTranscriptionHistory] = useState([])

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const recognitionRef = useRef(null)
  const synthRef = useRef(null)

  const keyboardShortcuts = [
    { key: "Esc", description: "Close chat window" },
    { key: "Enter", description: "Send message" },
    { key: "Shift + Enter", description: "Add new line" },
    { key: "Ctrl + B", description: "Clear chat history" },
    { key: "Ctrl + M", description: "Maximize/minimize chat" },
    { key: "Ctrl + V", description: "Toggle voice recognition" },
    { key: "?", description: "Show/hide keyboard shortcuts" },
  ]

  const voiceCommands = [
    {
      command: "send message",
      action: () => handleSendMessage(),
      description: "Send the current message",
    },
    {
      command: "clear chat",
      action: () => clearChat(),
      description: "Clear chat history",
    },
    {
      command: "close chat",
      action: () => setIsOpen(false),
      description: "Close the chat window",
    },
    {
      command: "maximize chat",
      action: () => setIsMaximized(true),
      description: "Maximize chat window",
    },
    {
      command: "minimize chat",
      action: () => setIsMaximized(false),
      description: "Minimize chat window",
    },
    {
      command: "show shortcuts",
      action: () => setShowShortcuts(true),
      description: "Show keyboard shortcuts",
    },
    {
      command: "hide shortcuts",
      action: () => setShowShortcuts(false),
      description: "Hide keyboard shortcuts",
    },
    {
      command: "stop listening",
      action: () => stopListening(),
      description: "Stop voice recognition",
    },
  ]

  // Contextual responses with suggestions
  const getContextualResponse = (userMessage) => {
    const message = userMessage.toLowerCase()

    if (message.includes("admission") || message.includes("apply") || message.includes("requirements")) {
      return {
        text: "Great question about admissions! Our university has a holistic admissions process. Here's what you need to know:\n\n• **GPA Requirement**: Minimum 3.0 GPA\n• **Standardized Tests**: SAT/ACT scores (optional for 2024)\n• **Application Deadline**: January 15th for Fall admission\n• **Required Documents**: Transcripts, essays, letters of recommendation\n\nWould you like me to elaborate on any of these requirements?",
        suggestions: [
          "What's the average GPA of admitted students?",
          "Tell me about the essay requirements",
          "How important are extracurricular activities?",
          "Can I apply for spring admission?",
        ],
      }
    }

    if (
      message.includes("course") ||
      message.includes("program") ||
      message.includes("major") ||
      message.includes("study")
    ) {
      return {
        text: "We offer a wide range of academic programs! Here are our most popular areas:\n\n🎓 **Undergraduate Programs**:\n• Business Administration\n• Computer Science\n• Engineering\n• Liberal Arts\n• Health Sciences\n\n🎓 **Graduate Programs**:\n• MBA\n• Master's in Data Science\n• Master's in Education\n• Various PhD programs\n\nEach program has unique requirements and opportunities. What field interests you most?",
        suggestions: [
          "Tell me about the Computer Science program",
          "What business majors do you offer?",
          "Are there any new programs starting?",
          "How do I change my major?",
        ],
      }
    }

    if (message.includes("tour") || message.includes("visit") || message.includes("campus")) {
      return {
        text: "I'd love to help you plan a campus visit! We offer several tour options:\n\n🏫 **Campus Tours Available**:\n• **Daily Walking Tours**: 10 AM & 2 PM (Mon-Fri)\n• **Virtual Tours**: Available 24/7 online\n• **Specialized Tours**: Academic departments, residence halls\n• **Overnight Visits**: For prospective students\n\nTours typically last 90 minutes and include academic buildings, residence halls, dining facilities, and recreational areas. Would you like to schedule one?",
        suggestions: [
          "How do I schedule a campus tour?",
          "Can I visit specific departments?",
          "What should I bring to the tour?",
          "Are weekend tours available?",
        ],
      }
    }

    if (
      message.includes("financial") ||
      message.includes("aid") ||
      message.includes("scholarship") ||
      message.includes("cost") ||
      message.includes("tuition")
    ) {
      return {
        text: "Financial aid is available to help make education affordable! Here's what we offer:\n\n💰 **Financial Aid Options**:\n• **Need-based Aid**: Grants and work-study programs\n• **Merit Scholarships**: Academic and talent-based awards\n• **Federal Aid**: Pell Grants, student loans\n• **Payment Plans**: Flexible tuition payment options\n\n**2024-25 Tuition**: $45,000/year (before aid)\n**Average Aid Package**: $28,000\n\nMost students receive some form of financial assistance. Have you completed the FAFSA?",
        suggestions: [
          "How do I apply for scholarships?",
          "What's the FAFSA deadline?",
          "Are there work-study opportunities?",
          "Can international students get aid?",
        ],
      }
    }

    if (
      message.includes("housing") ||
      message.includes("dorm") ||
      message.includes("residence") ||
      message.includes("living")
    ) {
      return {
        text: "Our campus housing offers a great college experience! Here are your options:\n\n🏠 **Housing Options**:\n• **Traditional Dorms**: Shared rooms, community bathrooms\n• **Suite-Style**: 2-4 bedrooms sharing a bathroom\n• **Apartments**: Full kitchens, more independence\n• **Themed Communities**: Academic or interest-based living\n\n**Housing Guarantee**: All first-year students guaranteed on-campus housing\n**Application Deadline**: May 1st for fall semester\n\nEach option includes meal plans, WiFi, and access to study spaces. What type of living situation interests you?",
        suggestions: [
          "What meal plans are available?",
          "Can I choose my roommate?",
          "Are pets allowed in dorms?",
          "How much does housing cost?",
        ],
      }
    }

    if (
      message.includes("activity") ||
      message.includes("club") ||
      message.includes("sport") ||
      message.includes("extracurricular")
    ) {
      return {
        text: "Campus life here is vibrant with tons of opportunities to get involved!\n\n🎯 **Student Activities**:\n• **200+ Student Organizations**: Academic, cultural, recreational\n• **Greek Life**: 15 fraternities and sororities\n• **Division II Athletics**: 18 varsity sports teams\n• **Intramural Sports**: Basketball, soccer, volleyball, and more\n• **Student Government**: Leadership opportunities\n• **Community Service**: Local and international programs\n\nGetting involved is one of the best ways to make friends and develop leadership skills. What are your interests?",
        suggestions: [
          "How do I join a club?",
          "What sports teams do you have?",
          "Are there music or theater groups?",
          "Can I start a new organization?",
        ],
      }
    }

    if (
      message.includes("calendar") ||
      message.includes("schedule") ||
      message.includes("semester") ||
      message.includes("break")
    ) {
      return {
        text: "Here's our academic calendar for the 2024-25 year:\n\n📅 **Important Dates**:\n• **Fall Semester**: August 26 - December 13\n• **Spring Semester**: January 21 - May 9\n• **Summer Sessions**: May 19 - August 8\n\n**Breaks & Holidays**:\n• Fall Break: October 14-15\n• Thanksgiving: November 25-29\n• Winter Break: December 14 - January 20\n• Spring Break: March 10-14\n\n**Registration**: Opens 6 weeks before each semester. Need help with course planning?",
        suggestions: [
          "When does registration open?",
          "How many credits should I take?",
          "Can I take summer classes?",
          "What's the add/drop deadline?",
        ],
      }
    }

    // Default response for general questions
    return {
      text: "Thanks for your question! I'm here to help with any university-related information. I can provide details about:\n\n• **Admissions & Applications**\n• **Academic Programs & Courses**\n• **Campus Life & Activities**\n• **Financial Aid & Scholarships**\n• **Housing & Dining**\n• **Campus Tours & Visits**\n\nWhat specific area would you like to explore?",
      suggestions: [
        "Tell me about admission requirements",
        "What programs do you offer?",
        "How can I visit the campus?",
        "What financial aid is available?",
      ],
    }
  }

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const speechSynthesis = window.speechSynthesis

      if (SpeechRecognition) {
        setIsVoiceSupported(true)
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = "en-US"

        recognition.onstart = () => {
          setIsListening(true)
          setVoiceError(null)
          setIsProcessingVoice(false)
          setVoiceTranscription((prev) => ({
            ...prev,
            isListening: true,
            error: null,
          }))
        }

        recognition.onresult = (event) => {
          let finalTranscript = ""
          let interimTranscript = ""
          let confidence = 0

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            confidence = event.results[i][0].confidence

            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }

          if (interimTranscript) {
            setInputValue(interimTranscript)
            setVoiceTranscription((prev) => ({
              ...prev,
              interimTranscript,
            }))
          }

          if (finalTranscript) {
            setIsProcessingVoice(true)
            const command = finalTranscript.toLowerCase().trim()
            setLastVoiceCommand(command)
            setVoiceTranscription((prev) => ({
              ...prev,
              transcript: finalTranscript,
              confidence,
              interimTranscript: "",
            }))

            setTranscriptionHistory((prev) => [...prev, finalTranscript])

            const matchedCommand = voiceCommands.find((vc) => command.includes(vc.command.toLowerCase()))

            if (matchedCommand) {
              setInputValue("")
              matchedCommand.action()
              setTimeout(() => {
                setLastVoiceCommand(null)
                setIsProcessingVoice(false)
              }, 2000)
            } else {
              setInputValue(finalTranscript.trim())
              setIsProcessingVoice(false)

              if (showVoiceModal) {
                setTimeout(() => {
                  handleSendMessage(finalTranscript.trim())
                  setShowVoiceModal(false)
                }, 1000)
              }
            }
          }
        }

        recognition.onerror = (event) => {
          setVoiceError(`Voice recognition error: ${event.error}`)
          setIsListening(false)
          setIsProcessingVoice(false)
          setVoiceTranscription((prev) => ({
            ...prev,
            isListening: false,
            error: `Error: ${event.error}`,
          }))
        }

        recognition.onend = () => {
          setIsListening(false)
          setIsProcessingVoice(false)
          setVoiceTranscription((prev) => ({
            ...prev,
            isListening: false,
          }))
        }

        recognitionRef.current = recognition
      }

      if (speechSynthesis) {
        synthRef.current = speechSynthesis
      }
    }
    // eslint-disable-next-line
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      if (e.key === "?" && !e.ctrlKey && !e.shiftKey && !e.altKey) {
        setShowShortcuts((prev) => !prev)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
        setShowShortcuts(false)
        stopListening()
      }
      if (e.key === "b" && (e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
        e.preventDefault()
        clearChat()
      }
      if (e.key === "m" && (e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
        e.preventDefault()
        setIsMaximized((prev) => !prev)
      }
      if (e.key === "v" && (e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
        e.preventDefault()
        toggleListening()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
    // eslint-disable-next-line
  }, [isOpen, isListening])

  const startListening = () => {
    if (recognitionRef.current && isVoiceSupported) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        setVoiceError("Could not start voice recognition")
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const openVoiceModal = () => {
    setShowVoiceModal(true)
    setVoiceTranscription({
      isActive: true,
      transcript: "",
      interimTranscript: "",
      confidence: 0,
      isListening: false,
      error: null,
    })

    setTimeout(() => {
      startListening()
    }, 300)
  }

  const closeVoiceModal = () => {
    stopListening()
    setShowVoiceModal(false)
    setVoiceTranscription((prev) => ({
      ...prev,
      isActive: false,
    }))
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      if (showVoiceModal) {
        startListening()
      } else {
        openVoiceModal()
      }
    }
  }

  const speakText = (text) => {
    if (synthRef.current && isSpeechEnabled) {
      synthRef.current.cancel()
      const cleanText = text.replace(/[*•#]/g, "").replace(/\n/g, " ")
      const utterance = new window.SpeechSynthesisUtterance(cleanText)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8

      synthRef.current.speak(utterance)
    }
  }

  const toggleSpeech = () => {
    setIsSpeechEnabled((prev) => !prev)
    if (synthRef.current) {
      synthRef.current.cancel()
    }
  }

  const handleSendMessage = async (manualMessage) => {
    let messageToSend = manualMessage !== undefined ? manualMessage : inputValue

    // If called from a button click, manualMessage could be an event object
    if (typeof messageToSend !== "string") {
      messageToSend = inputValue
    }

    if (!messageToSend || typeof messageToSend.trim !== "function" || !messageToSend.trim()) return

    const newMessage = {
      id: uuidv4(),
      text: messageToSend,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    const userInput = messageToSend
    setInputValue("")
    setIsTyping(true)
    setBotStatus("Thinking...")

    if (isListening) {
      stopListening()
    }

    setTimeout(() => {
      const response = getContextualResponse(userInput)
      const botResponse = {
        id: uuidv4(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        suggestions: response.suggestions,
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
      setBotStatus("Online")

      if (isSpeechEnabled) {
        speakText(response.text)
      }
    }, 2000)
  }

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
    inputRef.current?.focus()
  }

  const clearChat = () => {
    setMessages([
      {
        id: uuidv4(),
        text: "Hi! I'm UniBot, your AI assistant for university information. I can help you with admissions, courses, campus life, and more. What would you like to know?",
        isUser: false,
        timestamp: new Date(),
        suggestions: [
          "Tell me about admission requirements",
          "What courses do you offer?",
          "How can I schedule a campus tour?",
          "What financial aid options are available?",
        ],
      },
    ])
    if (synthRef.current) {
      synthRef.current.cancel()
    }
  }

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleShortcuts = () => {
    setShowShortcuts((prev) => !prev)
  }

  const acceptTranscription = () => {
    if (voiceTranscription.transcript) {
      setInputValue(voiceTranscription.transcript)
      closeVoiceModal()
    }
  }

  const discardTranscription = () => {
    setVoiceTranscription((prev) => ({
      ...prev,
      transcript: "",
      interimTranscript: "",
    }))
    closeVoiceModal()
  }

  const sendTranscription = () => {
    if (voiceTranscription.transcript) {
      handleSendMessage(voiceTranscription.transcript)
      closeVoiceModal()
    }
  }

  return (
    <div className="chatbot-theme   chatbot-container">
      <button
        className={`chat-toggle ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
        title="Open chat (? for keyboard shortcuts)"
      >
        <div className="toggle-icon">{isOpen ? <X size={24} /> : <MessageCircle size={24} />}</div>
        <div className="ripple-effect" />
      </button>

      <div className={`chat-window ${isOpen ? "open" : ""} ${isMaximized ? "fullscreen" : ""}`}>
        <div className="chat-backdrop" />

        <div className="chat-header">
          <div className="bot-info-section">
            <div className="bot-avatar">
              <Bot size={20} />
              <div className="status-indicator" />
            </div>
            <div className="bot-details">
              <h3>UniBot</h3>
              <span className="status">{botStatus}</span>
            </div>
          </div>

          <div className="header-controls">
            {isVoiceSupported && (
              <button
                className="control-btn"
                onClick={toggleSpeech}
                title={`${isSpeechEnabled ? "Disable" : "Enable"} text-to-speech`}
                aria-label="Toggle text-to-speech"
              >
                {isSpeechEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            )}
            <button
              className="control-btn"
              onClick={toggleShortcuts}
              title="Keyboard shortcuts"
              aria-label="Show keyboard shortcuts"
            >
              <Keyboard size={16} />
            </button>
            <button
              className="control-btn"
              onClick={() => setIsMaximized(!isMaximized)}
              title="Maximize/minimize (Ctrl+M)"
              aria-label="Maximize or minimize chat window"
            >
              {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button
              className="control-btn"
              onClick={clearChat}
              title="Clear chat (Ctrl+B)"
              aria-label="Clear chat history"
            >
              <Trash2 size={16} />
            </button>
            <button
              className="control-btn close-btn"
              onClick={() => setIsOpen(false)}
              title="Close (Esc)"
              aria-label="Close chat window"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {(isListening || isProcessingVoice || lastVoiceCommand) && (
          <div className="voice-status">
            {isListening && !isProcessingVoice && (
              <div className="voice-indicator listening">
                <div className="pulse-dot" />
                <span>Listening... Say a command or speak your message</span>
              </div>
            )}
            {isProcessingVoice && (
              <div className="voice-indicator processing">
                <div className="processing-dots">
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
                <span>Processing voice command...</span>
              </div>
            )}
            {lastVoiceCommand && !isProcessingVoice && (
              <div className="voice-indicator command">
                <span>Command recognized: "{lastVoiceCommand}"</span>
              </div>
            )}
          </div>
        )}

        {voiceError && (
          <div className="voice-error">
            <span>{voiceError}</span>
            <button onClick={() => setVoiceError(null)}>×</button>
          </div>
        )}

        {showShortcuts && (
          <div className="shortcuts-panel">
            <div className="shortcuts-header">
              <h4>Keyboard Shortcuts & Voice Commands</h4>
              <button
                className="close-shortcuts"
                onClick={() => setShowShortcuts(false)}
                aria-label="Close shortcuts panel"
              >
                <X size={16} />
              </button>
            </div>
            <div className="shortcuts-content">
              <div className="shortcuts-section">
                <h5>Keyboard Shortcuts</h5>
                <div className="shortcuts-list">
                  {keyboardShortcuts.map((shortcut, index) => (
                    <div key={index} className="shortcut-item">
                      <kbd>{shortcut.key}</kbd>
                      <span>{shortcut.description}</span>
                    </div>
                  ))}
                </div>
              </div>
              {isVoiceSupported && (
                <div className="shortcuts-section">
                  <h5>Voice Commands</h5>
                  <div className="voice-commands-list">
                    {voiceCommands.slice(0, 8).map((command, index) => (
                      <div key={index} className="voice-command-item">
                        <span className="command">"{command.command}"</span>
                        <span className="description">{command.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="messages-area">
          <div className="messages-pattern" />
          {messages.map((message, index) => (
            <div key={message.id}>
              <div
                className={`message ${message.isUser ? "user" : "bot"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="message-avatar">{message.isUser ? <User size={16} /> : <Bot size={16} />}</div>
                <div className="message-bubble">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>

              {message.suggestions && message.suggestions.length > 0 && (
                <div className="suggestions-container">
                  <div className="suggestions-header">
                    <Lightbulb size={14} />
                    <span>Suggested questions:</span>
                  </div>
                  <div className="suggestions-list">
                    {message.suggestions.map((suggestion, suggestionIndex) => (
                      <button
                        key={suggestionIndex}
                        className="suggestion-btn"
                        onClick={() => handleSuggestionClick(suggestion)}
                        style={{ animationDelay: `${suggestionIndex * 0.1}s` }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="message bot typing-message">
              <div className="message-avatar">
                <Bot size={16} />
              </div>
              <div className="message-bubble">
                <div className="typing-indicator">
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <div className="input-backdrop" />
          <div className="input-container">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Ask me anything about the university..."
              className="message-input"
              aria-label="Message input"
            />
            {isVoiceSupported && (
              <button
                className={`voice-btn ${isListening ? "listening" : ""} ${isProcessingVoice ? "processing" : ""}`}
                onClick={toggleListening}
                disabled={isProcessingVoice}
                title={isListening ? "Stop listening (Ctrl+V)" : "Start voice input (Ctrl+V)"}
                aria-label={isListening ? "Stop voice recognition" : "Start voice recognition"}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                {isListening && <div className="voice-pulse" />}
              </button>
            )}
            <button
              className="send-btn"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              title="Send message (Enter)"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {showVoiceModal && (
        <div className="voice-modal-backdrop" onClick={closeVoiceModal}>
          <div className="voice-modal" onClick={(e) => e.stopPropagation()}>
            <div className="voice-modal-header">
              <h3>Voice Input</h3>
              <button className="close-voice-modal" onClick={closeVoiceModal}>
                <X size={18} />
              </button>
            </div>

            <div className="voice-modal-content">
              <div className="voice-visualization">
                {voiceTranscription.isListening ? (
                  <div className="voice-waves">
                    <Waveform size={32} className="wave-icon" />
                    <div className="wave-bars">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="wave-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="voice-inactive">
                    <Mic size={32} />
                    <span>Click the microphone to start</span>
                  </div>
                )}
              </div>

              <div className="transcription-display">
                {voiceTranscription.transcript && (
                  <div className="final-transcript">
                    <p>{voiceTranscription.transcript}</p>
                    <div
                      className="confidence-indicator"
                      style={{ width: `${Math.max(voiceTranscription.confidence * 100, 20)}%` }}
                    >
                      <span>Confidence: {Math.round(voiceTranscription.confidence * 100)}%</span>
                    </div>
                  </div>
                )}

                {voiceTranscription.interimTranscript && (
                  <div className="interim-transcript">
                    <p>{voiceTranscription.interimTranscript}</p>
                    <div className="typing-dots">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  </div>
                )}

                {!voiceTranscription.transcript && !voiceTranscription.interimTranscript && (
                  <div className="no-transcript">
                    <p>Speak now or click the microphone button</p>
                  </div>
                )}

                {voiceTranscription.error && (
                  <div className="transcription-error">
                    <p>{voiceTranscription.error}</p>
                  </div>
                )}
              </div>

              <div className="voice-controls">
                <button
                  className={`voice-control-btn ${voiceTranscription.isListening ? "listening" : ""}`}
                  onClick={toggleListening}
                >
                  {voiceTranscription.isListening ? (
                    <>
                      <StopCircle size={24} />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Mic size={24} />
                      <span>Start</span>
                    </>
                  )}
                </button>

                <button
                  className="voice-control-btn send"
                  onClick={sendTranscription}
                  disabled={!voiceTranscription.transcript}
                >
                  <Send size={24} />
                  <span>Send</span>
                </button>

                <button
                  className="voice-control-btn discard"
                  onClick={discardTranscription}
                  disabled={!voiceTranscription.transcript && !voiceTranscription.interimTranscript}
                >
                  <Trash2 size={24} />
                  <span>Discard</span>
                </button>
              </div>

              {transcriptionHistory.length > 0 && (
                <div className="transcription-history">
                  <h4>Recent Transcriptions</h4>
                  <ul>
                    {transcriptionHistory.slice(-3).map((item, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setInputValue(item)
                          closeVoiceModal()
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}