//basic socket.io setup

 const socket= io();
 const chess = new Chess();
 const boardElement = document.querySelector(".chessboard");

 let draggedPiece=null;
 let sourceSquare=null;
 let playerRole=null;

 const renderBoard=()=>{
    const board =chess.board();
    boardElement.innerHTML="";
    board.forEach((row,rowindex)=>{
        row.forEach((square,squareindex)=>{
            const squareElement=document.createElement("div");
            squareElement.classsList.add("square", (rowindex + squareindex)%2 ===0? "light" : "dark");

            squareElement.dataset.row=rowindex;
            squareElement.dataset.col=squareindex;   //should be .square I suppose

            if(square){
                const pieceElement = document.createElement("div");
                pieceElement.classList.add("piece", square.color === 'w'? "white" : "black");

                pieceElement.innerText="";
                pieceElement.draggable=playerRole===square.color;

                pieceElement.addEventListener("dragstart", ()=>{

                    if(pieceElememt.draggable){
                        draggedPiece=pieceElement;
                        sourceSquare={row:rowindex, col:squareindex};

                    }


                });
            }

      
        
      
        });
        });
 
    };


 const handleMove=()=>{};

 const getPieceUnicode=()=>{};

 renderBoard();




