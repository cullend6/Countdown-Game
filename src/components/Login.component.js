import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import base from '../base';
import firebase from 'firebase';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValidation, setPasswordValidation] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function handleLogin(){


        setIsLoading(true);

        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            setEmail('');
        })
        
        
        
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            setErrorMessage(errorMessage);
        });

        setIsLoading(false);
    }

    function handleCreateUser(){

        setIsLoading(true);

        if(password !== passwordValidation){
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorMessage);
            // ...
          });

          setIsLoading(false);
    }

    function handleEmailChange(e){
        setEmail(e.target.value);
    }

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    function handlePasswordValidationChange(e){
        setPasswordValidation(e.target.value);
    }

    function handleSignUp(){
        setShowLogin(!showLogin);
    }

    return (
        <div className='Login'>
            
        { firebase.auth().currentUser !== null ? <Redirect push to ='/game'/> : null}
        { isLoading ? <div>LOADING</div> : null}
        { errorMessage }
        { showLogin ?
            <div>
                <FormControl component="fieldset">
                    <TextField
                        label='Enter Email' 
                        type='email'
                        onChange={handleEmailChange}
                        />
                </FormControl>
                <br />
                <FormControl component="fieldset">
                    <TextField
                        label='Enter Password'
                        type='password' 
                        onChange={handlePasswordChange}
                        />
                </FormControl>
                <br />
                <Button type="submit" color='inherit' className="Button" onClick={handleLogin}>Login</Button>
                <br />
                <Button type="submit" color='inherit' className="Button" onClick={handleSignUp}>Sign Up</Button>
            </div> 
            
            :
            
            <div>
                <FormControl component="fieldset">
                    <TextField
                        label='Enter Email' 
                        type='email'
                        onChange={handleEmailChange}
                        />
                </FormControl>
                <br />
                <FormControl component="fieldset">
                    <TextField
                        label='Enter Password'
                        type='password' 
                        onChange={handlePasswordChange}
                        />
                </FormControl>
                <br />
                <FormControl component="fieldset">
                    <TextField
                        label='Check Password'
                        type='password' 
                        onChange={handlePasswordValidationChange}
                        />
                </FormControl>
                <br />
                <Button type="submit" color='inherit' className="Button" onClick={handleCreateUser}>Create User</Button>
                <br />
                <Button type="submit" color='inherit' className="Button" onClick={handleSignUp}>Back</Button>
            </div>
            
            }
        </div>
    )
}
