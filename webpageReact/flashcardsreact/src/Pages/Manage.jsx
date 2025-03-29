import Axios from "axios";
import {useEffect, useState} from "react";
import DeckEdit from "../Components/DeckEdit.jsx";
let deckIndex = 0;
let deckLength = 0;
export default function Manage(){

    const [deck, setDeck] = useState({cards:[]});
    const [card, setCard] = useState({});
    useEffect(()=>{
        fetchData();
        //setCard(deck.cards[deckIndex]);
    }, [])
    async function fetchData() {
        const data = await Axios.get('http://localhost:8080/flashcarddecks/1')

        setDeck(data.data);
        setCard(data.data.cards[deckIndex]);
        deckLength = data.data.cards.length;
        console.log(data.data.length);
        console.log(data.data);
        console.log(card);
        console.log(deck);
    }
    return (
        <>
            <DeckEdit reloadChange={fetchData} cards={deck.cards}/>

        </>
    )
}