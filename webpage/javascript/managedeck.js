let cardArray = [];
let cards = "";
let cardQty = 0;
let newCardActive = true;
const cardQtyText = document.getElementById("cardQty");
const button = document.getElementById("saveButton");
const listElement = document.getElementById("cardList");
const questionField = document.getElementById("questionTextArea");
const answerField = document.getElementById("answerTextArea");
const cancelButton = document.getElementById("cancelButton");
const newCard = document.getElementById("newCard");
const cardListDiv = document.getElementById("cardListDiv");
const textAreasDiv = document.getElementById("textAreasDiv");
const deleteCardButton = document.getElementById("deleteCard");
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
    cards = JSON.parse(await getData());
    for(let i = 0; i < cards.cards.length; i++) {
        cardArray[i] = {question: cards.cards[i].question, answer: cards.cards[i].answer, cardID : cards.cards[i].cardID}
    }
    cardQty = cardArray.length;
    cardQtyText.innerText = `${cardQty} Cards`;
    listElement.appendChild(new Option(cardArray[0].question, "0", true, false));
    if (cardArray.length > 1) {
        for (let i = 1; i < cardArray.length; i++) {
            listElement.appendChild(new Option(cardArray[i].question, i.toString(), false, false));
        }
    }
    button.disabled = true;
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
    let index = listElement.selectedIndex;
    console.log(cardArray[index].question)
    questionField.value = cardArray[index].question;
    answerField.value= cardArray[index].answer;
    button.setAttribute("class", "btn btn-primary btn-sm")
    deleteCardButton.disabled = false;
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

async function deleteData(id) {
    const url = `http://localhost:8080/flashcards/${id}`
    try {
        const response = await fetch(url, {method: 'DELETE'});

        if (!response.ok) {
            throw new Error(`Response Status : ${response.status}`)
        }
        ;

    } catch (error) {
        console.error(error.message);
    }

}

function deleteCard() {
    let cardID = cardArray[listElement.selectedIndex].cardID;
    cardArray.splice(listElement.selectedIndex, 1);
    console.log(cardArray);
    deleteData(cardID).then(listElement.remove(listElement.selectedIndex));
    cardQty = cardArray.length;
    cardQtyText.innerText = `${cardQty} Cards`;

}

function changeTextAreaActive() {
        answerField.disabled = false;
        questionField.disabled = false;
}

function changeTextAreaInActive() {
    answerField.disabled = true;
    questionField.disabled = true;
}

function swapToTextAreas() {
    const defaultClass = "btn btn-primary btn-sm"
    cardListDiv.setAttribute("class", "row displayNone");
    textAreasDiv.setAttribute("class", "row");
    cancelButton.setAttribute("class", defaultClass);
    button.setAttribute("class", defaultClass);
    newCard.setAttribute("class", "displayNone");
    deleteCardButton.setAttribute("class", "displayNone");
}

function swapToCardList() {
    const defaultClass = "btn btn-primary btn-sm"
    cardListDiv.setAttribute("class", "row");
    textAreasDiv.setAttribute("class", "row displayNone");
    cancelButton.setAttribute("class", "displayNone");
    newCard.setAttribute("class", defaultClass);
    deleteCardButton.setAttribute("class", defaultClass);
    deleteCardButton.disabled = true;
}

function changedTextArea() {
    if (!newCardActive) {
        cancelButton.disabled = false;
        if (questionField.value !== cardArray[listElement.selectedIndex].question || answerField.value !== cardArray[listElement.selectedIndex].answer) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    } else {
        button.disabled = false;
        if (questionField.value.length === 0 || answerField.value.length === 0) {
            button.disabled = true;
        }
    }

}

function editCard() {
    listElement.disabled = true;
    changeTextAreaActive();
    swapToTextAreas();
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
async function saveCard() {
    let index = Number(listElement.value);
    if (!newCardActive) {
        listElement.options[listElement.selectedIndex].innerText = questionField.value;
        updateData(cardArray[index].cardID, questionField.value, answerField.value);
    } else {
        listElement.appendChild(new Option(questionField.value, (cardArray.length + 1).toString(), false, false));
        let newFlashCard = JSON.parse(await postData(questionField.value, answerField.value));
        //console.log(newFlashCard);
        cardArray.push({question: newFlashCard.question, answer: newFlashCard.value, cardID: newFlashCard.cardID})
    }
    cardQty = cardArray.length;
    newCard.disabled = false;
    listElement.disabled = false;
    button.disabled = true;
    changeToEditButton();
    cancelButton.disabled = false;
    swapToCardList();
    cardQtyText.innerText = `${cardQty} Cards`;
    //todo add toast


}

function addNewCard() {
    swapToTextAreas();
    newCardActive = true;
    newCard.disabled = true;
    changeTextAreaActive();
    enableSaveButton();
    button.disabled = true;
    button.innerText = "Add Card";
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
    swapToCardList();
}

function changeToEditButton(){
    let button = document.getElementById("saveButton");
    button.setAttribute("onclick", "editCard()");
    button.innerText = "Edit Card";
}

populateList()


