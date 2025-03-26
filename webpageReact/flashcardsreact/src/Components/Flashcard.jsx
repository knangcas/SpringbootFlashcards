import './ComponentStyles.css'
import {useState} from "react";


export default function Flashcard({flashcard, index}){
    console.log(flashcard)
    //const answer = flashcard.answer;
    const [flip, setFlip] = useState(false);
    return(
        <div id="flashCard">

        </div>

    )
}