const counter = document.querySelector(".counter");
const button = document.querySelector(".mainbtn");
const morePerClick = document.querySelector(".morePerClick");

let money = 0;
let amountPerClick = 10;

let amountPerClickLevels = {
    1: { cost: 25, amount: 2 },
    2: { cost: 75, amount: 5 }
};

let currentAmountPerClickLevel = 0;
const maxAmountPerClickLevel = 2;

function buttonClicked() {
    money += amountPerClick;
    counter.textContent = `money: ${money}`;
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

        counter.textContent = `money: ${money}`;
    }
});

buttonClicked();
