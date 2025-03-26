import {useEffect, useState} from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Axios from "axios";
import Flashcard from "../Components/Flashcard.jsx";
import ControlButton from "../Components/ControlButton.jsx";


function App() {
    const [deck, setDeck] = useState({cards:[]});
    let deckIndex = 0;
    let deckLength = 0;
    const [card, setCard] = useState({});
    useEffect(()=>{
        fetchData();
        //setCard(deck.cards[deckIndex]);
    }, [])

    async function fetchData() {
        const data = await Axios.get('http://localhost:8080/flashcarddecks/1')

        setDeck(data.data);
        setCard(data.data.cards[deckIndex]);
        deckLength = data.data.length;
        console.log(data.data.length);
        console.log(data.data);
        console.log(card);
        console.log(deck);
    }

    function handleRestart() {
        console.log("restart func");
    }

    function handleNext() {
        console.log("next func");
        let newIndex = 0;
        if (deckIndex===deckLength - 1) {
            newIndex = 0;
            deckIndex = 0;
        } else {
            deckIndex++;
            newIndex = deckIndex;
        }
        setCard(deck.cards[newIndex])
    }

    function handleSkip() {
        console.log("skip func");
    }


  return (
      <>
      <h2>{deck.name}</h2>

          <Flashcard question={card.question} answer ={card.answer}/>
          <div className="controls">
            <ControlButton control={"Restart"} func={handleRestart}></ControlButton>
            <ControlButton control={"Next"} func={handleNext}></ControlButton>
            <ControlButton control={"Skip"} func={handleSkip}></ControlButton>
          </div>
      </>
  )
}

export default App
