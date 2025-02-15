console.log('Thank you for using WebStorm 💙')
let qArray = [];
let aArray = [];
let x = 0;
let b = "";
let qIndex = 0;
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

async function lma() {
    const element = document.getElementById('flashCardContent');

    const question1 = getData();

    const q = JSON.parse(await question1);
    console.log(q.cards[0].question);
    for (let i = 0; i < q.cards.length; i++) {
        qArray[i] = q.cards[i].question;
        aArray[i] = q.cards[i].answer;
    }

    console.log(aArray);


    element.innerHTML = q.cards[0].question;

}

function nextCard() {
    const element = document.getElementById('flashCardContent');
    element.innerHTML = qArray[++qIndex]
}

