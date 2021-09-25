/*----- constants -----*/ 

/*----- app's state (variables) -----*/ 

let board = [], winner;

/*----- cached element references -----*/ 

const messageEl = document.querySelector('#message');
const boardEl = document.querySelector('.board');
const cardsNodeList = document.querySelectorAll('.card');
const frontSideEls = document.querySelectorAll('.front-side');
const backSideEls = document.querySelectorAll('.back-side');

console.log(backSideEls);
/*----- event listeners -----*/ 

boardEl.addEventListener('click', handleClick)

/*----- functions -----*/

init()

function init() {
    board = [null, null, null, null, null, null, null, null, null, null, null, null];
    winner = null;
    messageEl.innerText = 'Make a move!'
    render();
}

function render() {
    board.forEach(function(card, i) {
        if (card === null) {
            // show back of the card
        }
    })
}

function handleClick(event) {
    let clickedEl = event.target;
    let clickedElId = clickedEl.id
    backSideEls[clickedElId].setAttribute('hidden', true);
    frontSideEls[clickedElId].removeAttribute('hidden');
}