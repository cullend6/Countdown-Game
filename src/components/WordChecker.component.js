import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WordChecker(props) {

    const [answerIsValid, setAnswerIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [wordIsValid, setWordIsValid] = useState(false);

    useEffect(() => {
        checkWordIsValid(props);
        if(wordIsValid){
            checkWordExists(props.answer);
        }
    })

    function checkWordExists(word){
        axios.get('https://dictionaryapi.com/api/v3/references/collegiate/json/'+ word +'?key=8169f5d1-0b8a-4fb1-9e57-9ec6fb8141d7')
            .then(response => {
                console.log(response);
                if(!response.data[0].meta){
                    setAnswerIsValid(false);
                    setIsLoading(false);
                } else {
                    setAnswerIsValid(true);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setAnswerIsValid(false);
                setIsLoading(false);
            })
            
    }

    function checkWordIsValid(props){
        let lettersArray = props.letters.toUpperCase().split("");
        let lettersUsed = lettersArray.map(() => false);

        let userAnswer = props.answer.toUpperCase();

        for(let i=0; i<userAnswer.length; i++){
            let charValid = false;
            for(let j=0; j<lettersArray.length; j++){
                if(userAnswer.charAt(i) === lettersArray[j] && !lettersUsed[j] ){
                    charValid = true;
                    lettersUsed[j] = true;
                    j=lettersArray.length;
                }
            }

            if(!charValid){
                setWordIsValid(false);
                setIsLoading(false);
                return ;
            }
        }

        setWordIsValid(true);
    }

    function displayWord(answer){
        return (
            answerIsValid ? <h1>{answer} is a word</h1> : <h1>{answer} is not a word</h1> 
        )
    }

    return (
        <div>
            {isLoading ? 'Loading' : 
                 !wordIsValid ? "The word entered is not valid" : displayWord(props.answer)}           
        </div>
    )
}
