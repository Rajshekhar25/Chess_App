//basic socket.io setup

const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add("square", (rowindex + squareindex) % 2 === 0 ? "light" : "dark");

            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;   //should be .square I suppose

            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add("piece", square.color === 'w' ? "white" : "black");

                pieceElement.innerText =getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {

                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowindex, col: squareindex };

                        e.dataTransfer.setData("text/plain", "");

                    }

                });

                pieceElement.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);



            }
            squareElement.addEventListener("dragover", e => {
                e.preventDefault();
            });
            squareElement.addEventListener("drop", function (e) {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSource = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col)
                    };

                    handleMove(sourceSquare, targetSource);
                }

            });
            boardElement.appendChild(squareElement);


        });

    });



};


const handleMove = () => { };

const getPieceUnicode = (piece) => { 
    const unicodePieces={
        p: "\u265F", // White Pawn ♟
        r: "\u265C", // White Rook ♜
        n: "\u265E", // White Knight ♞
        b: "\u265D", // White Bishop ♝
        q: "\u265B", // White Queen ♛
        k: "\u265A", // White King ♚
    
        P: "\u265F", // Black Pawn ♟
        R: "\u265C", // Black Rook ♜
        N: "\u265E", // Black Knight ♞
        B: "\u265D", // Black Bishop ♝
        Q: "\u265B", // Black Queen ♛
        K: "\u265A"  // Black King ♚

    };

    return unicodePieces[piece.type] || "";
};

renderBoard();




