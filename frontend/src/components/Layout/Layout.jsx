import React from "react"
import "./Layout.scss"

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <header className="header-wrapper">
        <h1 className="header-title">WORD CLOUD</h1>
      </header>
      <main className="main-wrapper">
        {children}
      </main>
    </div>
  )
}

export default Layout;