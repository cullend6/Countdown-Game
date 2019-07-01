import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';

export default function SignOutButton() {
    
    const [signedOut, setSignedOut] = useState(false);

    function handleClick(){
        firebase.auth().signOut().then(() => {
            setSignedOut(true);
        })
    }

    return (
        <div className='SignOutButton'>
            <Button color='inherit' className="Button" onClick={handleClick}>Sign Out</Button>

            { signedOut ? <Redirect push to='/login' /> : null}
        </div>
    )
}
