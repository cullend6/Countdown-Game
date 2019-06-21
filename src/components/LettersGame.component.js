import React, { useState } from 'react'
import Timer from './Timer.component';
import WordChecker from './WordChecker.component';
import CountdownMusic from "../TheCountdownClock.mp3"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function LettersGame() {

    const [letters, setLetters] = useState('');
    const [userAnswer , setUserAnswer] = useState('');

    const [timerShouldBeDisplayed, setTimerShouldBeDisplayed] = useState(false);
    const [answerHasBeenSubmitted, setAnswerHasBeenSubmitted] = useState(false);

    const consonants = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
    const vowels = ['A','E','I','O','U'];

    function addVowel(){
        let vowel = vowels[Math.floor(Math.random()*5)];
        let newLetter = letters + vowel;
        setLetters(newLetter);
    }

    function addConsonant(){
        let consonant = consonants[Math.floor(Math.random()*21)];
        let newLetter = letters + consonant;
        setLetters(newLetter);
    }

    function handleChange(e){
        setUserAnswer(e.target.value);
    }

    function handleReset(){
        setLetters('');
        setTimerShouldBeDisplayed(false);
        setAnswerHasBeenSubmitted(false);
    }

    function checkWordButtonClick(){
        setTimerShouldBeDisplayed(false);
        setAnswerHasBeenSubmitted(true);
    }

    function startTimer(){
        //playAudio();      
        return (
            <Timer />
        )
    }
    
    function playAudio(){      
        let sound = new Audio(CountdownMusic);
        let soundPromise = sound.play();
        soundPromise.then(() => console.log("playing")).catch((err) => console.log(err));
    }

    return (
        <div>
            { letters.length < 9 ?
                <div>
                    <br />
                    <Button onClick={addVowel} className='Button' color='inherit'>Add Vowel</Button>
                    <Button onClick={addConsonant} className='Button' color='inherit'>Add Consonant</Button>
                </div> : 
                <div>
                    <br />
                    <Button className='Button' color='inherit' onClick={() => setTimerShouldBeDisplayed(!timerShouldBeDisplayed)}>{timerShouldBeDisplayed ? "Stop" : "Start" } Timer</Button>
                </div>}
                { letters.length === 0 ? null : <div className='Numbers'>{letters}</div> } 
                { timerShouldBeDisplayed ? 
                    <div>
                        {startTimer()}
                    </div>  :
                    null
                }
                { timerShouldBeDisplayed && !answerHasBeenSubmitted ?
                    <div>
                        <TextField onChange={handleChange} inputProps={{style: {fontsize: 40}}}></TextField>
                        <br />
                        <Button className='Button' color='inherit' onClick={checkWordButtonClick}>Check Word</Button>
                    </div> : null
                }
                {answerHasBeenSubmitted ? <WordChecker answer={userAnswer} letters={letters}/> : null}
                <br />
                <Button className='Button' color='inherit' onClick={handleReset}>Reset</Button>
        </div>
    )
}
