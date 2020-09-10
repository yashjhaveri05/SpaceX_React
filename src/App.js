import React from 'react';
import './App.css';
import Launches from './components/Launches';
import Flight from './components/Flight';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
