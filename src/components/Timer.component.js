import React, { useState, useEffect } from 'react'
//import CountdownMusic from '../TheCountdownClock.mp3'

function Timer() {
    const [time, setTime] = useState(30);
    const [output, setOutput] = useState("");
    const [userAnswer, setUserAnswer] = useState('');

    useEffect(() => {

    if(time > -1){
        var timerID = setInterval( () => tick(), 1000 );

        return function cleanup() {
            clearInterval(timerID);
        };
    }

    else {
        setOutput("Times up dork.");
    }


    });
   
     function tick() {
      setTime(time-1);
      setOutput(time);
     }
     
     function handeChange(e){
         setUserAnswer(e.target.value);
     }


     return (
         <div>
          {output}
        </div>
    )
}  




export default Timer;
