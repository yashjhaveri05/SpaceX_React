import React, { useEffect, useState } from "react";
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Grid,Card} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Filtered from './Filtered';
import '../index.css';

const useStyles = makeStyles((theme) => ({
  main: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 50,
      marginRight: 50,
      textAlign: "center"
  },
  form: {
    marginBottom: 35,
    marginTop: 35,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  field : {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  button: {
    marginTop: 10
  },
  grid: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 30, 
  },
}));

const FilterLaunches = () => {
    const classes = useStyles();

  const [search, setSearch] = useState("");
  const [two, setTwo] = useState("");
  const [resflights, setResflights] = useState([]);
  const [query, setQuery] = useState("2017-03-03");
  const [qutwo, setQutwo] = useState("2017-03-04");

  useEffect(() => {
    const getResflights = async() => {
      const response = await fetch(`https://api.spacexdata.com/v3/launches/?start=${query}&end=${qutwo}`);
      const data = await response.json();
      setResflights(data);
    }
    getResflights();
  }, [query,qutwo]);


  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const updateTwo = e => {
    setTwo(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setQutwo(two);
    setSearch("");
    setTwo("");
  };

  return (
    <div className="FilterLaunches">
     <main>
      <form onSubmit={getSearch} className={classes.form}>
      <Grid container spacing={2} justify="center" alignItems="center">
          <TextField
              id="date1"
              type="date"
              label="Start Date:"
              defaultValue={search}
              onChange={updateSearch}
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
              defaultValue={two}
              onChange={updateTwo}
              color="primary"
              className={classes.field}
              InputLabelProps={{
              shrink: true,
              }}
          />
         <Button size="large" variant="contained" color="secondary" type="submit" className={classes.button}>Search</Button>
      </Grid>
      </form>
      <div className={classes.main}>
        <Grid container spacing={2} justify="flex-start" alignItems="flex-start">
          {resflights.map(resflight => (
              <Grid item xs={12} sm={12} md={6} key={resflight.flight_number}>
                <Card className="Launches">
                <Filtered 
                      key={resflight.flight_number}
                      id={resflight.flight_number}
                      name={resflight.mission_name}
                      year={resflight.launch_year}
                      image={resflight.links.mission_patch}
                />
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
     </main>
    </div>
  );
};

export default FilterLaunches;