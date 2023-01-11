const gameBoard = (() => {
    let board = [" "," "," ",
                 " ", " "," ",
                " ", " "," "];

    const displayBoard = () => {
    const div = document.getElementById("gameBoard");
    for(spot in board){
        let spotNode = document.createElement('div');
        spotNode.dataset.index = spot;
        spotNode.textContent = `[${board[spot]}]`;
        spotNode.addEventListener('click', (e) => _addMarkToSpot(e, currentMarker));
        div.appendChild(spotNode);
    }
    };

    const reset = () => {
        board = [" "," "," ",
        " ", " "," ",
       " ", " "," "];
       document.getElementById('gameMessage').textContent = "";
       for(spot in board){
        const div = document.getElementById('gameBoard');
        div.children[spot].textContent = `[${board[spot]}]`;
       }
    }

    const message = document.getElementById("gameMessage")

    const _addMarkToSpot = (e, marker) => {
        if(board[e.target.dataset.index] === " "){
            e.target.textContent = `[${marker}]`;
            board[e.target.dataset.index] = marker;
            currentMarker = currentMarker === "X" ? "O" : "X";    
            let gameOver = _checkBoard(board);
            if(gameOver){
                console.log("Game over");
            } else {
                console.log(`Player ${currentMarker === "X" ? "X" : "O" }'s turn`);
            }
        } else {
            console.log("invalid placement, try again");
        }
    }

    const _checkBoard = (board) => {
        const message = document.getElementById('gameMessage');
        
        if(!board.includes(" ")){
            message.textContent = "It's a tie!" ;
            return true;
        }
        let i = 0;
        while(i<9){
            if(board[i] !== " "){
                if(i % 3 === 0){
                    if(board[i] === board[i+1] && board[i] === board[i+2]){
                        message.textContent = `${board[i]} is the winner!`;
                        return true;
                    }
                }
                if(i < 3){
                    if(board[i] === board[i+3] && board[i] === board[i+6]){
                        message.textContent = `${board[i]} is the winner!`;
                        return true;
                    }
                }
                if(i === 0){
                    if(board[i] === board[i+4] && board[i] === board[i+8] ){
                        message.textContent = `${board[i]} is the winner!`;    
                        return true;
                    }
                }
                if(i === 2){
                    if(board[i] === board[i+2] && board[i] === board[i+4]){
                        message.textContent = `${board[i]} is the winner!`;
                        return true;
                    }
                }
            }
            i++;
        }
        return false;
    }

    return {
        displayBoard,
        reset
    }
})();

let currentMarker = "X";

gameBoard.displayBoard();

const createPlayers = () => {
    const playerName1 = document.getElementById('player1').value;
    const player1 = player(playerName1, "X");
    const playerName2 = document.getElementById('player2').value;
    const player2 = player(playerName2, "O");
    gameBoard.reset();
    return {
        player1,
        player2
    }
}

const player = (name, marker) => {

    return {name, marker};
}


