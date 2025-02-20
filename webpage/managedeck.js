let cardArray = [];
let cards = "";
let cardQty = 0;
let newCardActive = true;
const button = document.getElementById("saveButton");
const  listElement = document.getElementById("cardList");
const  questionField = document.getElementById("questionTextArea");
const  answerField = document.getElementById("answerTextArea");
const  cancelButton = document.getElementById("cancelButton");
const  newCard = document.getElementById("newCard");
async function postData(questionText, answerText) {
    const url = "http://localhost:8080/flashcards";

    try {
        const response = await fetch(url, {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({question: questionText, answer: answerText, deckID: 1})
        });
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
//postData("What does the * character symbolize in C?", "A nightmare.")

async function getData() {
    const url = "http://localhost:8080/flashcarddecks/1"

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        changeTextAreaInActive()

        return JSON.stringify(json);

    } catch (error) {
        console.error(error.message);
    }
}

async function populateList() {
    listElement = document.getElementById("cardList");
    cards = JSON.parse(await getData());
    for(let i = 0; i < cards.cards.length; i++) {
        cardArray[i] = {question: cards.cards[i].question, answer: cards.cards[i].answer, cardID : cards.cards[i].cardID}
    }
    cardQty = cardArray.length;
    document.getElementById("cardQty").innerText = `${cardQty} Cards`;
    listElement.appendChild(new Option(cardArray[0].question, "0", true, false));
    if (cardArray.length > 1) {
        for (let i = 1; i < cardArray.length; i++) {
            listElement.appendChild(new Option(cardArray[i].question, i.toString(), false, false));
        }
    }
    document.getElementById("saveButton").disabled = true;
    console.log(listElement.selectedIndex);
}


function populateFields() {
    newCardActive = false;
    let button = document.getElementById("saveButton");
    if (button.disabled) {
        button.disabled = false;
    }
    let cancelButton = document.getElementById("cancelButton");
    cancelButton.disabled = true;
    console.log("populateFields called");
    let index = Number(listElement.value)
    console.log(cardArray[index].question)
    questionField.value = cardArray[index].question;
    answerField.value= cardArray[index].answer;
}


async function updateData(id,questionText,answerText) {
    const url = `http://localhost:8080/flashcards/${id}`
    try {
        const response = await fetch(url, {
            method: 'PUT', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({question: questionText, answer: answerText, deckID: 1})
        });
        if (!response.ok) { throw new Error(`Response Status : ${response.status}`)};
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
}

function changeTextAreaActive() {
        answerField.disabled = false;
        questionField.disabled = false;
}

function changeTextAreaInActive() {
    answerField.disabled = true;
    questionField.disabled = true;
}
function changedTextArea() {
    if (!newCardActive) {
        cancelButton.disabled = false;
        if (questionField.value !== cardArray[listElement.selectedIndex].question || answerField.value !== cardArray[listElement.selectedIndex].answer) {
            saveButton.disabled = false;
        } else {
            saveButton.disabled = true;
        }
    } else {
        saveButton.disabled = false;
        if (questionField.value.length === 0 || answerField.value.length === 0) {
            saveButton.disabled = true;
        }
    }

}

function editCard() {
    listElement.disabled = true;
    changeTextAreaActive();
    button.disabled = true;
    button.innerText = "Save Card";
    button.setAttribute("onclick", "saveCard()");
    cancelButton.disabled = false;
    newCard.disabled = true;

}

function enableSaveButton() {
    button.disabled = false;
    button.innerText = "Save Card";
    button.setAttribute("onclick", "saveCard()");
}
function saveCard() {
    let index = Number(listElement.value);
    if (!newCardActive) {
        listElement.options[listElement.selectedIndex].innerText = questionField.value;
        updateData(cardArray[index].cardID, questionField.value, answerField.value);
    } else {
        listElement.appendChild(new Option(questionField.value, (cardArray.length + 1).toString(), false, false));
        postData(questionField.value, answerField.value);
    }
    newCard.disabled = false;
    listElement.disabled = false;
    button.disabled = true;
    changeToEditButton();
    cancelButton.disabled = false;

}

function addNewCard() {
    newCardActive = true;
    newCard.disabled = true;
    changeTextAreaActive();
    enableSaveButton();
    button.disabled = true;
    cancelButton.disabled = false;
    listElement.selectedIndex = -1;
    listElement.disabled = true;
    questionField.value = "";
    answerField.value = "";
    questionField.placeholder = "Enter your question here...";
    answerField.placeholder = "Enter your answer here...";

}

function cancelCard() {
    listElement.disabled = false;
    newCard.disabled = false;
    changeToEditButton();
    cancelButton.disabled = true;
    changeTextAreaInActive();
    listElement.selectedIndex = -1;
    questionField.value = "";
    answerField.value = "";
}

function changeToEditButton(){
    let button = document.getElementById("saveButton");
    button.setAttribute("onclick", "editCard()");
    button.innerText = "Edit Card";
}

populateList()


