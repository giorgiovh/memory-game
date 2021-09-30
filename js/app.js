const cardEl = document.querySelector('.card');

cardEl.addEventListener('click', handleClick);

function handleClick(event) {
    let clickedEl = event.currentTarget;
    clickedEl.classList.add('flipped');
    console.log(clickedEl.classList);
}