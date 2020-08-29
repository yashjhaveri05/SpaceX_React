import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Launch from './Launch';

const Launches = () => {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    axios.get('https://api.spacexdata.com/v3/launches/?limit=5')
        .then(response => setLaunches(response.data))
        .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>SPACEX</h1>
      <div className="launches">
      {launches.map(launch => (
        <Launch 
            key={launch.flight_number}
            id={launch.flight_number}
            name={launch.mission_name}
            year={launch.launch_year}
            image={launch.links.mission_patch}
        />
        ))}
      </div>
    </div>
  );
}

export default Launches;