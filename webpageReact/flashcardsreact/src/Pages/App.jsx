import {useEffect, useState} from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Axios from "axios";


function App() {
    const [deck, setDeck] = useState({});
    useEffect(()=>{
        fetchData();
    }, [])

    async function fetchData() {
        let deck = {}
        await Axios.get('http://localhost:8080/flashcarddecks/1')
            .then((response) => {deck = response.data}).catch((error)=>console.log(error))
        setDeck(deck);
        return deck;
    }


  return (
      <>
      <h2>{deck.name}</h2>
      </>
  )
}

export default App
