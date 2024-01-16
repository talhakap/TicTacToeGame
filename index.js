let currentPlayer = 'X';
let isGameOver = false;

function startGame(players) {
    const menu = document.getElementById('menu');
    const board = document.getElementById('board');
    const winnerMessage = document.getElementById('winner-message');

    // Reset the board and winner message
    board.innerHTML = '';
    winnerMessage.textContent = '';
    isGameOver = false;

    // Hide the menu
    menu.style.display = 'none';

    // Create cells for the Tic-Tac-Toe board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => makeMove(cell, players));
        board.appendChild(cell);
    }

    // Show the board
    board.style.display = 'grid';
}


function makeMove(cell, players) {
    if (!isGameOver && cell.textContent === '') {
        cell.textContent = currentPlayer;
        checkWinner(players);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (players === 1 && currentPlayer === 'O') {
            // If playing against the computer, let the computer make a move
            makeComputerMove();
        }
    }
}

function makeComputerMove() {
    const emptyCells = [...document.getElementsByClassName('cell')].filter(cell => cell.textContent === '');
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        makeMove(emptyCells[randomIndex], 1);
    }
}

function checkWinner(players) {
    const cells = [...document.getElementsByClassName('cell')];
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            displayWinner(cells[a].textContent, players);
            return;
        }
    }

    // Check for a tie
    if (![...cells].some(cell => cell.textContent === '')) {
        displayWinner('Tie', players);
    }
}

function displayWinner(winner, players) {
    const winnerMessage = document.getElementById('winner-message');
    if (winner === 'Tie') {
        winnerMessage.textContent = `It's a Tie!`;
    } else {
        winnerMessage.textContent = `Player ${winner} wins!`;
    }
    isGameOver = true;

    endGame(winner);
}
// Existing JavaScript code

function endGame(winner) {
    // Display the winner message
    const winnerMessage = document.getElementById('winner-message');
    winnerMessage.textContent = winner ? `Player ${winner} wins!` : "It's a draw!";
    
    // Display the game over modal
    const modal = document.getElementById('game-over-modal');
    modal.style.display = 'flex';
}

function goBackToMenu() {
    // Hide the board and winner message
    const board = document.getElementById('board');
    const winnerMessage = document.getElementById('winner-message');
    board.style.display = 'none';
    winnerMessage.textContent = '';

    // Display the menu
    const menu = document.getElementById('menu');
    menu.style.display = 'flex';

    // Hide the game over modal
    const modal = document.getElementById('game-over-modal');
    modal.style.display = 'none';
}

function replayGame() {
    // Restart the game
    const modal = document.getElementById('game-over-modal');
    modal.style.display = 'none';
    startGame(currentPlayer);
}
