import {useEffect, useState} from 'react'
import './App.css'
import Axios from "axios";
import Flashcard from "../Components/Flashcard.jsx";
import ControlButton from "../Components/ControlButton.jsx";
import MessageAnimate from "../Components/MessageAnimate.jsx";
let originalFetchedDeck;
let skippedDeck = [];
let deckIndex = 0;
let deckLength = 0;

function App() {
    const [deck, setDeck] = useState({cards:[]});
    const [card, setCard] = useState({});
    const [flip, setFlip] = useState(false);
    const [skippedQty, setSkippedQty] = useState(0);
    const [deckStatus, setDeckStatus] = useState(false);
    const [endDeck, setEndDeck] = useState(false);
    useEffect(()=>{
        fetchData();
        //setCard(deck.cards[deckIndex]);
    }, [])

    useEffect( ()=>console.log(deck), [deck]);

    async function fetchData() {
        const data = await Axios.get('http://localhost:8080/flashcarddecks/1')

        setDeck(data.data);
        originalFetchedDeck = data.data;
        setCard(data.data.cards[deckIndex]);
        deckLength = data.data.cards.length;
        console.log(data.data.length);
        console.log(data.data);
        console.log(card);
        console.log(deck);
    }

    function handleRestart() {
        console.log("restart func");
        setDeck(curr=>{return {...curr, cards: originalFetchedDeck.cards}})
        deckIndex = 0;
        setCard(originalFetchedDeck.cards[deckIndex])
        deckLength = originalFetchedDeck.cards.length;
        setEndDeck(false);
        skippedDeck = []
        setSkippedQty(0);
    }

    function handleNext() {
        console.log("next func");
        let newIndex = 0;
        if (deckIndex===deckLength - 1) {
            newIndex = 0;
            deckIndex = 0;
            setEndDeck(true);
        } else {
            deckIndex++;
            newIndex = deckIndex;
        }
        setCard(deck.cards[newIndex])
        setFlip(false);
    }

    function handleFlip(e) {
        setFlip((flip)=> !flip);
    }

    function startSkippedDeck() {
        deckLength = skippedDeck.length;
        setDeck(curr=> {return {...curr, cards: skippedDeck}});
        setCard(skippedDeck[deckIndex]);

        setEndDeck(false);
        setSkippedQty(0);

    }

    function handleSkip() {
        if (!skippedQty) {
            skippedDeck = [];
        }
        console.log("skip func");
        setSkippedQty(skp=>skp + 1);
        skippedDeck.push(card);
        console.log(skippedDeck);
        handleNext();
    }

  return (
      <>
      <h2 className="jbFont">{deck.name}</h2>
          <h5 className="jbFont">{`Card ${deckIndex + 1} of ${deckLength}`}</h5>
          <div className="mainContent">
              {!endDeck && <Flashcard content={flip ? card.answer: card.question} flipFunc={e=>handleFlip(e)}/>}
              {endDeck && <MessageAnimate msg="You have reached the end!"/>}
          </div>
          <div className="controls">
              <ControlButton disabled={deckStatus} controlText={"Restart"} func={handleRestart}/>
              {!endDeck && (<>

                  <ControlButton disabled={deckStatus} controlText={"Next"} styleClass={"controlButton nextButton"} func={handleNext}/>
                    <ControlButton disabled={deckStatus} controlText={skippedQty ? `Skip (${skippedQty})`: "Skip"}  func={handleSkip}/>
                </>)
              }
              {endDeck && (skippedQty>0) && (<>
                  <ControlButton controlText={"Load Skipped Cards"} func={startSkippedDeck}/>
              </>
                  )
              }
          </div>
      </>
  )
}

export default App
