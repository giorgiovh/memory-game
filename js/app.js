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

    if (clickedEls.includes(clickedEl)) return; // if user clicks on the same element twice, it won't run the rest of the logic

    clickedEls.push(clickedEl);

    renderCardFlip(event);

    if (clickedEls.length === 2) {
        if (checkForMatchingPair()) {
            setTimeout(function () {
                vanish();
                removePointerEvents();
                clickedEls = [];
            }, 1500);
            matchedPairsCount++;
        } else {
            setTimeout(function () {
                clickedEls.forEach(function(clickedEl) {
                    clickedEl.querySelector('.front').style.backfaceVisibility = 'visible';

                    addsShakeClasses(clickedEl);
                })
            }, 1500);
            setTimeout(function () {
                clickedEls.forEach(function(clickedEl) {
                    clickedEl.querySelector('.front').style.backfaceVisibility = 'hidden';
                    
                    clickedEl.classList.remove('flipped');
                    
                    removesShakeClasses(clickedEl);
                })
                clickedEls = [];
            }, 2500);
        }
        turnsUsed++;
        turnsLeft--;
    }

    setWinStatus();
    renderMessage();

    if (winStatus === 'L') {
        cardEls.forEach(function(card) {
            card.classList.add('disabled')
        })
    }
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

function removePointerEvents() {
    clickedEls.forEach(function (clickedEl) {
        clickedEl.classList.add('disabled');
    });
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
    
    if (winStatus === 'L') {
        messageEl.innerText = `You lose`;
    } else if (winStatus === 'W') {
        messageEl.innerText = "You win!";
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
