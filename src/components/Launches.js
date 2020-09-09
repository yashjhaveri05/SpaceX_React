import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Launch from './Launch';
import {Grid,Card,AppBar,Toolbar,Typography} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navbar: {
      display: "flex",
      justifyContent: 'center',
  },
}));

const Launches = () => {
  const classes = useStyles();

  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    axios.get('https://api.spacexdata.com/v3/launches/?limit=9')
        .then(response => setLaunches(response.data))
        .catch(err => console.error(err));
  }, []);

  return (
    <div className="App" style={{background: "black"}}>
      <div style={{marginBottom: '20px'}}>
        <AppBar position="static">
              <Toolbar className={classes.navbar}>
                  <Typography variant="h3">SpaceX</Typography>
              </Toolbar>
        </AppBar>
      </div>
      <div className="Grid"  style={{marginLeft: '20px',marginRight: '20px'}}>
        <Grid container spacing={2} justify="flex-start" alignItems="flex-start">
          {launches.map(launch => (
              <Grid item xs={4}>
                <Card className="Card">
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