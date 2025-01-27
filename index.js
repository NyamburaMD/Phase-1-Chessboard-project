document.addEventListener("DOMContentLoaded", () => {
    const chessboard = document.querySelector('.chessboard');
let selectedPiece = null;
let selectedTile = null;

// Initialize chessboard grid
const createChessboard = () => {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.setAttribute('data-row', row % 2 === 0 ? 'even' : 'odd');
            tile.setAttribute('data-col', col % 2 === 0 ? 'even' : 'odd');
            tile.id = `tile-${row}-${col}`;
            chessboard.appendChild(tile);
        }
    }
};

// Define initial pieces positions
const initialPieces = {
    '0-0': '\u265C', '0-7': '\u265C', // Black rooks
    '0-1': '\u265E', '0-6': '\u265E', // Black knights
    '0-2': '\u265D', '0-5': '\u265D', // Black bishops
    '0-3': '\u265B', '0-4': '\u265A', // Black queen and king
    '7-0': '\u2656', '7-7': '\u2656', // White rooks
    '7-1': '\u2658', '7-6': '\u2658', // White knights
    '7-2': '\u2657', '7-5': '\u2657', // White bishops
    '7-3': '\u2655', '7-4': '\u2654', // White queen and king
};

// Add pawns
for (let col = 0; col < 8; col++) {
    initialPieces[`1-${col}`] = '\u265F'; // Black pawns
    initialPieces[`6-${col}`] = '\u2659'; // White pawns
}

// Place pieces on the chessboard
const placePieces = () => {
    Object.entries(initialPieces).forEach(([key, symbol]) => {
        const [row, col] = key.split('-').map(Number);
        const tile = document.getElementById(`tile-${row}-${col}`);
        tile.innerHTML = `<span class="chess-piece">${symbol}</span>`;
    });
};

// Highlight valid moves for a piece
const highlightMoves = (row, col, color) => {
    const piece = getPieceAt(row, col);
    if (!piece) return;

    const possibleMoves = pieceMovement.pawn(row, col, color); // Example: Only pawns handled here
    possibleMoves.forEach(([newRow, newCol]) => {
        const targetTile = document.getElementById(`tile-${newRow}-${newCol}`);
        targetTile.style.backgroundColor = '#f39c12';
        targetTile.addEventListener('click', () => movePiece(row, col, newRow, newCol));
    });
};

// Get the piece at a specific position
const getPieceAt = (row, col) => {
    const tile = document.getElementById(`tile-${row}-${col}`);
    return tile ? tile.querySelector('.chess-piece') : null;
};

// Move the piece to the target tile
const movePiece = (oldRow, oldCol, newRow, newCol) => {
    const oldTile = document.getElementById(`tile-${oldRow}-${oldCol}`);
    const newTile = document.getElementById(`tile-${newRow}-${newCol}`);
    newTile.innerHTML = oldTile.innerHTML;
    oldTile.innerHTML = '';
    resetHighlights();
};

// Reset highlights after move
const resetHighlights = () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.style.backgroundColor = '';
    });
};

// Piece movement logic
const pieceMovement = {
    pawn: (row, col, color) => {
        const direction = color === 'white' ? -1 : 1;
        const moves = [];
        if (row + direction >= 0 && row + direction < 8 && !getPieceAt(row + direction, col)) {
            moves.push([row + direction, col]);
        }
        return moves;
    },
};

// Event listener to select a piece
chessboard.addEventListener('click', (event) => {
    const target = event.target;
    const tileId = target.id;
    if (!tileId || !tileId.startsWith('tile-')) return;

    const [row, col] = tileId.split('-').slice(1).map(Number);
    const piece = getPieceAt(row, col);
    if (piece) {
        resetHighlights();
        highlightMoves(row, col, 'white');
    }
});

// Create and place pieces on the board
createChessboard();
placePieces();
