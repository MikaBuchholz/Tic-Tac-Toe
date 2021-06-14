const { copyFileSync } = require('original-fs');
const ai = require('tictactoe-complex-ai');

let aiActive = false

const gamefield = ["", "", "", "", "", "", "", "", ""]
const oPlayer = '⭕'
const xPlayer = '❌'
let currentPlayer = xPlayer

const dropdownButton = document.getElementById('dropbtn')
const headline = document.getElementById('headline')
const boxes = Array.from(document.getElementsByClassName('box'))
const playerDiv = document.getElementById('current-player')
const resetButton = document.getElementById('reset-button')

let gameOn = true

window.onclick = (event) => {
  if (event.target.matches('span')) {
    let difficulty = event.target.innerText
    dropdownButton.innerText = difficulty
    difficulty = difficulty.toLowerCase()
    
    if (difficulty === null || difficulty == 'off') {
      aiActive = false

    } 
    if (difficulty !== null && difficulty !== 'off'){
      aiActive = true
      const aiInstance = ai.createAI({level: difficulty});
      globalThis.aiInstance = aiInstance
    }
  }
}

resetButton.addEventListener('click', () => {
  resetGameField()
})

function resetGameField () {
  boxes.forEach((box, index) => {
    box.innerText = ''
    box.style = ''
  })

  gamefield.forEach((box, index) => {
    gamefield[index] = ""
  })

  headline.innerText = 'Tic-Tac-Toe'
  gameOn = true
  currentPlayer = xPlayer
  aiActive = false
  dropdownButton.innerText = 'Difficulty'
  playerDiv.innerText = `Next to move: ${xPlayer}`
  drawBoard()
}

const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = ''
    if (index < 3) {
      styleString += 'border-bottom: 3px solid #191c1a;'
    }

    if (index % 3 === 0) {
      styleString += 'border-right: 3px solid #191c1a;'
    }

    if (index % 3 === 2) {
      styleString += 'border-left: 3px solid #191c1a;'
    }

    if (index > 5) {
      styleString += 'border-top: 3px solid #191c1a;'
    }

    box.style = styleString;
    box.addEventListener('click', boxClicked)
  })
}

const boxClicked = (e) => {
    console.log(currentPlayer)
    const boxID = e.target.id
    
    if (aiActive === true) {
      if (currentPlayer === oPlayer) {
      aiInstance.play(gamefield).then(pos => {
        currentPlayer = xPlayer

        if (gamefield[pos] === "") {
          boxes.forEach((box, index) => {
            if (index === pos) {
              box.innerText = '⭕'
              gamefield[box.id] = 'O'
             
              
            }
          })

          checkWin('O', '⭕')
          playerDiv.innerText = `Next to move: ❌`
        }
        
      }).catch((error) => {
      
        // Fail
        console.log(error);
      });
    }
}

      if (gameOn === true) {
          if (gamefield[boxID] === "") {
            if (currentPlayer === xPlayer) {
              if (aiActive === true) {
                gamefield[boxID] = 'X'
                checkWin('X', '❌')
                
                e.target.innerText = '❌'
                currentPlayer = oPlayer

                playerDiv.innerText = `Next to move: ⭕`

                boxClicked(e)
              }
            } 

            if (aiActive === false) {
              if (currentPlayer === xPlayer) {
                symbol = 'X'
              }

              if (currentPlayer === oPlayer) {
                symbol = 'O'
              }

              gamefield[boxID] = symbol
              
              checkWin(symbol, currentPlayer)
      
              e.target.innerText = currentPlayer
              currentPlayer = currentPlayer === oPlayer ? xPlayer : oPlayer;
              playerDiv.innerText = `Next to move: ${currentPlayer}`
              }
            }
      } 
}

const checkWin = (player, symbol) => {
    if (gamefield[0] === player) {
        if (gamefield[1] === player && gamefield[2] === player) {
            headline.innerText = `${symbol} wins up top`

            highlightWin(0, 1, 2)
            gameOn = false

            return true;
        }

        if (gamefield[3] === player && gamefield[6] === player) {
            headline.innerText = `${symbol} wins on the left`

            highlightWin(0, 3, 6)
            gameOn = false

            return true;
        }

        if (gamefield[4] === player && gamefield[8] === player) {
            headline.innerText= `${symbol} wins on the diagonal`

            highlightWin(0, 4, 8)
            gameOn = false

            return true;
        }
      }

    if (gamefield[8] === player) {
        if (gamefield[2] === player && gamefield[5] === player) {
            headline.innerText = `${symbol} wins on the right`

            highlightWin(2, 5, 8)
            gameOn = false

            return true;
        }

        if (gamefield[7] === player && gamefield[6] === player) {
            headline.innerText = `${symbol} wins on the bottom`

            highlightWin(6, 7, 8)
            gameOn = false

            return true;
        }
      }
    
    if (gamefield[4] === player) {
        if (gamefield[3] === player && gamefield[5] === player) {
            headline.innerText= `${symbol} wins on the middle horizontal`

            highlightWin(3, 4, 5)
            gameOn = false

            return true;
        }

        if (gamefield[1] === player && gamefield[7] === player) {
            headline.innerText = `${symbol} wins on the middle vertical`

            highlightWin(1, 4, 7)
            gameOn = false

            return true;
        }
        if (gamefield[2] === player && gamefield[6] === player) {
          headline.innerText = `${symbol} wins on the diagonal`

          highlightWin(1, 2, 6)
          gameOn = false

          return true;
      }
      }
    
      if (!gamefield.includes("")) {
        headline.innerText = `TIE!`

        gameOn = false

        return true;
      }
      }
    
function highlightWin(boxIdOne, boxIdTwo, boxIdThree) {
  boxes.forEach((box, index) => {
    let styleString = ''
    if (index < 3) {
      styleString += 'border-bottom: 3px solid #191c1a;'
    }

    if (index % 3 === 0) {
      styleString += 'border-right: 3px solid #191c1a;'
    }

    if (index % 3 === 2) {
      styleString += 'border-left: 3px solid #191c1a;'
    }

    if (index > 5) {
      styleString += 'border-top: 3px solid #191c1a;'
    }

    if (index === boxIdOne) {
      styleString += 'background-color: #6f7179;'
    }

    if (index === boxIdTwo) {
      styleString += 'background-color: #6f7179;'
    }
    
    if (index === boxIdThree) {
      styleString += 'background-color: #6f7179;'
    }
    
    box.style = styleString;
    box.addEventListener('click', boxClicked)
  })
}








drawBoard()