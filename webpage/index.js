console.log('Thank you for using WebStorm 💙')

let x = 0;
let b = "";
async function getData() {
    const url = "https://uselessfacts.jsph.pl/api/v2/facts/today";

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

    element.innerHTML = q.text;

}

