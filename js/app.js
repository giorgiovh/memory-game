/*----- constants -----*/ 

/*----- app's state (variables) -----*/ 

let winStatus;
let matchingPairsArr = [[0, 10], [1, 4], [2, 11], [3, 6], [5, 8], [7, 9]];
let selectedEls = []; //will contain each of the clicked elements id (which is their index)

/*----- cached element references -----*/ 

const messageEl = document.querySelector('#message');
const boardEl = document.querySelector('.board');
const cardsNodeList = document.querySelectorAll('.card');

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
    // let clickedElId = parseInt(clickedEl.id);
    selectedEls.push(clickedEl);
    console.log('temp array', selectedEls);
    console.log('temp array length', selectedEls.length);
    if (selectedEls.length === 2) {
       console.log(checkForMatchingPair());
    }
    setWinStatus();
    render();
    //***CONTINUE HERE***/
    if (selectedEls.length === 2) {
        selectedEls = []
    }
}

/*----- functions -----*/

function checkForMatchingPair() {
    const selectedIds = selectedEls.map(function(selectedEl) {
        return parseInt(selectedEl.id);
    })
    const isAMatchingPair = matchingPairsArr.some(function(matchingPair) {
        return matchingPair.toString() === selectedIds.toString() || matchingPair.reverse().toString() === selectedIds.toString();
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
    selectedEls.forEach(function(clickedEl) {
        clickedEl.querySelector('.back-side').setAttribute('hidden', true);
        clickedEl.querySelector('.front-side').removeAttribute('hidden');
    })
}


