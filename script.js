const game = (function() {
    const arrBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    let player1;
    let player2;
    let winner;

    function createPlayer(name, signatureMove) {
        const playerDoMove = function(rowIndex, columnIndex, signatureMove) {
            arrBoard[rowIndex][columnIndex] = signatureMove;
        };

        return { name, signatureMove, playerDoMove };
    }

    const domBuilder = function() {
        const openModal = document.querySelector(".show-modal");
        const closeModal = document.querySelector("dialog form button");
        const modal = document.querySelector("dialog");
        const form = document.querySelector("dialog form");
        const boxes = document.querySelectorAll(".boxes");
        const infoText = document.querySelector(".info-text");

        function resetGame() {
            winner = undefined;
            player1 = undefined;
            player2 = undefined;
            for (let row = 0; row < arrBoard.length; row++) {
                for (let col = 0; col < arrBoard[row].length; col++) {
                    arrBoard[row][col] = '';
                }
            }

            removeListeners();
            openModal.textContent = "Play Again";
            openModal.style.display = "block";
            openModal.style.margin = "0 0 20px 0"
        }

        function removeListeners() {
            boxes.forEach(element => element.removeEventListener('click', element.fn, false));
        }

        const applyListeners = function() {
            openModal.addEventListener("click", () => {
                modal.showModal();
            });
            closeModal.addEventListener("click", () => {
                modal.close();
            });
            form.addEventListener("submit", () => {
                let turn = 0;
                boxes.forEach(element => element.textContent = '');
                player1 = createPlayer(document.getElementById("playerOneName").value, "X");
                player2 = createPlayer(document.getElementById("playerTwoName").value, "O");
                openModal.style.display = "none";
                document.querySelector(".tic-tac-toe").style.display = "grid";
                infoText.textContent = `${player1.name}'s turn, your signature move is '${player1.signatureMove}'`;

                boxes.forEach(element => element.addEventListener("click", element.fn = function fn() {
                    if (turn === 0) {
                        player1.playerDoMove(
                            element.getAttribute("data-row-index"),
                            element.getAttribute("data-col-index"),
                            player1.signatureMove
                        );
                        console.table(arrBoard);
                        element.textContent = player1.signatureMove;
                        winner = checkBoard();
                        console.log(player1.signatureMove);
                        console.log(player2.signatureMove);
                        console.log(winner);
                        if (winner === player1.signatureMove) {
                            infoText.textContent = `${player1.name} WINS!`;
                            resetGame();
                             turn = 0;
                        } else if (winner === player2.signatureMove) {
                            infoText.textContent = `${player2.name} WINS!`;
                            resetGame();
                             turn = 0;
                        } else if (winner === 'T') {
                            infoText.textContent = "It's a TIE!";
                            resetGame();
                             turn = 0;
                        } else {
                            infoText.textContent = `${player2.name}'s turn, your signature move is '${player2.signatureMove}'`;
                        }
                        element.removeEventListener('click', element.fn, false);
                        turn++;
                    } else {
                        player2.playerDoMove(
                            element.getAttribute("data-row-index"),
                            element.getAttribute("data-col-index"),
                            player2.signatureMove
                        );
                        console.table(arrBoard);
                        element.textContent = player2.signatureMove;
                        winner = checkBoard();
                        console.log(player1.signatureMove);
                        console.log(player2.signatureMove);
                        console.log(winner);
                        if (winner === player1.signatureMove) {
                            infoText.textContent = `${player1.name} WINS!`;
                            resetGame();
                            turn = 0;
                        } else if (winner === player2.signatureMove) {
                            infoText.textContent = `${player2.name} WINS!`;
                            resetGame();
                            turn = 0;
                        } else if (winner === 'T') {
                            infoText.textContent = "It's a TIE!";
                            resetGame();
                            turn = 0;
                        } else {
                            infoText.textContent = `${player1.name}'s turn, your signature move is '${player1.signatureMove}'`;
                        }
                        element.removeEventListener('click', element.fn, false);
                        turn--;
                    }
                }, false));
            });
           
        };

        return { applyListeners };
    }();

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

        return null;
    };

    const run = function() {
        domBuilder.applyListeners();
    }; 

    return { run };
})();

game.run();