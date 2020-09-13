import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import {Grid,Card,AppBar,Toolbar,Typography,CardContent} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import "../index.css";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      background: "#37474f",
    },
    navbar: {
        display: "flex",
        justifyContent: 'center',
    },
    card: {
        margin: "auto",
        background: "red",
        maxWidth: "fit-content",
    },
    image: {
        height: 500,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
      },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    layout: {
        marginTop: 57,
        marginBottom: 59,
        marginLeft : 20,
        marginRight : 20,
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
            .then(response => {
                setFlight(response.data)
                setSite(response.data.launch_site)
                setLinks(response.data.links)
                setPayloads(response.data.rocket.second_stage.payloads[0])
            })
            .catch(err => console.error(err))
    }, [id]);

    return (
        <div className="Flight">
            <AppBar position="static">
                <Toolbar className={classes.navbar}>
                    <Typography variant="h3"><Link to="/" style={{color: "white"}}>SpaceX</Link></Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.layout}>
                <Card className={classes.card}>
                    <Grid
                            container
                            spacing={2}
                    >
                        <Grid item classname={classes.layout}>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} src={links.mission_patch} alt={flight.mission_name}/>
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={0}>
                                    <CardContent>
                                        <Typography variant="h1">
                                            {flight.mission_name}
                                        </Typography>
                                        <Typography variant="h4" gutterBottom>
                                            {new Date(flight.launch_date_utc).toDateString()}
                                        </Typography>
                                        <Typography variant="h5" gutterBottom>
                                            <strong>Launch Site : </strong>{site.site_name_long ? site.site_name_long : "Data Not Provided"}
                                        </Typography>
                                        <Typography variant="h5" gutterBottom>
                                            <strong>Details : </strong>{flight.details ? flight.details : "Data Not Provided"}
                                        </Typography>
                                        <Typography variant="h5" gutterBottom>
                                            <strong>Nationality : </strong>{payloads.nationality ? payloads.nationality : "Data Not Provided"}
                                        </Typography>
                                        <Typography variant="h5" gutterBottom>
                                            <strong>Orbit : </strong>{payloads.orbit ? payloads.orbit : "Data Not Provided"}
                                        </Typography>
                                        <Typography variant="h5" gutterBottom>
                                            <strong>Type : </strong>{payloads.payload_type ? payloads.payload_type : "Data Not Provided"}
                                        </Typography>
                                        <Typography variant="h5" gutterBottom>
                                            <strong>Reused : </strong>{payloads.reused ? "Yes":"No"}
                                        </Typography>
                                    </CardContent>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </div>
            <br></br>
        </div>
    )
}
