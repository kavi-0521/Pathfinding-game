const correctPath = [0, 6, 7, 8, 14];  
let startTime, timerInterval;

const board = document.getElementById('game-board');
const startBtn = document.getElementById('start-btn');
const timerDisplay = document.getElementById('timer');

function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (correctPath.includes(index)) {
        cell.classList.add('correct');

        if (correctPath.every(idx =>
            document.querySelector(`.cell[data-index='${idx}']`).classList.contains('correct'))) {
            clearInterval(timerInterval);
            alert(`You win! Time: ${(Date.now() - startTime) / 1000}s`);
            resetGame();
        }
    } else {
        cell.classList.add('wrong');
        clearInterval(timerInterval);
        alert('Wrong Path! Game Over!');
        resetGame();
    }
}

function startGame() {
    createBoard();
    startTime = Date.now();
    timerDisplay.textContent = 'Time: 0s';

    timerInterval = setInterval(() => {
        timerDisplay.textContent = `Time: ${Math.floor((Date.now() - startTime) / 1000)}s`;
    }, 1000);
}

function resetGame() {
    clearInterval(timerInterval);
    timerDisplay.textContent = 'Time: 0s';
    createBoard();
}

startBtn.addEventListener('click', startGame);
 
createBoard();
