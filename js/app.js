/*----- constants -----*/

/*----- app's state (variables) -----*/

let winStatus;
let matchingPairsArr = [
    [0, 10],
    [1, 4],
    [2, 11],
    [3, 6],
    [5, 8],
    [7, 9]
];
let selectedEls = []; //will contain each of the clicked elements id (which is their index)
let matchedPairsCount, tunrsUsed, turnsAllowed, turnsLeft;

/*----- cached element references -----*/

const messageEl = document.querySelector('#message');
const boardEl = document.querySelector('.board');
const cardsNodeList = document.querySelectorAll('.card');


/*----- event listeners -----*/

cardsNodeList.forEach(function (card) {
    card.addEventListener('click', handleClick);
})

/*----- init function -----*/

init()

function init() {
    winStatus = null;
    matchedPairsCount = 0;
    tunrsUsed = 0;
    turnsAllowed = 12;
    turnsLeft = turnsAllowed;
    renderMessage();
}

/*----- on-click function -----*/

function handleClick(event) {
    // currentTarget is the element that the event listener is tied to (card El), not necessarily what you clicked on (the image itself)
    let clickedEl = event.currentTarget; 

    // if user clicks on the same element twice, it won't run the rest of the logic
    if (selectedEls.includes(clickedEl)) {
        return;
    } 
    
    selectedEls.push(clickedEl);

    console.log('selected Els', selectedEls);
    console.log('selected Els length', selectedEls.length);

    showClickedElsFrontSides();

    if (selectedEls.length === 2) {
        console.log(checkForMatchingPair());
        if (checkForMatchingPair()) {
            setTimeout(function () {
                vanish();
                removeEventListeners();
                selectedEls = [];
            }, 1500);
            matchedPairsCount++;
            console.log(matchedPairsCount);
        } else {
            setTimeout(function () {
                showClickedElsBackSides();
                selectedEls = [];
            }, 1500);
        }
        tunrsUsed++;
        turnsLeft--;
        console.log('turns count', tunrsUsed);
    }

    setWinStatus();
    renderMessage();

}

/*----- functions -----*/

function checkForMatchingPair() {
    const selectedIds = selectedEls.map(function (selectedEl) {
        return parseInt(selectedEl.id);
    })
    const isAMatchingPair = matchingPairsArr.some(function (matchingPair) {
        return matchingPair.toString() === selectedIds.toString() || matchingPair.reverse().toString() === selectedIds.toString();
    })

    return isAMatchingPair;
}

/*----- check winner function -----*/

function setWinStatus() {
    if (tunrsUsed === turnsAllowed) {
        winStatus = 'L';
    } else if (matchedPairsCount === 6) {
        winStatus = 'W';
    }
}

/*----- render function -----*/

function showClickedElsFrontSides() {
    selectedEls.forEach(function (selectedEl) {
        selectedEl.querySelector('.back-side').setAttribute('hidden', true);
        selectedEl.querySelector('.front-side').removeAttribute('hidden');
    })
}

function vanish() {
    console.log('vanish');
    selectedEls.forEach(function (selectedEl) {
        selectedEl.querySelector('.back-side').setAttribute('hidden', true);
        selectedEl.querySelector('.front-side').setAttribute('hidden', true);
    })
}

function showClickedElsBackSides() {
    selectedEls.forEach(function (selectedEl) {
        selectedEl.querySelector('.back-side').removeAttribute('hidden');
        selectedEl.querySelector('.front-side').setAttribute('hidden', true);
    })
}

function removeEventListeners() {
    selectedEls.forEach(function (selectedEl) {
        selectedEl.removeEventListener('click', handleClick);
    })
}

function renderMessage() {
    if (turnsLeft > 1) {
        messageEl.innerText = `You have ${turnsLeft} turns left. Make a move!`;
    } else if (turnsLeft === 1) {
        messageEl.innerText = `You have ${turnsLeft} turn left. Make a move!`
    }
    if (winStatus === 'L') {
        messageEl.innerText = `You lose`
    } else if (winStatus === 'W') {
        messageEl.innerText = "You win!";
    }
}