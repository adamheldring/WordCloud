import React, { useState } from "react"
import TextTv from "../../components/TextTv/TextTv"
import Wiki from "../../components/Wiki/Wiki"
import "./LandingPage.scss"

const LandingPage = () => {
  const [app, setApp] = useState("texttv")

  return (
    <div className="landing-wrapper">
      <nav className="nav">
        <button className={`nav-button ${app === "texttv" ? "nav-button--active" : ""}`} onClick={() => setApp("texttv")}>TEXT-TV</button>
        <button className={`nav-button ${app === "wiki" ? "nav-button--active" : ""}`} onClick={() => setApp("wiki")}> WIKIPEDIA</button>
      </nav>
      {app === "texttv" ? (
        <TextTv />
      ) : (
          <Wiki />
        )}
    </div >
  )
}

export default LandingPage;