/*----- constants -----*/ 

/*----- app's state (variables) -----*/ 

let board = [], winStatus;
let matchingPairsArr = [[0, 10], [10, 0], [1, 4], [4, 1], [2, 11], [11, 2], [3, 6], [6, 3], [5, 8], [8, 5], [7, 9], [9, 7]];
let tempArr = [];

/*----- cached element references -----*/ 

const messageEl = document.querySelector('#message');
const boardEl = document.querySelector('.board');
const cardsNodeList = document.querySelectorAll('.card');
const frontSidesNodeList = document.querySelectorAll('.front-side');
const backSidesNodeList = document.querySelectorAll('.back-side');

/*----- event listeners -----*/ 

boardEl.addEventListener('click', handleClick)

/*----- init function -----*/

init()

function init() {
    messageEl.innerText = 'Make a move!'
    board = [null, null, null, null, null, null, null, null, null, null, null, null];
    winStatus = null;
    render();
}

/*----- on-click function -----*/

function handleClick(event) {
    let clickedEl = event.target;
    let clickedElId = clickedEl.id;
    board[clickedElId] = 1;
    setWinStatus();
    console.log(board);
    render();
}

/*----- check winner function -----*/

function setWinStatus() {
    
}
/*----- render function -----*/

function render() {
    board.forEach(function(card, i) {
        if (card === null) {
            frontSidesNodeList[i].setAttribute('hidden', true);
        } else if (card === 1) {
            backSidesNodeList[i].setAttribute('hidden', true);
            frontSidesNodeList[i].removeAttribute('hidden')
        }
    })
}

