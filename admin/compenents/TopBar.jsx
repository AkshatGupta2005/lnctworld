"use client"

import { useState } from "react"
import "../styles/topbar.css"

const TopBar = ({ user, onLogout, toggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      onLogout()
    }
  }

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="breadcrumb">
          <span className="breadcrumb-item">Dashboard</span>
        </div>
      </div>

      <div className="topbar-right">
        <div className="notifications">
          <button className="notification-btn">
            🔔<span className="notification-badge">3</span>
          </button>
        </div>

        <div className="user-menu-container">
          <button className="user-menu-trigger" onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="user-avatar-small">{user.name.charAt(0).toUpperCase()}</div>
            <span className="user-name-small">{user.name}</span>
            <span className="dropdown-arrow">▼</span>
          </button>

          {showUserMenu && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <div className="user-info-dropdown">
                  <div className="user-name">{user.name}</div>
                  <div className="user-role">{user.role}</div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item">👤 Profile Settings</button>
              <button className="dropdown-item">⚙️ Preferences</button>
              <button className="dropdown-item">📊 Activity Log</button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout-item" onClick={handleLogout}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopBar
