import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Launch = ({ id, name, year, image }) => {
  return (
    <div className="launch">
      <h1><Link to={`/${id}`}>{name}: {year}</Link></h1>
      <img src={image} alt={name} height="200px"/>
    </div>
  );
};

export default Launch;