/*----- constants -----*/
/*----- app's state (variables) -----*/
let matchingPairsArr = [
    [0, 10],
    [1, 4],
    [2, 11],
    [3, 6],
    [5, 8],
    [7, 9]
];
let clickedEls = []; //temp array that will contain each of the clicked elements id (which is their index)
let winStatus, matchedPairsCount, turnsAllowed, turnsUsed, turnsLeft;
/*----- cached element references -----*/
const messageEl = document.querySelector('#message');
const boardEl = document.querySelector('.board');
const cardsNodeList = document.querySelectorAll('.card');
const resetBtn = document.querySelector('#reset-btn');

/*----- event listeners -----*/
cardsNodeList.forEach(function (card) {
    card.addEventListener('click', handleClick);
})
resetBtn.addEventListener('click', init)

/*----- init function -----*/
init()
function init() {
    clickedEls = [];
    winStatus = null;
    matchedPairsCount = 0;
    turnsAllowed = 12;
    turnsUsed = 0;
    turnsLeft = turnsAllowed;
    renderMessage();
    renderStartingCards(); // for when reset btn is clicked
    readdEventListeners(); // for when reset btn is clicked
}
/*----- on-click function -----*/
function handleClick(event) {
    // currentTarget is the element that the event listener is tied to (card El), not necessarily what you clicked on (the image itself)
    let clickedEl = event.currentTarget; 
    console.log(event.target);
    event.target.removeAttribute('hidden');
    clickedEl.classList.add('active');
    // if user clicks on the same element twice, it won't run the rest of the logic
    if (clickedEls.includes(clickedEl)) return;
    
    clickedEls.push(clickedEl);
    showFrontSides();
    if (clickedEls.length === 2) {
        if (checkForMatchingPair()) {
            setTimeout(function () {
                vanish();
                removeClickedElsEventListeners();
                clickedEls = [];
            }, 1500);
            matchedPairsCount++;
        } else {
            setTimeout(function () {
                showBackSides();
                clickedEls = [];
            }, 1500);
        }
        turnsUsed++;
        turnsLeft--;
    }
    setWinStatus();
    renderMessage();
    if (winStatus === 'L') {
        removeAllEventListeners();
    }
}
/*----- functions -----*/
function checkForMatchingPair() {
    const selectedIds = clickedEls.map(function (selectedEl) {
        return parseInt(selectedEl.id);
    })
    const isAMatchingPair = matchingPairsArr.some(function (matchingPair) {
        return matchingPair.toString() === selectedIds.toString() || matchingPair.reverse().toString() === selectedIds.toString();
    })
    return isAMatchingPair;
}
/*----- check winner function -----*/
function setWinStatus() {
    if (turnsUsed === turnsAllowed) {
        winStatus = 'L';
    } else if (matchedPairsCount === 6) {
        winStatus = 'W';
    }
}
/*----- render functions -----*/
function showFrontSides() {
    clickedEls.forEach(function (selectedEl) {
        selectedEl.querySelector('.back-side').setAttribute('hidden', true);
        selectedEl.querySelector('.front-side').removeAttribute('hidden');
    })
}
function vanish() {
    clickedEls.forEach(function (selectedEl) {
        selectedEl.querySelector('.back-side').setAttribute('hidden', true);
        selectedEl.querySelector('.front-side').setAttribute('hidden', true);
    })
}
function showBackSides() {
    clickedEls.forEach(function (selectedEl) {
        selectedEl.querySelector('.back-side').removeAttribute('hidden');
        selectedEl.querySelector('.front-side').setAttribute('hidden', true);
    })
}
function removeClickedElsEventListeners() {
    clickedEls.forEach(function (selectedEl) {
        selectedEl.removeEventListener('click', handleClick);
    })
}
function removeAllEventListeners() {
    cardsNodeList.forEach(function(cardNode) {
        cardNode.removeEventListener('click', handleClick);
    })
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
// for when reset btn is clicked
function renderStartingCards() {
    cardsNodeList.forEach(function(cardNode) {
        cardNode.querySelector('.back-side').removeAttribute('hidden');
        cardNode.querySelector('.front-side').setAttribute('hidden', true);
    })
}
// for when reset btn is clicked
function readdEventListeners() {
    cardsNodeList.forEach(function(cardNode) {
        cardNode.addEventListener('click', handleClick)
    })
}
