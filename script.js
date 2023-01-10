const gameBoard = (() => {
    let board = ["X"," "," ",
                 "O", " "," ",
                " ", "O"," "];

    const displayBoard = () => {
    const div = document.getElementById("gameBoard")
    for(spot in board){
        let spotNode = document.createElement('div');
        spotNode.dataset.index = spot;
        spotNode.textContent = `[${board[spot]}]`;
        spotNode.addEventListener('click', (e) => addMarkToSpot(e, currentMarker));
        div.appendChild(spotNode);
    }
    };

    const addMarkToSpot = (e, marker) => {
        if(board[e.target.dataset.index] === " "){
            e.target.textContent = `[${marker}]`;
            board[e.target.dataset.index] = marker;
            currentMarker = currentMarker === "X" ? "O" : "X";    
            console.log(`Player ${currentMarker}'s turn`)
        } else {
            console.log("invalid placement, try again");
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


