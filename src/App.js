import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./styles/App.css"
import NavTabs from './components/NavBar.component';
import Login from './components/Login.component';
import Greeting from './components/Greeting.component';
import { base } from './base';
import firebase from 'firebase';

function App() {

  return (
    <Router>
      <div className="App">
        <Greeting />
        <Route path="/game" exact component={NavTabs} />
        <Route path="/login" component={Login} />
      </div>
    </Router> 
  );
}

export default App;
