/*----- constants -----*/ 

/*----- app's state (variables) -----*/ 

let winStatus;
let matchingPairsArr = [[0, 10], [10, 0], [1, 4], [4, 1], [2, 11], [11, 2], [3, 6], [6, 3], [5, 8], [8, 5], [7, 9], [9, 7]];
let tempArr = []; //will contain each of the clicked elements id (which is their index)

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
    winStatus = null;
    render();
}

/*----- on-click function -----*/

function handleClick(event) {
    let clickedEl = event.target;
    let clickedElId = parseInt(clickedEl.id);
    tempArr.push(clickedElId);
    console.log(tempArr);
    console.log('temp array length', tempArr.length);
    if (tempArr.length === 2) {
       console.log(checkForMatchingPair());
    }
    setWinStatus();
    render();
}

/*----- functions -----*/

function checkForMatchingPair() {
    isAMatchingPair = matchingPairsArr.some(function(matchingPair) {
        return matchingPair.toString() === tempArr.toString();
    })
    return isAMatchingPair;
}

/*----- check winner function -----*/

function setWinStatus() {
    
}
/*----- render function -----*/

// ****CONTINUE HERE****
function render() {
    tempArr.forEach(function(clickedElId) {
        backSidesNodeList[clickedElId].setAttribute('hidden', true);
        frontSidesNodeList[clickedElId].removeAttribute('hidden');
    })
}

