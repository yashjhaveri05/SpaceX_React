import React, { useState } from "react";
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Grid} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import '../index.css';

const useStyles = makeStyles((theme) => ({
  main: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 50,
      marginRight: 50,
      textAlign: "center"
  },
  field : {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 30,
    width: 300,
  },
  button: {
    marginTop: 30
  },
  button1: {
    marginTop: 30,
    marginLeft: 10
  },
  grid: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 30, 
  },
}));

const FilterLaunches = ({setFiltered}) => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [qutwo, setQutwo] = useState("");

  const getFiltered = async() => {
      const response = await fetch(`https://api.spacexdata.com/v3/launches/?start=${query}&end=${qutwo}`);
      const data = await response.json();
      await setFiltered(data);
  }

  return (
    <div className="FilterLaunches">
     <main>
      <Grid container spacing={2} justify="center" alignItems="center">
          <TextField
              id="date1"
              type="date"
              label="Start Date:"
              value={query}
              onChange={e => setQuery(e.target.value)}
              color="primary"
              className={classes.field}
              InputLabelProps={{
              shrink: true,
              }}
          />
          <TextField
              id="date2"
              type="date"
              label="End Date:"
              value={qutwo}
              onChange={e => setQutwo(e.target.value)}
              color="primary"
              className={classes.field}
              InputLabelProps={{
              shrink: true,
              }}
          />
         <Button onClick={getFiltered} size="large" variant="contained" color="secondary" className={classes.button}>Search</Button>
         <Button onClick={() => window.location.reload()} size="large" variant="contained" color="secondary" className={classes.button1}>Back</Button>
      </Grid>
     </main>
    </div>
  );
};

export default FilterLaunches;