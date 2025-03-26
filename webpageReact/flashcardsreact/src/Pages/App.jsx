import {useEffect, useState} from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Axios from "axios";
import Flashcard from "../Components/Flashcard.jsx";


function App() {
    const [deck, setDeck] = useState({cards:[]});
    const [deckIndex, setDeckIndex] = useState(0);
    const [card, setCard] = useState({});
    useEffect(()=>{
        fetchData();
    }, [])

    async function fetchData() {
        await Axios.get('http://localhost:8080/flashcarddecks/1')
            .then((response) => {setDeck(response.data)}).catch((error)=>console.log(error))
    }




  return (
      <>
      <h2>{deck.name}</h2>
          <Flashcard flashcard={deck.cards[0]} index={deckIndex} />
      </>
  )
}

export default App
