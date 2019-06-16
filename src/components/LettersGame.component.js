import React, { useState } from 'react'
import Timer from './Timer.component';
import WordChecker from './WordChecker.component';
import CountdownMusic from "../TheCountdownClock.mp3"
import axios from 'axios';

export default function LettersGame() {

    const [letters, setLetters] = useState('');
    const [userAnswer , setUserAnswer] = useState('');
    const [submittedAnswer, setSubmittedAnswer] = useState('');
    const [answerIsValid, setAnswerIsValid] = useState(false);
    const [checkingWord, setCheckingWord] = useState(false);

    const [timerShouldBeDisplayed, setTimerShouldBeDisplayed] = useState(false);
    const [answerHasBeenSubmitted, setAnswerHasBeenSubmitted] = useState(false);

    const consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'];
    const vowels = ['a','e','i','o','u'];

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

    function checkWordButtonClick(){
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
            { letters.length === 0 ? null : <div className='Numbers'>{letters}</div> } 
            { letters.length < 9 ?
                <div>
                    <br />
                    <button onClick={addVowel} className='Button'>Add Vowel</button>
                    <button onClick={addConsonant} className='Button'>Add Consonant</button>
                </div> : 
                <div>
                    <br />
                    <button className='Button' onClick={() => setTimerShouldBeDisplayed(!timerShouldBeDisplayed)}>{timerShouldBeDisplayed ? "Stop" : "Start" } Timer</button>
                </div>}
                { timerShouldBeDisplayed ? 
                    <div>
                        {startTimer()}
                        <input type="text" onChange={handleChange}></input>
                        <br />
                        <button className='Button' onClick={checkWordButtonClick}>Check Word</button>
                    </div>  :
                    null
                }
                {answerHasBeenSubmitted ? <WordChecker answer={userAnswer} letters={letters}/> : null}
                <button className='Button' onClick={() => setLetters('')}>Reset</button>
        </div>
    )
}
