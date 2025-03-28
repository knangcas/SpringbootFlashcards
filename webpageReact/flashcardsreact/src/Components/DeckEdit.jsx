import {useEffect, useState} from "react";
import ControlButton from "./ControlButton.jsx";

export default function DeckEdit({cards}) {
    const [editingCard, setEditingCard] = useState (false);
    const [addingCard, setAddingCard] = useState (false);
    const [cardSelected, setCardSelected] = useState({});
    const [selectedItem, setSelectedItem] = useState(false);
    const [newCard, setNewCard] = useState({});
    //useEffect(()=> {console.log(cardSelected)}, [cardSelected])
    console.log(cards);

    function handleDelete() {
        console.log("deleteFunc");
    }

    function handleChange(e) {
        const cardID = Number(e.target.value)

        if (cardID!== -1) {
            setSelectedItem(true);
            console.log("changed!");
            console.log("this is what changed:", cardID)
            setCardSelected(cards.filter((card)=>{return card.cardID === cardID})[0])
        } else {
            setSelectedItem(false);
            setCardSelected({});
        }
    }

    function addCard() {
        setAddingCard(true);

    }

    return(
        <>
            {!editingCard && !addingCard && (<><select onChange={handleChange} size={20} name="cardlist" className="deckList">
                {cards.map(card=><option  key={card.cardID} value={card.cardID}>{card.question}</option>)}</select>
                <div className="controls">
                <ControlButton func={handleDelete} controlText={"Delete Card"} disabled={!selectedItem}/>
                    <ControlButton func={addCard} controlText={"Add Card"}/>
                    <ControlButton func={handleDelete} controlText={"Edit Card"} disabled={!selectedItem}/>
            </div></>)}
            {addingCard && (<>
                    Question:
                <textarea rows={9}/>
                    Answer:
                    <textarea rows={9}/>
                </>
            )}
        </>
    )


}