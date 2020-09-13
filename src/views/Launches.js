import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Launch from './Launch';
import {Grid,Card,AppBar,Toolbar,Typography} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import FilterLaunches from './FilterLaunches';
import "../index.css";

const useStyles = makeStyles((theme) => ({
  navbar: {
      display: "flex",
      justifyContent: 'center',
  },
  app: {
    background: "#bbdefb",
  },
  grid: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 30, 
  },
}));

const Launches = () => {
  const classes = useStyles();

  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    axios.get('https://api.spacexdata.com/v3/launches/?limit=10')
        .then(response => setLaunches(response.data))
        .catch(err => console.error(err));
  }, []);

  return (
    <div className={classes.app}>
      <div>
        <AppBar position="static">
              <Toolbar className={classes.navbar}>
                  <Typography variant="h3">SpaceX</Typography>
              </Toolbar>
        </AppBar>
      </div>
      <FilterLaunches />
      <div className={classes.grid}>
        <Grid container spacing={2} justify="flex-start" alignItems="flex-start">
          {launches.map(launch => (
              <Grid item xs={12} sm={12} md={6}  key={launch.flight_number}>
                <Card className="Launches">
                  <Launch 
                      key={launch.flight_number}
                      id={launch.flight_number}
                      name={launch.mission_name}
                      year={launch.launch_year}
                      image={launch.links.mission_patch}
                  /> 
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}

export default Launches;