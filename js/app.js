/*----- constants -----*/ 

/*----- app's state (variables) -----*/ 

let winStatus;
let matchingPairsArr = [[0, 10], [1, 4], [2, 11], [3, 6], [5, 8], [7, 9]];
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
    console.log('temp array', tempArr);
    console.log('temp array length', tempArr.length);
    if (tempArr.length === 2) {
       console.log(checkForMatchingPair());
    }
    setWinStatus();
    render();
    //***CONTINUE HERE***/
    if (tempArr.length === 2) {
        tempArr = []
    }
}

/*----- functions -----*/

function checkForMatchingPair() {
    const isAMatchingPair = matchingPairsArr.some(function(matchingPair) {
        return matchingPair.toString() === tempArr.toString() || matchingPair.reverse().toString() === tempArr.toString();
    })
    return isAMatchingPair;
}

/*----- check winner function -----*/

function setWinStatus() {
    
}
/*----- render function -----*/

function render() {
    showClickedElsFrontSides();
}

function showClickedElsFrontSides() {
    tempArr.forEach(function(clickedElId) {
        backSidesNodeList[clickedElId].setAttribute('hidden', true);
        frontSidesNodeList[clickedElId].removeAttribute('hidden');
    })
}


