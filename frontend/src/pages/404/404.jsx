import React from "react"
import { Link } from "react-router-dom"

const NoMatch = () => {
  return (
    <div>
      <h2>
        404 – No matching page
      </h2>
      <Link to="/">
        <h3 style={{ display: "flex", justifyContent: "center" }}>
          Back
        </h3>
      </Link>
    </div>
  )
}

export default NoMatch;