import {useState} from "react";
import ControlButton from "./ControlButton.jsx";

export default function DeckEdit({cards}) {
    const [editingCard, setEditingCard] = useState (false);
    const [addingCard, setAddingCard] = useState (false);
    const [deleteDisabled, setDeleteDisabled] = useState(false);

    console.log(cards);

    function handleDelete() {
        console.log("deleteFunc");
    }

    return(
        <>
            {!editingCard && !addingCard && (<><select size={20} name="cardlist" className="deckList">
                {cards.map(card=><option key={card.cardID} value={card.cardID}>{card.question}</option>)}</select>
                <div className="controls">
                <ControlButton func={handleDelete} controlText={"Delete Card"} disabled={deleteDisabled}/>
            </div></>)}

        </>
    )


}