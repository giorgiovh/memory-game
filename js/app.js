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

cardsNodeList.forEach(function(card) {
    card.addEventListener('click', handleClick);
})

/*----- init function -----*/

init()

function init() {
    messageEl.innerText = 'Make a move!'
    winStatus = null;
}

/*----- on-click function -----*/

function handleClick(event) {
    let clickedEl = event.target;
    selectedEls.push(clickedEl);

    console.log('selected Els', selectedEls);
    console.log('selected Els length', selectedEls.length);

    showClickedElsFrontSides();
    
   
    if (selectedEls.length === 2) {
        console.log(checkForMatchingPair());
        if (checkForMatchingPair()) {
            setTimeout(function() {
                vanish();
                removeEventListeners();
                selectedEls = [];
            }, 1500);
        } else {
            setTimeout(function() {
                showClickedElsBackSides();
                selectedEls = [];
            }, 1500);
        }
    }

    setWinStatus();

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

function showClickedElsFrontSides() {
    selectedEls.forEach(function(selectedEl) {
        selectedEl.querySelector('.back-side').setAttribute('hidden', true);
        selectedEl.querySelector('.front-side').removeAttribute('hidden');
    })
}

function vanish() {
    console.log('vanish');
    selectedEls.forEach(function(selectedEl) {
        selectedEl.querySelector('.back-side').setAttribute('hidden', true);
        selectedEl.querySelector('.front-side').setAttribute('hidden', true);
    })
}

function showClickedElsBackSides() {
    console.log('show back side');
    selectedEls.forEach(function(selectedEl) {
        selectedEl.querySelector('.back-side').removeAttribute('hidden');
        selectedEl.querySelector('.front-side').setAttribute('hidden', true);
    })
}

function removeEventListeners() {
    selectedEls.forEach(function(selectedEl) {
        selectedEl.removeEventListener('click', handleClick);
    })
}
