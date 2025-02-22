let cardArray = [];
let cards = "";
let qIndex = 0;
let title = "";
let skipped = [];
let skippedQty = 0;
let end = false;
const progressText = document.getElementById("progress");
const deckNameText = document.getElementById("deckNameH1");
const content = document.getElementById('flashCardContent');
const skippedElement = document.getElementById('skippedSpan');
const nextButton = document.getElementById("nextButton");
const skipButton = document.getElementById("skipButton");

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


async function load() {
    const question1 = getData();
    cards = JSON.parse(await question1);
    console.log(cards.cards[0].question);
    for (let i = 0; i < cards.cards.length; i++) {
        cardArray[i] = {question: cards.cards[i].question, answer: cards.cards[i].answer}
    }
    title = cards.name;
    updateName();
    progressText.innerText = "Card " + (qIndex+1) + " out of " + cardArray.length;
    content.innerHTML = cardArray[0].question;
}

function loadSkippedCards() {
    cardArray = null;
    cardArray = []
    for (let i = 0; i < skipped.length; i++) {
        cardArray[i] = skipped[i];
    }
    skipped = null;
    skipped = [];
    end = false;
    skippedQty = 0;
    console.log(cardArray);
    skipButton.disabled = false;
    skippedElement.hidden = true;
}

function nextCard() {
    if (end) {
        loadSkippedCards();
        nextButton.innerText = "Next";
        end = false;
        qIndex = -1;
        updateProgress()

    }
    if (qIndex === cardArray.length - 1) {
        content.innerHTML = "You have reached the end!";
        end = true;
        skipButton.disabled = true;
        endDeck();
        return;
    }
    content.innerHTML = cardArray[++qIndex].question
    updateProgress()
}

function endDeck() {
    if (skippedQty > 0) {
        nextButton.innerHTML = "Load skipped cards";
    } else {
        skipButton.disabled = true;
        nextButton.disabled = true;
    }
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
    skippedElement.hidden = true;
    content.innerText = cardArray[++qIndex].question;
    nextButton.innerText = "Next";
    nextButton.disabled = false;
    skipButton.disabled = false;
    updateProgress();
}

function skip(){
    if (end) {
        return;
    }
    skippedElement.hidden = false;
    skippedElement.innerHTML = ++skippedQty;
    skipped.push(cardArray[qIndex])
    if (qIndex === cardArray.length - 1) {
        content.innerHTML = "You have reached the end!";
        end = true;
        skipButton.disabled = true;
        endDeck();
        return;
    }
    content.innerHTML = cardArray[++qIndex].question
    updateProgress();

}

function flipCard() {
    if (end) {
        return;
    }
    if (content.innerText === cardArray[qIndex].question) {
        content.innerHTML = cardArray[qIndex].answer;
    } else {
        content.innerHTML = cardArray[qIndex].question
    }
}

function updateProgress() {
    progressText.innerText = "Card " + (qIndex+1) + " out of " + cardArray.length;
}

function updateName() {
    deckNameText.innerText = title;
}

load()