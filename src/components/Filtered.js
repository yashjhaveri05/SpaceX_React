import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Filtered = ({ id, name, year, image }) => {
  return (
    <div className="main">
      <div className="Filtered">
        <h1><Link to={`/${id}`}>{name}: {year}</Link></h1>
        <img src={image} alt={name} height="200px"/>
      </div>
    </div>
    
  );
};

export default Filtered;