import './ComponentStyles.css'



export default function Flashcard({content, flipFunc}){


    return(

        <div onClick={flipFunc} id="flashCard">
            {content}
        </div>

    )
}