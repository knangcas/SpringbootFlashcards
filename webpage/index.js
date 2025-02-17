console.log('Thank you for using WebStorm 💙')
let cardArray = [];
let aArray = [];
let x = 0;
let cards = "";
let qIndex = 0;
let progress = 0;
let title = "";
let skipped = [];
let skippedQty = 0;
let end = false;

async function getData() {
    const url = "http://localhost:8080/flashcarddecks/1";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        return JSON.stringify(json);

    } catch (error) {
        console.error(error.message);
    }


}

function lmao(x2) {
    const link = document.getElementById('tester');
    console.log("oh cool");
    x++;
    console.log(x2);
    link.innerHTML = x2.name + x.toString();


}



async function load() {
    const element = document.getElementById('flashCardContent');

    const question1 = getData();

    cards = JSON.parse(await question1);
    console.log(cards.cards[0].question);
    for (let i = 0; i < cards.cards.length; i++) {
        cardArray[i] = {question: cards.cards[i].question, answer: cards.cards[i].answer}
        //aArray[i] = q.cards[i].answer;
    }

    title = cards.name;

    updateName();



    document.getElementById('progress').innerText = "Card " + (qIndex+1) + " out of " + cardArray.length;


    console.log(aArray);


    element.innerHTML = cardArray[0].question;

}

function loadSkippedCards() {
    cardArray = null;
    cardArray = skipped;
    skippedQty = 0;
    console.log(cardArray);
    document.getElementById("skippedSpan").hidden = true;
}

function nextCard() {
    const nextButton = document.getElementById('nextButton');

    if (end) {
        loadSkippedCards();
        nextButton.innerText = "Next";
        end = false;
        qIndex = -1;
        updateProgress()

    }

    const element = document.getElementById('flashCardContent');
    if (qIndex == cardArray.length - 1) {
        element.innerHTML = "You have reached the end!";
        end = true;
        endDeck();
        return;
    }

    element.innerHTML = cardArray[++qIndex].question
    updateProgress()
}

function endDeck() {
    const element = document.getElementById('nextButton');
    element.innerHTML = "Load skipped cards";

}

function restart() {
    cardArray = null;
    cardArray = [];
    for (let i = 0; i < cards.cards.length; i++) {
        cardArray[i] = {question: cards.cards[i].question, answer: cards.cards[i].answer}
    }
    qIndex = -1;
    skipped = null;
    skippedQty = 0;
    end = false;
    document.getElementById("skippedSpan").hidden = true;
    const element = document.getElementById('flashCardContent');
    element.innerText = cardArray[++qIndex].question;
    updateProgress();
}

function skip(){

    const element = document.getElementById('flashCardContent');
    const skippedElement = document.getElementById('skippedSpan');
    skippedElement.hidden = false;
    skipped.push(cardArray[qIndex])
    element.innerHTML = cardArray[++qIndex].question
    skippedElement.innerHTML = ++skippedQty;
    updateProgress();

}

function updateProgress() {
    document.getElementById('progress').innerText = "Card " + (qIndex+1) + " out of " + cardArray.length;
}

function updateName() {
    document.getElementById("deckNameH1").innerText = title;
}


load()