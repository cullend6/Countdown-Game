import React, { useState } from 'react';
import './App.css';

function App() {

  const [numberArray, setnumberArray] = useState([]);
  const [bigNums, setbigNums] = useState(0);
  const [smallNums, setsmallNums] = useState(0);
  const [hidden, sethidden] = useState(true);
  const [solution, setsolution] = useState("");
  const [target, settarget] = useState(0);
  const [hideAnswer, sethideAnswer] = useState(true);
  const [targetIsHidden, settargetIsHidden] = useState(true);

  const operators = ["+","-","/","*"];

  function numbersSubmitted(e){
    e.preventDefault();

    const bigNumberChoices = [10, 25, 50, 75, 100];

    if( (+bigNums + +smallNums) !== 6){
      sethidden(true);
    }
    else if (+bigNums === 2){
      setnumberArray([bigNumberChoices[Math.floor(Math.random() * 5)], bigNumberChoices[Math.floor(Math.random() * 5)],Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9)]);
      sethidden(false);
    }
    else if (+bigNums === 1){
      setnumberArray([bigNumberChoices[Math.floor(Math.random() * 5)],Math.ceil(Math.random() * 9) ,Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9)]);
      sethidden(false);
    }
    else {
      setnumberArray([Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9),Math.ceil(Math.random() * 9)]);
      sethidden(false);
    }
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


    settarget(eval(expression));
  
    setsolution(expression);

    settargetIsHidden(false);
  }


  //take values from form and set state
  function changeBigNums(e){
    setbigNums(e.target.value);
  }

  function changeSmallNums(e){
    setsmallNums(e.target.value);
  }

  

  //render hidden numbers
  function renderNumbers(){  
     return ( 
       numberArray.map(numberArray => (
        <div>{numberArray}</div>
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

        <label>Choose Small Numbers:</label> <br />
        <select id="SmallNums" onChange={changeSmallNums}>
         <option value="0">0</option>
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option>
        </select>

        <br />
        <input type="submit" value="Go"></input>

      </form>   
      </div>
      <div>
        {!hidden ? renderNumbers() : <div>Please make sure the numbers add up to 6</div>}
      </div>



      {!hidden ? <button onClick={createProblem}>Create target</button> : null}
      
      <br />
      {targetIsHidden ? null : target}

      <br />
      {!hidden ? (hideAnswer ? <button onClick={() => sethideAnswer(false)}>Reveal Answer</button> : <div>{solution}</div>) : null}
    </div>
  );
}

export default App;
