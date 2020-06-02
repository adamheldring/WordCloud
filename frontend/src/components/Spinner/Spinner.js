import React from "react";
import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const Spinner = ({ type = "Oval", color = "#000000", size = 50 }) => (
  <Loader
    type={type}
    color={color}
    height={size}
    width={size}
  />
)

export default Spinner;