import React, { useState, useEffect } from 'react'

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
   
     return (
        <div className="TimerText">
          {output}
        </div>
    )
}  




export default Timer;
