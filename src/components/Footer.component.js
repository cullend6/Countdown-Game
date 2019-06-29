import React, {useState} from 'react';
import Button from '@material-ui/core/Button'; 

export default function Footer(props) {

    const [helpShouldBeDisplayed, setHelpShouldBeDisplayed] = useState(false);


    function displayHelp(){
        if(props.game === null){
            return;
        }
        else if(props.game === 0){
            return (
                <div>
                    You will be given six numbers, with up to three large numbers. <br />
                    Once your numbers have been given, you can create a target. <br />
                    This target is always attainable by using the given numbers and basic mathematical operators. <br />
                    Once the target has been created you may start a 30 second timer. <br />
                    There is also a button to reveal the solution.
                </div>
            )
        }
        else if(props.game === 1){
            return (
                <div>
                    You will choose nine letters, made up of consonants and vowels using the appropriate buttons. <br />
                    Once you have nine letters you may start a timer. A text box will also appear which you can use to enter your answer. <br />
                    When your answer is submitted, it will be checked to ensure you used the valid letters and that the word exists in the English dictionary.
                </div>
            )
        }
    }
    
    function handleButtonClick(){
        setHelpShouldBeDisplayed(!helpShouldBeDisplayed);
    }

    return (
        <div className="Footer">
            <h1 className="Title">
                COUNTDOWN
            </h1>
            <Button color='inherit' onClick={handleButtonClick}>{helpShouldBeDisplayed ? 'Hide Help' : 'Show Help'}</Button>
            { helpShouldBeDisplayed ? displayHelp() : null}   
        </div>
    )
}
