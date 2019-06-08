import React, { useState } from 'react';
import '../styles/NumbersGame.css';
import Timer from './Timer.component';
import CountdownMusic from "../TheCountdownClock.mp3"
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


function NumbersGame(){

  const WhiteRadio = withStyles({
    root: {
      color: grey[50],
      '&$checked': {
        color: grey[50],
      },
    },
    checked: {},
  })(props => <Radio color="default" {...props} />);

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


  function playAudio() {
    let audio = new Audio("./TheCountdownClock.mp3");
    let audioPromise = audio.play();    

    if (audioPromise !== undefined) {
      console.log("Defined");
      audioPromise.then(_ => {
        console.log("Autoplay");
      }).catch(error => {
        console.log(error);
      });
    }
  }
  
  function startTimer(){
    playAudio();

    return (
      <Timer />
    )
  }

  function playAudio(){
       
    let sound = new Audio(CountdownMusic);

    let soundPromise = sound.play();

    soundPromise.then(() => console.log("playing")).catch((err) => console.log(err));

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

    <h3>Choose Big Numbers</h3>

      <FormControl component="fieldset">
        <RadioGroup
          aria-label="Big Numbers"
          name="bignumbers"
          value={bigNums}
          onChange={changeBigNums}
        >
          <FormControlLabel value="0" control={<WhiteRadio />} checked="true" label="Zero" />
          <FormControlLabel value="1" control={<WhiteRadio />} label="One" />
          <FormControlLabel value="2" control={<WhiteRadio />} label="Two" />
        </RadioGroup>
      </FormControl>
      <br />
      <input type="submit" className="Button" onClick={numbersSubmitted} value="Go"></input>

      <br />
      <br />
      {listHasBeenGenerated ? renderNumbers() : null}

      {listHasBeenGenerated ? <div><button className="Button" onClick={createProblem}>Create target</button></div> : null }
      
      {targetHasBeenGenerated ? target : null}
      
      {targetHasBeenGenerated ? <div><button className="Button" onClick={() => setAnswerShouldBeShown(!answerShouldBeShown)}>{answerShouldBeShown ? "Hide" : "Show"} Answer</button></div> : null }

      {answerShouldBeShown ? <div className="Answer">{solution}</div> : null }

      {targetHasBeenGenerated ? <div><button className="Button" onClick={() => setTimerShouldBeDisplayed(!timerShouldBeDisplayed)}>{timerShouldBeDisplayed ? "Stop" : "Start"} Timer</button></div> : null}

      {timerShouldBeDisplayed ? startTimer() : null}

    </div>
  );

}

export default NumbersGame;
