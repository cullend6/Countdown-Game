import React, { useState, useEffect } from 'react'

export default function NumberAnswerChecker(props) {

    const [answerIsValid, setAnswerIsValid] = useState(false);
    const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAnswer();
        if(answerIsValid && eval(props.answer) == props.target){
            setAnswerIsCorrect(true);
        }
        setIsLoading(false);
    })

    function checkAnswer(){
        let numbersArray = props.numbers;
        let numbersUsed = numbersArray.map(() => false);
        let userAnswer = props.answer.split(/[+,\-,*,/]/);

        console.log(userAnswer);
        for(let i=0; i<userAnswer.length; i++){
            
            let charValid = false;
            for(let j=0; j<numbersArray.length; j++){
                if(userAnswer[i] == numbersArray[j] && !numbersUsed[j] ){
                    charValid = true;
                    numbersUsed[j] = true;
                    j=numbersArray.length;
                }
            }

            if(!charValid){
                setAnswerIsValid(false);
                setIsLoading(false);
                return ;
            }
        }

        setAnswerIsValid(true);
    }

    function displayAnswer(){
        return (
            <div>
                {answerIsCorrect ? 'Well done' : 'Wrong nerd you got ' + eval(props.answer) }
            </div>
        )
    }

    return (
        <div>
            {isLoading ? 'Loading' : 
                answerIsValid ? 
                    displayAnswer()  
                    : 'Your answer was invalid, please check you used the correct numbers' }
        </div>
    )
}
