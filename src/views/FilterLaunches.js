import React, { useEffect, useState } from "react";
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Grid,Card} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Filtered from './Filtered';

const useStyles = makeStyles((theme) => ({
  navbar: {
      display: "flex",
      justifyContent: 'space-between',
  },
  main: {
      marginTop: 10,
      marginBottom: 10,
  },
  form: {
    marginBottom: 35,
    marginTop: 35,
    textAlign: "center",
  },
  field : {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }
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
        <TextField
            id="date1"
            type="date"
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
            defaultValue={two}
            onChange={updateTwo}
            color="primary"
            className={classes.field}
            InputLabelProps={{
            shrink: true,
            }}
        />
        <Button size="small" variant="contained" color="secondary" type="submit">Search</Button>
      </form>
      <div className={classes.main}  style={{marginLeft: '20px',marginRight: '20px'}}>
        <Grid container spacing={2} justify="flex-start" alignItems="flex-start">
          {resflights.map(resflight => (
              <Grid item xs={4}>
                <Card className="Card">
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