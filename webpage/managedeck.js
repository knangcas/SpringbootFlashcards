let cardArray = [];
let cards = "";

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
        return JSON.stringify(json);

    } catch (error) {
        console.error(error.message);
    }
}

async function populateList() {
    listElement = document.getElementById("cardList");
    cards = JSON.parse(await getData());

    for(let i = 0; i < cards.cards.length; i++) {
        cardArray[i] = {question: cards.cards[i].question, answer: cards.cards[i].answer}
    }

    listElement.appendChild(new Option(cardArray[0].question, "0", true, true));
    if (cardArray.length > 1) {
        for (let i = 1; i < cardArray.length; i++) {
            listElement.appendChild(new Option(cardArray[i].question, i.toString(), false, false));
        }
    }

    console.log(listElement.selectedIndex);


}

function populateFields() {
    console.log("populateFields called");
    questionField = document.getElementById("questionTextArea");
    answerField = document.getElementById("answerTextArea");
    listElement = document.getElementById("cardList");

    let index = Number(listElement.value)
    console.log(cardArray[index].question)
    questionField.value = cardArray[index].question;
    answerField.value= cardArray[index].answer;
}


populateList()


