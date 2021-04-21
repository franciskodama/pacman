const width = 28
let squares = []
let score = 0
// const wall = 'wall-horizontal', 'wall-curve-top-left', 'wall-vertical-left', 'wall-vertical-right', 'wall-curve-top-right', 'wall-curve-bottom-right', 'wall-curve-bottom-left', 'wall-curve-top-left2', 'wall-curve-top-right2'

//SELECTORS --------------------------------

const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
const startButton = document.getElementById('start');

const upButton = document.querySelector('.btn-up');
const downButton = document.querySelector('.btn-down');
const rightButton = document.querySelector('.btn-right');
const leftButton = document.querySelector('.btn-left');

// const audioBite = document.getElementById('audio-bite'); 
// const audioStart = document.getElementById('audio-start'); 
// const audioDie = document.getElementById('audio-die'); 
// const audioTurn = document.getElementById('audio-turn');
// const gameOver = document.getElementById('over');

//28 *28 = 784
  // 0 - pac-dot
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty
const layout = [
    2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,
    6,0,0,0,0,0,0,0,0,0,0,0,0,2,9,0,0,0,0,0,0,0,0,0,0,0,0,7,
    6,0,2,1,1,9,0,2,1,1,1,9,0,6,7,0,2,1,1,1,9,0,2,1,1,9,0,7,
    6,3,6,4,4,7,0,6,4,4,4,7,0,6,7,0,6,4,4,4,7,0,6,4,4,7,3,7,
    6,0,5,1,1,8,0,5,1,1,1,8,0,5,8,0,5,1,1,1,8,0,5,1,1,8,0,7,
    6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,
    6,0,2,1,1,9,0,2,1,1,1,1,1,1,1,1,1,1,1,1,9,0,2,1,1,9,0,7,
    6,0,5,1,1,8,0,5,1,1,1,1,1,11,12,1,1,1,1,1,8,0,5,1,1,8,0,7,
    6,0,0,0,0,0,0,0,0,0,0,0,0,6,7,0,0,0,0,0,0,0,0,0,0,0,0,7,
    5,1,1,1,1,9,0,2,1,1,1,9,0,5,8,0,2,1,1,1,9,0,2,1,1,1,1,8,
    4,4,4,4,4,7,0,6,12,1,1,8,4,4,4,4,5,1,1,11,7,0,6,4,4,4,4,4,
    4,4,4,4,4,7,0,6,7,4,4,4,4,4,4,4,4,4,4,6,7,0,6,4,4,4,4,4,
    1,1,1,1,1,8,0,5,8,4,2,1,10,10,10,10,1,9,4,5,8,0,5,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,0,6,10,10,10,10,10,10,7,,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,9,0,2,9,0,6,10,10,10,10,10,10,7,4,2,9,0,2,1,1,1,1,1,
    4,4,4,4,4,7,0,6,7,0,6,10,10,10,10,10,10,7,4,6,7,0,6,4,4,4,4,4,
    2,1,1,1,1,8,0,5,8,0,5,1,1,1,1,1,1,8,4,5,8,0,5,1,1,1,1,9,
    6,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,7,
    6,0,2,1,1,9,0,2,1,1,1,9,0,2,9,0,2,1,1,1,9,0,2,1,1,9,0,7,
    6,0,5,1,11,7,0,5,1,1,1,8,0,5,8,0,5,1,1,1,8,0,6,12,1,8,0,7,
    6,3,0,0,6,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,7,0,0,3,7,
    5,1,9,0,6,7,0,2,9,0,2,1,1,1,1,1,1,9,0,2,9,0,6,7,0,2,1,8,
    2,1,8,0,5,8,0,6,7,0,5,1,1,1,1,1,1,8,0,6,7,0,5,8,0,5,1,9,
    6,0,0,0,0,0,0,5,8,0,0,0,0,2,9,0,0,0,0,5,8,0,0,0,0,0,0,7,
    6,0,2,1,1,1,1,1,1,1,1,9,0,6,7,0,2,1,1,1,1,1,1,1,1,9,0,7,
    6,0,5,1,1,1,1,1,1,1,1,8,0,5,8,0,5,1,1,1,1,1,1,1,1,8,0,7,
    6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,
    5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8 
]


//EVENT LISTENERS --------------------------
document.addEventListener('keyup', control)
startButton.addEventListener('click', startGame);


upButton.addEventListener('click', function(){
    control(38)
});
// downButton.addEventListener('click', control(40));
// rightButton.addEventListener('click', control(39));
// leftButton.addEventListener('click', control(37));


