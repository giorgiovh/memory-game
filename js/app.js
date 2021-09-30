// Cached Elements

const cardEls = document.querySelectorAll('.card');

// Event Listeners

cardEls.forEach(function(cardEl) {
    cardEl.addEventListener('click', handleClick);
})

// Functions

function handleClick(event) {
    let clickedEl = event.currentTarget;
    clickedEl.classList.add('flipped');
    console.log(clickedEl.classList);
}