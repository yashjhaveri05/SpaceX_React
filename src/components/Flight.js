import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import {Grid,Card,Button,AppBar,Toolbar,Typography,CardContent,CardHeader} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    navbar: {
        display: "flex",
        justifyContent: 'space-between',
    },
    card: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
        background: "blue"
    },
    image: {
        height: 400,
        marginTop: 10,
        marginBottom: 10
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
  }));

export default function Flight() {
    const classes = useStyles();

    const { id } = useParams();
    const [flight, setFlight] = useState([]);
    const [site, setSite] = useState([]);
    const [links, setLinks] = useState([]);
    const [payloads, setPayloads] = useState([]);

    useEffect(() => {
        axios.get(`https://api.spacexdata.com/v3/launches/${id}`)
            .then(response => setFlight(response.data))
            .catch(err => console.error(err));
    }, []);
    useEffect(() => {
        axios.get(`https://api.spacexdata.com/v3/launches/${id}`)
            .then(response => setSite(response.data.launch_site))
            .catch(err => console.error(err));
    }, []);
    useEffect(() => {
        axios.get(`https://api.spacexdata.com/v3/launches/${id}`)
            .then(response => setLinks(response.data.links))
            .catch(err => console.error(err));
    }, []);
    useEffect(() => {
        axios.get(`https://api.spacexdata.com/v3/launches/${id}`)
            .then(response => setPayloads(response.data.rocket.second_stage.payloads[0]))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
        <AppBar position="static">
            <Toolbar className={classes.navbar}>
                <Typography variant="h3">SpaceX</Typography>
                <Button color="inherit"><Link to="/" style={{color: "white"}}>Back</Link></Button>
            </Toolbar>
        </AppBar>
        <div>
        <Card className={classes.card}>
            <Grid
                    container
                    spacing={2}
            >
                <Grid item>
                    <ButtonBase className={classes.image}>
                        <img className={classes.img} src={links.mission_patch} alt={flight.mission_name}/>
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                            <CardContent>
                                <Typography variant="h3">
                                    {flight.mission_name}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {new Date(flight.launch_date_utc).toDateString()}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Launch Site:{site.site_name_long}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Details:{flight.details}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Nationality:{payloads.nationality}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Orbit:{payloads.orbit}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Type:{payloads.payload_type}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Reused:{payloads.reused ? "Yes":"No"}
                                </Typography>
                            </CardContent>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
        </div>
    </div>
    )
}
