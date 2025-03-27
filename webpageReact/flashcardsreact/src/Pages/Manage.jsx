import Axios from "axios";
import {useEffect, useState} from "react";
import DeckList from "../Components/DeckList.jsx";
let deckIndex = 0;
let deckLength = 0;
export default function Manage(){

    const [deck, setDeck] = useState({cards:[]});
    const [card, setCard] = useState({});
    const [editingCard, setEditingCard] = useState (false);
    const [addingCard, setAddingCard] = useState (false);
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
            {!editingCard && !addingCard && <DeckList cards={deck.cards}/>}

        </>
    )
}