// upButton.addEventListener('click', controlUp);
// downButton.addEventListener('click', controlDown);
// rightButton.addEventListener('click', controlRight);
// leftButton.addEventListener('click', controlLeft);


//FUNCTIONS --------------------------------

function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')

        grid.appendChild(square)
        squares.push(square)

        if(layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall-horizontal')
        } else if (layout[i] === 10) {
            squares[i].classList.add('ghost-lair')   
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        } else if (layout[i] === 5) {
            squares[i].classList.add('wall-curve-top-left')
        } else if (layout[i] === 6) {
            squares[i].classList.add('wall-vertical-left')
        } else if (layout[i] === 7) {
            squares[i].classList.add('wall-vertical-right')
        } else if (layout[i] === 8) {
            squares[i].classList.add('wall-curve-top-right')
        } else if (layout[i] === 9) {
            squares[i].classList.add('wall-curve-bottom-right')
        } else if (layout[i] === 2) {
            squares[i].classList.add('wall-curve-bottom-left')
        } else if (layout[i] === 11) {
            squares[i].classList.add('wall-curve-top-left2')
        } else if (layout[i] === 12) {
            squares[i].classList.add('wall-curve-top-right2')
        }
    }
}
createBoard()

function startGame(){
    console.log("Hello World")
}

//start position of pacman
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pacman-right')

//keyboard control
function control(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman-right', 'pacman-left', 'pacman-down', 'pacman-up')
    switch (e.keyCode) {
        case 40:
        if (
            !squares[pacmanCurrentIndex + width].classList.contains('wall-horizontal') &&
            !squares[pacmanCurrentIndex + width].classList.contains('wall-vertical-right') &&
            !squares[pacmanCurrentIndex + width].classList.contains('wall-vertical-left') &&
            !squares[pacmanCurrentIndex + width].classList.contains('wall-curve-top-left') &&
            !squares[pacmanCurrentIndex + width].classList.contains('wall-curve-top-right') &&
            !squares[pacmanCurrentIndex + width].classList.contains('wall-curve-bottom-right') &&
            !squares[pacmanCurrentIndex + width].classList.contains('wall-curve-bottom-left') &&
            !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
            pacmanCurrentIndex + width < width * width) 
            pacmanCurrentIndex += width
            squares[pacmanCurrentIndex].classList.remove('pacman-left', 'pacman-right', 'pacman-up')
            squares[pacmanCurrentIndex].classList.add('pacman-down')
        break
        case 38:
        if (
            !squares[pacmanCurrentIndex - width].classList.contains('wall-horizontal') &&
            !squares[pacmanCurrentIndex - width].classList.contains('wall-vertical-right') &&
            !squares[pacmanCurrentIndex - width].classList.contains('wall-vertical-left') &&
            !squares[pacmanCurrentIndex - width].classList.contains('wall-curve-top-left') &&
            !squares[pacmanCurrentIndex - width].classList.contains('wall-curve-top-right') &&
            !squares[pacmanCurrentIndex - width].classList.contains('wall-curve-bottom-right') &&
            !squares[pacmanCurrentIndex - width].classList.contains('wall-curve-bottom-left') &&
            !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
            pacmanCurrentIndex - width >= 0)
            pacmanCurrentIndex -= width
            squares[pacmanCurrentIndex].classList.remove('pacman-left', 'pacman-right', 'pacman-down')
            squares[pacmanCurrentIndex].classList.add('pacman-up')
        break
        case 37:
        if (
            !squares[pacmanCurrentIndex - 1].classList.contains('wall-horizontal') &&
            !squares[pacmanCurrentIndex - 1].classList.contains('wall-vertical-right') &&
            !squares[pacmanCurrentIndex - 1].classList.contains('wall-vertical-left') &&
            !squares[pacmanCurrentIndex - 1].classList.contains('wall-curve-top-left') &&
            !squares[pacmanCurrentIndex - 1].classList.contains('wall-curve-top-right') &&
            !squares[pacmanCurrentIndex - 1].classList.contains('wall-curve-bottom-right') &&
            !squares[pacmanCurrentIndex - 1].classList.contains('wall-curve-bottom-left') &&
            !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
            pacmanCurrentIndex % width !== 0)            
            pacmanCurrentIndex -=1
            squares[pacmanCurrentIndex].classList.remove('pacman-down', 'pacman-right', 'pacman-up')
            squares[pacmanCurrentIndex].classList.add('pacman-left')
        if (pacmanCurrentIndex === 364) pacmanCurrentIndex = 391
        break
        case 39:
        if (
            !squares[pacmanCurrentIndex + 1].classList.contains('wall-horizontal') &&
            !squares[pacmanCurrentIndex + 1].classList.contains('wall-vertical-right') &&
            !squares[pacmanCurrentIndex + 1].classList.contains('wall-vertical-left') &&
            !squares[pacmanCurrentIndex + 1].classList.contains('wall-curve-top-left') &&
            !squares[pacmanCurrentIndex + 1].classList.contains('wall-curve-top-right') &&
            !squares[pacmanCurrentIndex + 1].classList.contains('wall-curve-bottom-right') &&
            !squares[pacmanCurrentIndex + 1].classList.contains('wall-curve-bottom-left') &&
            !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
            pacmanCurrentIndex % width < width - 1)
            pacmanCurrentIndex +=1
            squares[pacmanCurrentIndex].classList.remove('pacman-left', 'pacman-down', 'pacman-up')
            squares[pacmanCurrentIndex].classList.add('pacman-right')
        if (pacmanCurrentIndex === 391) pacmanCurrentIndex = 364
        break
    }
    squares[pacmanCurrentIndex].classList.add('pacman-right')
    pacDotEaten()
    powerPelletEaten()
    checkForWin()
    eatScaredGhost()
    checkForGameOver()
}

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.innerHTML = score
    }
}

