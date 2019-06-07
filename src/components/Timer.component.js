import React, { useState, useEffect } from 'react'
import CountdownMusic from '../TheCountdownClock.mp3'
//import Sound from 'react-sound';


function Timer() {
    const [time, setTime] = useState(30);
    const [output, setOutput] = useState("");

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
   
     function playAudio(){
       
      let sound = new Audio(CountdownMusic);

      let soundPromise = sound.play();

      soundPromise.then(() => console.log("playing")).catch((err) => console.log(err));

     }


     return (
        <div className="TimerText">
          {output}

          

        </div>
    )
}  




export default Timer;
