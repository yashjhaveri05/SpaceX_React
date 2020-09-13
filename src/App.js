import React from 'react';
import './App.css';
import Launches from './views/Launches';
import Flight from './views/Flight';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";

function App(){
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Launches} />
          <Route path="/:id" component={Flight} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
