const gameBoard = (() => {
    let board = [" "," "," ",
                 " ", " "," ",
                " ", " "," "];

    const displayBoard = () => {
    const div = document.getElementById("gameBoard")
    for(spot in board){
        let spotNode = document.createElement('div');
        spotNode.dataset.index = spot;
        spotNode.textContent = `[${board[spot]}]`;
        spotNode.addEventListener('click', (e) => _addMarkToSpot(e, currentMarker));
        div.appendChild(spotNode);
    }
    };

    const _addMarkToSpot = (e, marker) => {
        if(board[e.target.dataset.index] === " "){
            e.target.textContent = `[${marker}]`;
            board[e.target.dataset.index] = marker;
            currentMarker = currentMarker === "X" ? "O" : "X";    
            _checkBoard(board);
            console.log(`Player ${currentMarker}'s turn`)
        } else {
            console.log("invalid placement, try again");
        }
    }

    const _checkBoard = (board) => {
        if(!board.includes(" ")){
            console.log("It's a tie!")
        }
        let i = 0;
        while(i<9){
            if(board[i] !== " "){
                if(i % 3 === 0){
                    if(board[i] === board[i+1] && board[i] === board[i+2]){
                        console.log(`${board[i]} is the winner!`);
                    }
                }
                if(i < 3){
                    if(board[i] === board[i+3] && board[i] === board[i+6]){
                        console.log(`${board[i]} is the winner!`);
                    }
                }
                if(i === 0){
                    if(board[i] === board[i+4] && board[i] === board[i+8] ){
                        console.log(`${board[i]} is the winner!`);    
                    }
                }
                if(i === 2){
                    if(board[i] === board[i+2] && board[i] === board[i+4]){
                        console.log(`${board[i]} is the winner!`);
                    }
                }
        }
            i++;
        }
    }

    return {
        displayBoard,
    }
})();

let currentMarker = "X";

gameBoard.displayBoard();
const player = (name, marker) => {

    return {name, marker};
}


