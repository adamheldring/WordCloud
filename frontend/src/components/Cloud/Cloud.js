import React from "react"
import ReactWordCloud from "react-wordcloud"
import Spinner from "../Spinner/Spinner"
import "./Cloud.scss"

const Cloud = ({ words, isLoading, req }) => {

  const greenColors = [
    "#143601",
    "#1A4301",
    "#245501",
    "#538D22",
    "#73A942",
    "#AAD576"
  ]

  return (
    <div className="cloud-wrapper">
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2 cloud-gradient" />
      <div className="cloud cloud-3" />
      <div className="cloud cloud-4" />
      <div className="cloud-results-container">
        {!isLoading ? (
          words.length ? (
            <ReactWordCloud
              words={words}
              options={{
                fontSizes: [24, 80],
                colors: greenColors,
                fontFamily: "sans-serif",
                fontWeight: "bold"
              }} />
          ) : (
              <div className="word-loader-wrapper">
                <h2 style={{ color: greenColors[3] }}>{`No results found${req ? ` for "${req}" ` : "..."}`}</h2>
              </div>
            )
        ) : (
            <div className="word-loader-wrapper">
              <Spinner size={100} color={greenColors[3]} />
            </div>
          )}
      </div>
    </div >
  )
}

export default Cloud;