"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import TopBar from "./TopBar"
import EventsModule from "./modules/EventsModule"
import WebsiteEditor from "./modules/WebsiteEditor"
import UserManagement from "./modules/UserManagement"
import ServicesModule from "./modules/ServicesModule"
import TimelineModule from "./modules/TimelineModule"
import "../styles/dashboard.css"

const Dashboard = ({ user, onLogout }) => {
  const [activeModule, setActiveModule] = useState("events")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderActiveModule = () => {
    switch (activeModule) {
      case "events":
        return <EventsModule user={user} />
      case "website-editor":
        return <WebsiteEditor user={user} />
      case "user-management":
        return <UserManagement user={user} />
      case "services":
        return <ServicesModule user={user} />
      case "timeline":
        return <TimelineModule user={user} />
      default:
        return <EventsModule user={user} />
    }
  }

  return (
    <div className="dashboard">
      <Sidebar
        user={user}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`main-content ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <TopBar user={user} onLogout={onLogout} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div className="content-area">{renderActiveModule()}</div>
      </div>
    </div>
  )
}

export default Dashboard
