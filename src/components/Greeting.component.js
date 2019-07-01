import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function Greeting() {

    const [greetingDone, setGreetingDone] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setGreetingDone(true);
        }, 3000);
    })

    return (
        <div>
            { greetingDone ? <Redirect push to='/login'/> : <h1> Welcome to Countdown</h1> }
        </div>
    )
}
