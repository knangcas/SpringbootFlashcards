let cardArray = [];
let cards = "";
let cardQty = 0;
let newCardActive = true;
let editCardActive = false;

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

function editButtonChange() {
    let button = document.getElementById("saveButton");

    if (button.disabled) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
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
    let questionField = document.getElementById("questionTextArea");
    let answerField = document.getElementById("answerTextArea");
    let listElement = document.getElementById("cardList");

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
        //return JSON.stringify(json);
    } catch (error) {
        console.error(error.message);
    }
}

function changeTextAreaActive() {
    let questionArea = document.getElementById("questionTextArea");
    let answerArea = document.getElementById("answerTextArea");

    if (answerArea.disabled || questionArea.disabled) {
        answerArea.disabled = false;
        questionArea.disabled = false;
    }
}

function changeTextAreaInActive() {
    let questionArea = document.getElementById("questionTextArea");
    let answerArea = document.getElementById("answerTextArea");


    answerArea.disabled = true;
    questionArea.disabled = true;

}
function changedTextArea() {
    let cancelButton = document.getElementById("cancelButton");
    let saveButton = document.getElementById("saveButton");
    let questionArea = document.getElementById("questionTextArea");
    let answerArea = document.getElementById("answerTextArea");
    if (!newCardActive) {
        cancelButton.disabled = false;

    } else {
        saveButton.disabled = false;
        if (questionArea.value.length === 0 || answerArea.value.length === 0) {
            saveButton.disabled = true;
        }
    }




}

function editCard() {
    let button = document.getElementById("saveButton");
    changeTextAreaActive();
    button.disabled = true;
    button.innerText = "Save Card";
    button.setAttribute("onclick", "saveCard()");
    document.getElementById("cancelButton").disabled = false;


}

function enableSaveButton() {
    let button = document.getElementById("saveButton");
    button.disabled = false;
    button.innerText = "Save Card";
    button.setAttribute("onclick", "saveCard()");
}
function saveCard() {
    let button = document.getElementById("saveButton");
    let questionField = document.getElementById("questionTextArea");
    let answerField = document.getElementById("answerTextArea");
    let listElement = document.getElementById("cardList");

    let index = Number(listElement.value);
    if (!newCardActive) {
        listElement.options[listElement.selectedIndex].innerText = questionField.value;
        updateData(cardArray[index].cardID, questionField.value, answerField.value);
    } else {
        listElement.appendChild(new Option(questionField.value, (cardArray.length + 1).toString(), false, false));
        postData(questionField.value, answerField.value);
    }

}

function newCard() {
    newCardActive = true;

    changeTextAreaActive();
    enableSaveButton();
    document.getElementById("saveButton").disabled = true;
    //todo work on disabling buttons given a state
    let cancelButton = document.getElementById("cancelButton");
    cancelButton.disabled = false;
    let listElement = document.getElementById("cardList");
    listElement.selectedIndex = -1;
    listElement.disabled = true;
    let questionField = document.getElementById("questionTextArea");
    let answerField = document.getElementById("answerTextArea");
    questionField.value = "";
    answerField.value = "";
    questionField.placeholder = "Enter your question here...";
    answerField.placeholder = "Enter your answer here...";

}

function cancelCard() {
    let questionField = document.getElementById("questionTextArea");
    let answerField = document.getElementById("answerTextArea");
    let listElement = document.getElementById("cardList");
    listElement.disabled = false;
    if (newCardActive) {
        changeToEditButton();
        document.getElementById("cancelButton").disabled = true;
    }
    changeTextAreaInActive();
    listElement.selectedIndex = -1;
    questionField.value = "";
    answerField.value = "";
    document.getElementById("cancelButton").disabled = true;
}

function changeToEditButton(){
    let button = document.getElementById("saveButton");
    button.setAttribute("onclick", "editCard()");
    button.innerText = "Edit Card";
}

populateList()


