import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Flight() {
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
            <h1>{flight.mission_name}</h1>
            <p>Launch Date:{new Date(flight.launch_date_utc).toDateString()}</p>
            <p>Launch Site:{site.site_name_long}</p>
            <p>Details:{flight.details}</p>
            <p>Nationality:{payloads.nationality}</p>
            <p>Orbit{payloads.orbit}</p>
            <p>Type:{payloads.payload_type}</p>
            <p>Reused:{payloads.reused ? "Yes":"No"}</p>
            <img src={links.mission_patch} alt={flight.mission_name} height="200px"/>
            <p><Link to="/">Back</Link></p>
        </div>
    )
}
