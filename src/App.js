import React, { useState } from 'react';
import './App.css';
import Timer from './components/Timer.component';

function App() {

  const [numberArray, setNumberArray] = useState([]);
  const [bigNums, setBigNums] = useState(0);
  const [solution, setSolution] = useState("");
  const [target, setTarget] = useState(0);


  const [listHasBeenGenerated, setListHasBeenGenerated] = useState(false);
  const [targetHasBeenGenerated, setTargetHasBeenGenerated] = useState(false);
  const [answerShouldBeShown, setAnswerShouldBeShown] = useState(false);
  const [timerShouldBeDisplayed, setTimerShouldBeDisplayed] = useState(false);

  const operators = ["+","-","/","*"];

  function numbersSubmitted(e){
    e.preventDefault();

    const bigNumberChoices = [10, 25, 50, 75, 100];

    if (+bigNums === 2){
      setNumberArray([bigNumberChoices[Math.floor(Math.random() * 5)], bigNumberChoices[Math.floor(Math.random() * 5)],Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9)]);
    }
    else if (+bigNums === 1){
      setNumberArray([bigNumberChoices[Math.floor(Math.random() * 5)],Math.ceil(Math.random() * 9) ,Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9)]);
    }
    else {
      setNumberArray([Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9)]);
    }

    setListHasBeenGenerated(true);

    //Revert Progress
    setTargetHasBeenGenerated(false);
    setAnswerShouldBeShown(false);
    setTimerShouldBeDisplayed(false);
  }


  function createProblem(){
    let isValidated = false;
    let expression = "";

    while(!isValidated){

      expression = "";
      
      let amountUsed = (Math.round(Math.random() * 2) + 4);
  
      let hasNumBeenUsed = [false, false, false, false, false, false];
  
      for(let i=0; i < amountUsed; i++){
        let number = Math.floor(Math.random() * 6);
  
        while(hasNumBeenUsed[number]){
          number = Math.floor(Math.random() * 6);
        }
  
        const operator = Math.floor(Math.random() * 4);
        
  
        if(i === 0){
          expression = numberArray[number] + operators[operator];
        } else if (i === (amountUsed-1)) {
          expression += numberArray[number];
        } else {
          expression += (numberArray[number] + operators[operator])
        }
  
        hasNumBeenUsed[number] = true;
        
      }
      let finalValue = eval(expression);
      isValidated = (finalValue < 1000) && (finalValue > 100) && (Number.isInteger(finalValue));

    }

    //Set Target and save solution
    setTarget(eval(expression));
    setSolution(expression);

    //Show new buttons
    setTargetHasBeenGenerated(true);

    //Revert progress
    setAnswerShouldBeShown(false);
    setTimerShouldBeDisplayed(false);
    
  }


  //take values from form and set state
  function changeBigNums(e){
    setBigNums(e.target.value);
  }

  //render hidden numbers
  function renderNumbers(){  
     return ( 
       numberArray.map(numberArray => (
        <div className="Numbers">{numberArray}</div>
       ))
     )
  }

  return (
    <div className="App">
      <div className="NumberChooser">
      <h1>Choose Numbers</h1>
      <form onSubmit={numbersSubmitted}>
        <label>Choose Big Numbers:</label> <br />
        <select id="BigNums" onChange={changeBigNums}>
         <option value="0">0</option>
         <option value="1">1</option>
         <option value="2">2</option>
        </select> <br />

        <input type="submit" value="Go"></input>

      </form>   
      </div>
      <div>
        {listHasBeenGenerated ? renderNumbers() : null}
      </div>

      {listHasBeenGenerated ? <div className="Create Target Button"><button onClick={createProblem}>Create target</button></div> : null }
      
      {targetHasBeenGenerated ? target : null}
      
      {targetHasBeenGenerated ? <div className="Show Hide Answer Button"><button onClick={() => setAnswerShouldBeShown(!answerShouldBeShown)}>{answerShouldBeShown ? "Hide" : "Show"} Answer</button></div> : null }

      {answerShouldBeShown ? <div className="Answer">{solution}</div> : null }

      {targetHasBeenGenerated ? <div className="Timer Button"><button onClick={() => setTimerShouldBeDisplayed(!timerShouldBeDisplayed)}>{timerShouldBeDisplayed ? "Stop" : "Start"} Timer</button></div> : null}

      {timerShouldBeDisplayed ? <Timer /> : null}
    </div>
  );
}

export default App;
