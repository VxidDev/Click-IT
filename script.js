const counter = document.querySelector(".counter");
const button = document.querySelector(".mainbtn");
const morePerClick = document.querySelector(".morePerClick");
const morePerSecond = document.querySelector(".morePerSecond");

let money = 0;
let amountPerClick = 10;

let amountPerClickLevels = {
    1: { cost: 25, amount: 2 },
    2: { cost: 75, amount: 5 }
};

let amountPerSecondLevels = {
    1: { cost: 50 , amount: 1},
    2: { cost: 175 , amount: 4}
};

let currentAmountPerClickLevel = 0;
const maxAmountPerClickLevel = 2;

let moneyPerSecond = 0;
let currentAmountPerSecondLevel = 0;
const maxAmountPerSecondLevel = 2;

function buttonClicked() {
    money += amountPerClick;
    counter.textContent = `money: ${money}`;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve , ms));
}

button.addEventListener("click", buttonClicked);

morePerClick.addEventListener("click", () => {
    const nextLevel = currentAmountPerClickLevel + 1;

    if (nextLevel <= maxAmountPerClickLevel && money >= amountPerClickLevels[nextLevel].cost) {
        money -= amountPerClickLevels[nextLevel].cost;

        amountPerClick += amountPerClickLevels[nextLevel].amount;

        currentAmountPerClickLevel++;

        const upcoming = amountPerClickLevels[currentAmountPerClickLevel + 1];
        morePerClick.textContent = upcoming ? `more per click - ${upcoming.cost}$` : "MAX";
        
        if (morePerClick.textContent == "MAX") {
            morePerClick.classList.add("max");
        }

        counter.textContent = `money: ${money}`;
    }
});

morePerSecond.addEventListener("click", () => {
    const nextLevel = currentAmountPerSecondLevel + 1;

    if (nextLevel <= maxAmountPerSecondLevel && money >= amountPerSecondLevels[nextLevel].cost) {
        money -= amountPerSecondLevels[nextLevel].cost;

        moneyPerSecond += amountPerSecondLevels[nextLevel].amount;

        currentAmountPerSecondLevel++;

        const upcoming = amountPerSecondLevels[currentAmountPerSecondLevel + 1];
        morePerSecond.textContent = upcoming ? `more per second - ${upcoming.cost}$` : "MAX";

        if (morePerSecond.textContent == "MAX") {
            morePerSecond.classList.add("max");
        }

        counter.textContent = `money: ${money}`;
    }
});

async function afkLoop() {
    money += moneyPerSecond;
    counter.textContent = `money: ${money}`;
    await wait(1000);
    afkLoop();
}

afkLoop();

buttonClicked();
