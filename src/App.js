import React from 'react';
import NumbersGame from "./components/NumbersGame.component";
import LettersGame from "./components/LettersGame.component";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./styles/App.css"

function App() {

  return (
    <Router>
      <div className="App">
        <h1 className="Title">COUNTDOWN</h1>
        <div>
          <button className='Button'>
            <Link to="/numbers">Numbers</Link>
          </button>
          <button className ='Button'>
           <Link to="/letters">Letters</Link>
          </button>
        </div>
        <Route path="/numbers" exact component={NumbersGame} />
        <Route path="/letters" exact component={LettersGame} />        
      </div>
    </Router>
  );
}

export default App;
