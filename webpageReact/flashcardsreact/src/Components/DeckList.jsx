export default function DeckList({cards}) {


    console.log(cards);

    return(
        <>
            <select size={20} name="cardlist" className="deckList">
                {cards.map(card=><option key={card.cardID} value={card.cardID}>{card.question}</option>)}
            </select>
        </>
    )


}