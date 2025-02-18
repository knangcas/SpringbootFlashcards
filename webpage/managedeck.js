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
postData("What does the * character symbolize in C?", "A nightmare.")