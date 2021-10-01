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
const resetBtn = document.querySelector('#reset-btn');

/*----- event listeners -----*/

cardEls.forEach(function(cardEl) {
    cardEl.addEventListener('click', handleClick);
})

resetBtn.addEventListener('click', init);

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
    renderStartingCards();
    removesFlippedDisabledClasses();
    removesBackfaceVisibilityStyle();
}

/*----- functions -----*/

function handleClick(event) {
    
    let clickedEl = event.currentTarget; // currentTarget is the element that the event listener is tied to (card El), not necessarily what you clicked on (the image itself)

    if (clickedEls.includes(clickedEl)) return;

    clickedEls.push(clickedEl);

    renderCardFlip(event);

    if (clickedEls.length === 2) {
        removeAllCardsPointerEvents(); // prevents user from flipping a 3rd card
        if (checkForMatchingPair()) {
            setTimeout(function () {
                vanish();
                enableAllCardsPointerEvents(); // adds back all pointer events
                removeClickedElsPointerEvents(); // removed matched cards' pointer events
                clickedEls = [];
            }, 1500);
            matchedPairsCount++;
        } else {
            setTimeout(function () {
                clickedEls.forEach(function(clickedEl) {
                    clickedEl.querySelector('.front').style.backfaceVisibility = 'visible';

                    addsShakeClasses(clickedEl);
                })
            }, 1300);
            setTimeout(function () {
                clickedEls.forEach(function(clickedEl) {
                    clickedEl.querySelector('.front').style.backfaceVisibility = 'hidden';
                    
                    clickedEl.classList.remove('flipped');
                    
                    removesShakeClasses(clickedEl);
                    enablesPointEvtsForNonMatchedCards();
                })
                clickedEls = [];
            }, 2000);
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



function enablesPointEvtsForNonMatchedCards() {
    cardEls.forEach(function (cardEl) {
        if (cardEl.querySelector('.back').hidden === false) {
            cardEl.classList.remove('disabled');
        }
    });
}

function removeAllCardsPointerEvents() {
    cardEls.forEach(function (cardEl) {
        cardEl.classList.add('disabled');
    });
}

function removeClickedElsPointerEvents() {
    clickedEls.forEach(function (clickedEl) {
        clickedEl.classList.add('disabled');
    });
}

function enableAllCardsPointerEvents() {
    cardEls.forEach(function (cardEl) {
        cardEl.classList.remove('disabled');
    });
}

function checkForMatchingPair() {
    const selectedIds = clickedEls.map(function (selectedEl) {
        return parseInt(selectedEl.id);
    })
    const isMatchingPair = matchingPairsArr.some(function (matchingPair) {
        return matchingPair.toString() === selectedIds.toString() || matchingPair.reverse().toString() === selectedIds.toString();
    })
    
    return isMatchingPair;
}

function removeAllEventListeners() {
    cardEls.forEach(function(cardEl) {
        cardEl.removeEventListener('click', handleClick);
    })
}


/*----- check winner function -----*/

function setWinStatus() {
    if (matchedPairsCount === 6) {
        winStatus = 'W';
    } else if (turnsUsed === turnsAllowed) {
        winStatus = 'L';
    } 
}

/*----- render functions -----*/

function renderCardFlip(event) {
    let clickedEl = event.currentTarget;
    clickedEl.classList.add('flipped');
}

function renderMessage() {
    if (turnsLeft > 1) {
        messageEl.innerText = `You have ${turnsLeft} turns left. Make a move!`;
    } else if (turnsLeft === 1) {
        messageEl.innerText = `You have ${turnsLeft} turn left. Make a move!`
    }
    
    if (winStatus === 'W') {
        messageEl.innerText = `Congrats! You've won in ${turnsUsed} turns`;
    }

    if (winStatus === 'L') {
        messageEl.innerText = `You lose`;
    } 
}

function vanish() {
    clickedEls.forEach(function(clickedEl) {
        clickedEl.querySelector('.back').setAttribute('hidden', true);
        clickedEl.querySelector('.front').setAttribute('hidden', true);
    })
}

function removesShakeClasses(clickedEl) {
    clickedEl.querySelector('.front').classList.remove('animate__animated');

    clickedEl.querySelector('.front').classList.remove('animate__shakeX');
}

function addsShakeClasses(clickedEl) {
    clickedEl.querySelector('.front').classList.add('animate__animated');

    clickedEl.querySelector('.front').classList.add('animate__shakeX');
}

// for when reset btn is clicked
function renderStartingCards() {
    cardEls.forEach(function(cardEl) {
        cardEl.querySelector('.back').removeAttribute('hidden');
        cardEl.querySelector('.front').removeAttribute('hidden');
    }) 
}

function removesFlippedDisabledClasses() {
    cardEls.forEach(function(cardEl) {
        cardEl.classList.remove('flipped');
        cardEl.classList.remove('disabled');
    }) 
}

function removesBackfaceVisibilityStyle() {
    cardEls.forEach(function(cardEl) {
        cardEl.querySelector('.front').style.backfaceVisibility=null;
    }) 
}