function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        score +=10
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScaredGhosts, 10000)
    }
}

function unScaredGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

//CLASSES --------------------------------
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

//draw my ghosts onto my grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

//move the ghosts
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
         if (
             !squares[ghost.currentIndex + direction].classList.contains('wall-horizontal') &&
             !squares[ghost.currentIndex + direction].classList.contains('wall-vertical-left') &&
             !squares[ghost.currentIndex + direction].classList.contains('wall-vertical-right') &&
             !squares[ghost.currentIndex + direction].classList.contains('wall-curve-top-left') &&
             !squares[ghost.currentIndex + direction].classList.contains('wall-curve-top-right') &&
             !squares[ghost.currentIndex + direction].classList.contains('wall-curve-bottom-right') &&
             !squares[ghost.currentIndex + direction].classList.contains('wall-curve-bottom-left') &&
             !squares[ghost.currentIndex + direction].classList.contains('ghost')
            ) {
                squares[ghost.currentIndex].classList.remove(ghost.className)
                squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
                ghost.currentIndex += direction
                squares[ghost.currentIndex].classList.add(ghost.className)
                squares[ghost.currentIndex].classList.add('ghost')
            } else direction = directions[Math.floor(Math.random() * directions.length)]

            //if the ghost is currently scared
            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add('scared-ghost')
            }

            //if the ghost is currently scared AND pacman is on it
            if (
                ghost.isScared &&
                squares[ghost.currentIndex].classList.contains('pacman-right', 'pacman-left', 'pacman-down', 'pacman-up')) {
                    squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                    ghost.currentIndex = ghost.startIndex
                    score +=100 
                    squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
                }
                checkForGameOver()
             }, ghost.speed)
}

function checkForGameOver() {
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost')) { 
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', control)
        scoreDisplay.innerHTML = "YOU LOSE"
    } 
}

function eatScaredGhost() {
    if (
        squares[pacmanCurrentIndex].classList.contains('scared-ghost')
        ) {
        squares[pacmanCurrentIndex].classList.remove('ghost', 'scared-ghost')
        ghost.currentIndex = startIndex
        squares[ghost.currentIndex].classList.add(ghost.className)
        score +=200
    }
}

function checkForWin() {
    if (score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', control)
        scoreDisplay.innerHTML = "YOU WON"
    }
}

// -----------------------------


// function controlUp() {
//     squares[pacmanCurrentIndex].classList.remove('pacman-right', 'pacman-left', 'pacman-down', 'pacman-up')
//     if (
//         !squares[pacmanCurrentIndex - width].classList.contains('wall-horizontal') &&
//         !squares[pacmanCurrentIndex - width].classList.contains('wall-vertical-right') &&
//         !squares[pacmanCurrentIndex - width].classList.contains('wall-vertical-left') &&
//         !squares[pacmanCurrentIndex - width].classList.contains('wall-curve-top-left') &&
//         !squares[pacmanCurrentIndex - width].classList.contains('wall-curve-top-right') &&
//         !squares[pacmanCurrentIndex - width].classList.contains('wall-curve-bottom-right') &&
//         !squares[pacmanCurrentIndex - width].classList.contains('wall-curve-bottom-left') &&
//         !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
//         pacmanCurrentIndex - width >= 0)
//         pacmanCurrentIndex -= width
//         squares[pacmanCurrentIndex].classList.remove('pacman-left', 'pacman-right', 'pacman-down')
//         squares[pacmanCurrentIndex].classList.add('pacman-up')
//         pacDotEaten()
//         powerPelletEaten()
//         checkForWin()
//         eatScaredGhost()
//         checkForGameOver()
// }

