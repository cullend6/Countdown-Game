import React from 'react';
import NumbersGame from "./components/NumbersGame.component";
import LettersGame from "./components/LettersGame.component";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./styles/App.css"
import Button from "@material-ui/core/Button";
import NavTabs from './components/NavBar.component';

function App() {

  return (
      <div className="App">
        <NavTabs />
        <h1 className="Title">COUNTDOWN</h1>     
      </div>
  );
}

export default App;
