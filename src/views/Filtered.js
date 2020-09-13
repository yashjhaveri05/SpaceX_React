import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import '../index.css';

const useStyles = makeStyles((theme) => ({
  links: {
      color: "red",
      hover: "red",
  },
}));

const Filtered = ({ id, name, year, image }) => {
  const classes = useStyles();

  return (
    <div className="main">
      <div className="Filtered">
        <h1><Link to={`/${id}`} className={classes.links}>{name}: {year}</Link></h1>
        <img src={image} alt={name} height="200px"/>
      </div>
    </div> 
  );
};

export default Filtered;