// function controlDown() {
//     squares[pacmanCurrentIndex].classList.remove('pacman-right', 'pacman-left', 'pacman-down', 'pacman-up')
//     if (
//         !squares[pacmanCurrentIndex + width].classList.contains('wall-horizontal') &&
//         !squares[pacmanCurrentIndex + width].classList.contains('wall-vertical-right') &&
//         !squares[pacmanCurrentIndex + width].classList.contains('wall-vertical-left') &&
//         !squares[pacmanCurrentIndex + width].classList.contains('wall-curve-top-left') &&
//         !squares[pacmanCurrentIndex + width].classList.contains('wall-curve-top-right') &&
//         !squares[pacmanCurrentIndex + width].classList.contains('wall-curve-bottom-right') &&
//         !squares[pacmanCurrentIndex + width].classList.contains('wall-curve-bottom-left') &&
//         !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
//         pacmanCurrentIndex + width < width * width) 
//         pacmanCurrentIndex += width
//         squares[pacmanCurrentIndex].classList.remove('pacman-left', 'pacman-right', 'pacman-up')
//         squares[pacmanCurrentIndex].classList.add('pacman-down')
//         pacDotEaten()
//         powerPelletEaten()
//         checkForWin()
//         eatScaredGhost()
//         checkForGameOver()
// }

// function controlRight() {
//     squares[pacmanCurrentIndex].classList.remove('pacman-right', 'pacman-left', 'pacman-down', 'pacman-up')
//     if (
//         !squares[pacmanCurrentIndex + 1].classList.contains('wall-horizontal') &&
//         !squares[pacmanCurrentIndex + 1].classList.contains('wall-vertical-right') &&
//         !squares[pacmanCurrentIndex + 1].classList.contains('wall-vertical-left') &&
//         !squares[pacmanCurrentIndex + 1].classList.contains('wall-curve-top-left') &&
//         !squares[pacmanCurrentIndex + 1].classList.contains('wall-curve-top-right') &&
//         !squares[pacmanCurrentIndex + 1].classList.contains('wall-curve-bottom-right') &&
//         !squares[pacmanCurrentIndex + 1].classList.contains('wall-curve-bottom-left') &&
//         !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
//         pacmanCurrentIndex % width < width - 1)
//         pacmanCurrentIndex +=1
//         squares[pacmanCurrentIndex].classList.remove('pacman-left', 'pacman-down', 'pacman-up')
//         squares[pacmanCurrentIndex].classList.add('pacman-right')
//     if (pacmanCurrentIndex === 391) pacmanCurrentIndex = 364
//     pacDotEaten()
//     powerPelletEaten()
//     checkForWin()
//     eatScaredGhost()
//     checkForGameOver()
// }

// function controlLeft() {
//     squares[pacmanCurrentIndex].classList.remove('pacman-right', 'pacman-left', 'pacman-down', 'pacman-up')
//     if (
//         !squares[pacmanCurrentIndex - 1].classList.contains('wall-horizontal') &&
//         !squares[pacmanCurrentIndex - 1].classList.contains('wall-vertical-right') &&
//         !squares[pacmanCurrentIndex - 1].classList.contains('wall-vertical-left') &&
//         !squares[pacmanCurrentIndex - 1].classList.contains('wall-curve-top-left') &&
//         !squares[pacmanCurrentIndex - 1].classList.contains('wall-curve-top-right') &&
//         !squares[pacmanCurrentIndex - 1].classList.contains('wall-curve-bottom-right') &&
//         !squares[pacmanCurrentIndex - 1].classList.contains('wall-curve-bottom-left') &&
//         !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
//         pacmanCurrentIndex % width !== 0)            
//         pacmanCurrentIndex -=1
//         squares[pacmanCurrentIndex].classList.remove('pacman-down', 'pacman-right', 'pacman-up')
//         squares[pacmanCurrentIndex].classList.add('pacman-left')
//     if (pacmanCurrentIndex === 364) pacmanCurrentIndex = 391
//     pacDotEaten()
//     powerPelletEaten()
//     checkForWin()
//     eatScaredGhost()
//     checkForGameOver()
// }

// function playDie() { 
//     clearInterval(timerId);
//     gameOver.style.display = 'block';
//     gameOver.classList.add('gameover');
//     audioDie.play();
// }





