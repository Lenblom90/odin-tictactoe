const gameBoard = (() => {
    let board = [[" "," "," "],
                 [" ", " "," "],
                [" ", " "," "]];

    const displayBoard = () => {
        const div = document.getElementById("gameBoard");
        for(col in board){
            const colNode = document.createElement('div');
            colNode.classList.add("col")
            for(row in board[col]){
                let rowNode = document.createElement('div');
                rowNode.classList.add('row')
                rowNode.dataset.row = row;
                rowNode.dataset.col = col;
                rowNode.textContent = `[${board[row][col]}]`;
                rowNode.addEventListener('click', (e) => _addMarkToSpot(e, currentMarker));
                colNode.appendChild(rowNode);    
            }
            div.appendChild(colNode);
        }
    };

    const resetBoard = () => {
        board = [[" "," "," "],
                 [" ", " "," "],
                 [" ", " "," "]];
       document.getElementById('gameMessage').textContent = "";
       const div = document.getElementById('gameBoard');       
       for(col in board){
          for(row in board[col]){
            div.children[col].children[row].textContent = `[${board[col][row]}]`;
          }
        }
    }

    const _addMarkToSpot = (e, marker) => {
        if(board[e.target.dataset.col][e.target.dataset.row] === " "){
            e.target.textContent = `[${marker}]`;
            board[e.target.dataset.col][e.target.dataset.row] = marker;
            let gameOver = _checkBoard(board);
            if(gameOver){
                currentMarker === player1.marker;
                console.log("Game over");
            } else {
                currentMarker = currentMarker === player1.marker ? player2.marker : player1.marker;    
                if(currentMarker === player2.marker){
                    console.log(`Player ${player2.marker}'s turn`)
                    let computerMove = _findBestMove(board, player2.marker);
                    board[computerMove.col][computerMove.row] = player2.marker;
                    document.getElementById('gameBoard').children[computerMove.col].children[computerMove.row].textContent = `[${player2.marker}]`;
                    currentMarker = player1.marker;    
                }
                console.log(`Player ${player1.marker}'s turn`);
            }
        } else {
            console.log("invalid placement, try again");
        }
    }

    const _findBestMove = (board, player) => {
        let opponent = player === player1.marker ? player2.marker : player2.marker;
        let bestVal = -1000;
        let bestMove = {
            row: -1,
            col: -1
        };
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){

                if(board[i][j] === " "){
                    board[i][j] = player;

                    let moveVal = _minimax(board, 0, false);

                    board[i][j] = " ";
                    console.log(moveVal);
                    if (moveVal > bestVal){
                        bestMove.row = j;
                        bestMove.col = i;
                        bestVal = moveVal;
                    }
                }    
            }
        }
        return bestMove;
    }

    const _minimax = (board, depth, isMaximizingPlayer) => {
        let score = _evaluate(board);
        if (score === 10){
            return score;
        } else if (score === -10){
            return score;
        }

        if(_isMovesLeft(board) === false){
            return 0;
        }

        if (isMaximizingPlayer){
            let bestVal = -1000;
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if(board[i][j] === " "){
                        board[i][j] === player;
                        bestVal = Math.max(bestVal, _minimax(board, depth + 1, !isMaximizingPlayer));
                        board[i][j] = " ";
                    }
                }
            }
            return bestVal;
        } else {
            let bestVal = +1000;
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if(board[i][j] === " "){
                        board[i][j] = opponent;
                        bestVal = Math.min(bestVal, _minimax(board, depth + 1, !isMaximizingPlayer));
                        board[i][j] = " ";    
                    }
                }
            }
            return bestVal;
        }
    }

    const _isMovesLeft = (board) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(board[i][j] == " "){
                    return true;
                }
            }  
        }
        return false;
    }

    const _evaluate = (b) => {
        // Checking for Rows for X or O victory.
        for(let row = 0; row < 3; row++)
        {
            if (b[row][0] == b[row][1] &&
                b[row][1] == b[row][2])
            {
                if (b[row][0] == player)
                    return +10;
                    
                else if (b[row][0] == opponent)
                    return -10;
            }
        }

        // Checking for Columns for X or O victory.
        for(let col = 0; col < 3; col++)
        {
            if (b[0][col] == b[1][col] &&
                b[1][col] == b[2][col])
            {
                if (b[0][col] == player)
                    return +10;

                else if (b[0][col] == opponent)
                    return -10;
            }
        }

        // Checking for Diagonals for X or O victory.
        if (b[0][0] == b[1][1] && b[1][1] == b[2][2])
        {
            if (b[0][0] == player)
                return +10;
                
            else if (b[0][0] == opponent)
                return -10;
        }

        if (b[0][2] == b[1][1] &&
            b[1][1] == b[2][0])
        {
            if (b[0][2] == player)
                return +10;
                
            else if (b[0][2] == opponent)
                return -10;
        }

        // Else if none of them have
        // won then return 0
        return 0;
    }

    const _checkBoard = (board) => {
        const message = document.getElementById('gameMessage');
        
        let movesLeft = _isMovesLeft(board);
        let score = _evaluate(board);

        if(score === 10){
            message.textContent = "X is the winner!";
            return true;
        } else if (score === -10){
            message.textContent = "O is the winner!";
            return true;
        }
        
        if(movesLeft){
            return false;
        } else {
            message.textContent = "It's a tie!"
            return true;
        }
}

    return {
        displayBoard,
        resetBoard
    }
})();

const player = (name, marker) => {

    return {name, marker};
}

const createPlayers = () => {
    const playerName1 = document.getElementById('player1').value;
    const player1 = player(playerName1, "X");
    const playerName2 = document.getElementById('player2').value;
    const player2 = player(playerName2, "O");
    gameBoard.resetBoard();
    return {
        player1,
        player2
    }
}


let currentMarker = "O";

gameBoard.displayBoard();
createPlayers();

