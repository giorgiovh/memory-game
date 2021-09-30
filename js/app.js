/*----- constants -----*/

const matchingPairsArr = [
    [0, 10],
    [1, 4],
    [2, 11],
    [3, 6],
    [5, 8],
    [7, 9]
];

/*----- app's state (variables) -----*/

let clickedEls = []; //temp array that will contain each of the clicked elements id (which is their index)
let winStatus, matchedPairsCount, turnsAllowed, turnsUsed, turnsLeft;
/*----- cached element references -----*/

const messageEl = document.querySelector('#message');
const containerEl = document.querySelector('.container');
const cardEls = document.querySelectorAll('.card');

console.log(messageEl);


/*----- event listeners -----*/

cardEls.forEach(function(cardEl) {
    cardEl.addEventListener('click', handleClick);
})

/*----- init function -----*/

init();

function init() {
    clickedEls = [];
    winStatus = null;
    matchedPairsCount = 0;
    turnsAllowed = 12;
    turnsUsed = 0;
    turnsLeft = turnsAllowed;
    renderMessage();
}

/*----- functions -----*/

function handleClick(event) {
    flipCard(event)
}


/*----- render functions -----*/

function flipCard(event) {
    let clickedEl = event.currentTarget;
    clickedEl.classList.add('flipped');
}

function renderMessage() {
    if (turnsLeft > 1) {
        messageEl.innerText = `You have ${turnsLeft} turns left. Make a move!`;
    } else if (turnsLeft === 1) {
        messageEl.innerText = `You have ${turnsLeft} turn left. Make a move!`
    }

    if (winStatus === 'L') {
        messageEl.innerText = `You lose`;
    } else if (winStatus === 'W') {
        messageEl.innerText = "You win!";
    }
}

