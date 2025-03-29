import {useEffect, useState} from "react";
import ControlButton from "./ControlButton.jsx";
import Axios from "axios";
import MessageAnimate from "./MessageAnimate.jsx";

export default function DeckEdit({reloadChange, cards}) {
    const [editingCard, setEditingCard] = useState (false);
    const [addingCard, setAddingCard] = useState (false);
    const [cardSelected, setCardSelected] = useState({});
    const [selectedItem, setSelectedItem] = useState(false);
    const [newCard, setNewCard] = useState({});
    const [editCard, setEditCard] = useState ({});
    const [showAnimation, setShowAnimation] = useState(false);
    //useEffect(()=> {console.log(newCard)}, [newCard])
    console.log(cards);

    async function handleDelete() {
        console.log("deleteFunc");
        const response = await Axios.delete(`http://localhost:8080/flashcards/${cardSelected.cardID}`);
        console.log(response);
        reloadChange();
        savedAnimation();
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

    function handleBoxChange(e) {
        if (addingCard) {
            if (e.target.className === "questionBox") {
                setNewCard(card => {
                    return {...card, question: e.target.value}
                })
            }
            if (e.target.className === "answerBox") {
                setNewCard(card => {
                    return {...card, answer: e.target.value}
                })
            }
        }
        if (editingCard) {
            if (e.target.className === "questionBox") {
                setEditCard(card => {
                    return {...card, question: e.target.value}
                })
            }
            if (e.target.className === "answerBox") {
                setEditCard(card => {
                    return {...card, answer: e.target.value}
                })
            }
        }
    }

    function handleEditCard() {
        setEditCard(cardSelected);
        setEditingCard(true);
    }

    async function postCard() {
        console.log("post req to sever");
        const response = await Axios.post("http://localhost:8080/flashcards", {...newCard, deckID: 1});
        if (response.status===200) {
            console.log(response.data);
            setAddingCard(false);
            setNewCard({});
            setSelectedItem(false);
            reloadChange();
            savedAnimation();
        } else {
            console.log(response);
        }

    }

    function cancelCard() {
        setNewCard({});
        setAddingCard(false);
        setEditingCard(false);
        setCardSelected({});
        setSelectedItem(false);
    }

    function savedAnimation() {
        setShowAnimation(true);
        setTimeout(()=>{setShowAnimation(false);}, 2000);
    }



    async function putCard() {
        console.log("edited card");
        const response = await Axios.put(`http://localhost:8080/flashcards/${editCard.cardID}`, editCard)
        if (response.status===200) {
            console.log(response.data);
            setEditingCard(false);
            reloadChange();
            setSelectedItem(false);
            savedAnimation();

        } else {
            console.log(response);
        }
    }



    return (
        <>
            {!editingCard && !addingCard && (<><select onChange={handleChange} size={20} name="cardlist" className="deckList">
                {cards.map(card=><option  key={card.cardID} value={card.cardID}>{card.question}</option>)}</select>
                <div className="controls">
                <ControlButton func={handleDelete} controlText={"Delete Card"} disabled={!selectedItem}/>
                    <ControlButton func={addCard} controlText={"Add Card"}/>
                    <ControlButton func={handleEditCard} controlText={"Edit Card"} disabled={!selectedItem}/>
            </div></>)}
            {(addingCard || editingCard) && (<><div className="addEditContent">
                    Question:
                    <textarea value ={editingCard ? editCard.question : ""} className={"questionBox"} onChange={(e)=>{handleBoxChange(e)}} rows={9}/>
                    Answer:
                    <textarea value ={editingCard ? editCard.answer : ""} className={"answerBox"} onChange={(e)=>{handleBoxChange(e)}} rows={9}/>
                </div>
                    <div className="controls">
                        {addingCard && <ControlButton func={postCard} controlText={"Add Card"} disabled={!newCard.question || !newCard.answer}/>}
                        {editingCard && <ControlButton func={putCard} controlText={"Save Card"} disabled={cardSelected.question === editCard.question && cardSelected.answer === editCard.answer}/>}
                        <ControlButton func={cancelCard} controlText={"Cancel"} />
                    </div>
                </>
            )}
            {showAnimation && (<MessageAnimate msg="Changes Saved!"/>)}
        </>
    )


}