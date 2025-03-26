import './ComponentStyles.css'
import {useState} from "react";
import ControlButton from "./ControlButton.jsx";


export default function Flashcard({question, answer}){
    //const question = flashcard.question;
    //const answer = flashcard.answer
    const [flip, setFlip] = useState(false);

    function handleFlip() {
        setFlip((status)=> !status)
    }


    return(
        <>
        <div onClick={handleFlip} id="flashCard">
            {flip ? answer : question}
        </div>

        </>
    )
}