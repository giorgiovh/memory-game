/*----- constants -----*/ 

/*----- app's state (variables) -----*/ 

let board = [], winner;

/*----- cached element references -----*/ 

const messageEl = document.querySelector('#message');
const boardEl = document.querySelector('.board');
const cardsNodeList = document.querySelectorAll('.card');

/*----- event listeners -----*/ 

boardEl.addEventListener('click', handleClick)

/*----- functions -----*/

function handleClick(event) {
    console.log(event.target);
}