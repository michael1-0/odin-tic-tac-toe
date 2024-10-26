function createPlayer(name, signatureMove) {
    const getPlayerMove = function(move = "") {
        const arrIndex = move.split(',');
        return arrIndex;
    };
    return { name, signatureMove, getPlayerMove };
}

const game = (function() {
    const arrBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    const player1 = createPlayer(prompt("What is player 1 name?"), "O");
    const player2 = createPlayer(prompt("What is player 2 name?"), "X");

    const setMove = function(rowIndex, columnIndex, signatureMove) {
        arrBoard[rowIndex][columnIndex] = signatureMove;
    };

    const checkBoard = function() {
        // Checks for rows
        for (let row = 0; row < 3; row++) {
            if (
                arrBoard[row][0] !== '' &&
                arrBoard[row][0] === arrBoard[row][1] &&
                arrBoard[row][1] === arrBoard[row][2] 
            ) {
                return arrBoard[row][0];
            }
        }

        // Checks for columns
        for (let col = 0; col < 3; col++) {
            if (
                arrBoard[0][col] !== '' &&
                arrBoard[0][col] === arrBoard[1][col] &&
                arrBoard[1][col] === arrBoard[2][col] 
            ) {
                return arrBoard[0][col];
            }
        }

        // Checks for diagonals
        if (
            arrBoard[0][0] !== '' &&
            arrBoard[0][0] === arrBoard[1][1] &&
            arrBoard[1][1] === arrBoard[2][2]
        ) {
            return arrBoard[0][0];
        }
        if (
            arrBoard[0][2] !== '' &&
            arrBoard[0][2] === arrBoard[1][1] &&
            arrBoard[1][1] === arrBoard[2][0]
        ) {
            return arrBoard[0][2];
        }
        

        // Checks if full
        if (arrBoard.every(element => element.every(elem => elem !== '') === true)) {
            return 'T';
        } 

        return null
    };

    const run = function() {
        let winner = '';

        while (true) {
            let playerMove1 = player1.getPlayerMove(prompt(`${player1.name}, input your placement index (row, column < 3):`));
            setMove(Number(playerMove1[0]), Number(playerMove1[1]), player1.signatureMove);

            winner = checkBoard();
            if (winner === 'O') {
                console.log(`${player1.name} wins`);
                break;
            } else if (winner === 'X') {
                console.log(`${player2.name} wins`);
                break;
            } else if (winner === 'T') {
                console.log("It's a tie!")
                break;
            } else {
                console.log("next part...")
            } console.table(arrBoard);
                

            let playerMove2 = player2.getPlayerMove(prompt(`${player2.name}, input your placement index (row, column < 3):`));
            setMove(Number(playerMove2[0]), Number(playerMove2[1]), player2.signatureMove);

            winner = checkBoard();
            if (winner === 'O') {
                console.log(`${player1.name} wins`);
                break;
            } else if (winner === 'X') {
                console.log(`${player2.name} wins`);
                break;
            } else if (winner === 'T') {
                console.log("It's a tie!");
                break;
            } else {
                console.log("next part...");
            } console.table(arrBoard);
        }
    }; 

    return { run };
})();


game.run();