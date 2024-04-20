// Declare game variables
const gameBoard = document.getElementById('gameboard')
const squares = document.getElementsByClassName('square')
const players = ['X', 'O']
let currentPlayer = players[0]

// Declare game alerts and content to be added to DOM
const gameAlerts = document.createElement('h2')
gameAlerts.textContent = `X'S TURN`
gameAlerts.style.marginTop = '30px'
gameAlerts.style.textAlign='center'
gameboard.after(gameAlerts)

// Array of winning combinations
const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Loop through squares in DOM
for(let i = 0; i < squares.length; i++){
    // Listen for square clicks to add text content
    squares[i].addEventListener('click', () => {
        if(squares[i].textContent !== ''){
            return
        }
        // Delcare winner and return message to DOM
        squares[i].textContent = currentPlayer
        if(declareWinner(currentPlayer)) {
            gameAlerts.innerHTML=`<div class="alert alert-success" role="alert">Game end! ${currentPlayer} WINS</div>`
            return
        }
        // If games is a tie, return message to DOM
        if(tieGame()) {
            gameAlerts.innerHTML= `<div class="alert alert-info" role="alert">IT'S A DRAW!</div>`
            return
        }
        // Determine current player, return message to DOM
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0] 
        if(currentPlayer == players[0]) {
            gameAlerts.textContent= `X'S TURN`
        } else {
            gameAlerts.textContent= `O'S TURN`
        }     
    })   
}

// Determine winner by looping through successful combos
function declareWinner(currentPlayer) {
    for(let i = 0; i < winning_combinations.length; i++){
        const [a, b, c] = winning_combinations[i]
        if(squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer){
            return true
        }
    }
    return false
}

// Loop through squares with conditional to see if game has tied
function tieGame(){
    for(let i = 0; i < squares.length; i++) {
        if(squares[i].textContent === '') {
            return false;
        }
    }
    return true
}

// Reset the game
function resetButton() {
    for(let i = 0; i < squares.length; i++) {
        // Empty the squares
        squares[i].textContent = ""
    }
    // First game heading
    gameAlerts.textContent=`X'S TURN`
    // Begin with first player
    currentPlayer = players[0]
}