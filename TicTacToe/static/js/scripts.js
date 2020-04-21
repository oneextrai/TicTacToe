/* -- SELECTORS -- */
const title = document.getElementById("main_title");
const defaultTitle = title.innerText;
const playerOneScore = document.getElementById("player1_score");
const playerTwoScore = document.getElementById("player2_score");
const drawScore = document.getElementById("draw_score");
const boxes = document.getElementsByClassName("box");
const resetButton = document.getElementById("reset_button");

/* -- GLOBAL VARIABLES -- */
let playerOneScoreInt = 0;
let playerTwoScoreInt = 0;
let drawScoreInt = 0;
let player = 1;

/* -- EVENT LISTENERS -- */
for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    box.addEventListener("click", function() {boxClicked(box)});
    addClass(box, "active");
}

resetButton.addEventListener("click", resetBoard);

/* -- FUNCTIONS -- */
function boxClicked(box) {
    player = (player == 1 || player == 3) ? 1 : 2;

    if (box.className.includes("active")) {
        removeClass(box, "active");
        addClass(box, `player${player}`);
        let over = checkWinCondition();
        (over != 0) ? gameOver(over) : player ++;
    }
}

function updateScores() {
    playerOneScore.innerText = playerOneScoreInt;
    playerTwoScore.innerText = playerTwoScoreInt;
    drawScore.innerText = drawScoreInt;
}

function resetBoard() {
    forEach(boxes, function(i) {
        addClass(boxes[i], "active");
        removeClass(boxes[i], "player1");
        removeClass(boxes[i], "player2");
    });
    title.innerText = defaultTitle;
    addClass(resetButton, "hidden");
    player = 1;
}

function gameOver(condition) {
    forEach(boxes, function(i) {removeClass(boxes[i], "active")});
    (condition == 2) ? (title.innerText = "Player One Wins!", playerOneScoreInt++)
    : (condition == -2) ? (title.innerText = "Player Two Wins!", playerTwoScoreInt++)
    : (title.innerText = "It's a draw!", drawScoreInt++);
    updateScores();
    removeClass(resetButton, "hidden");
}

function checkWinCondition() {
    let items = [];
    for (let i = 0; i < boxes.length; i++) {
        items.push(boxes[i].className);
    }
    /* PLAYER ONE WINS */
    // Horizontal
    if (items[0] == items[1] && items[1] == items[2] && items[2].includes("player1")) {
        return 2;
    }
    else if (items[3] == items[4] && items[4] == items[5] && items[5].includes("player1")) {
        return 2;
    }
    else if (items[6] == items[7] && items[7] == items[8] && items[8].includes("player1")) {
        return 2;
    }
    // Vertical
    else if (items[0] == items[3] && items[3] == items[6] && items[6].includes("player1")) {
        return 2;
    }
    else if (items[1] == items[4] && items[4] == items[7] && items[7].includes("player1")) {
        return 2;
    }
    else if (items[2] == items[5] && items[5] == items[8] && items[8].includes("player1")) {
        return 2;
    }
    // Diagonal
    else if (items[0] == items[4] && items[4] == items[8] && items[8].includes("player1")) {
        return 2;
    }
    else if (items[2] == items[4] && items[4] == items[6] && items[6].includes("player1")) {
        return 2;
    }
    /* PLAYER TWO WINS */
    // Horizontal
    else if (items[0] == items[1] && items[1] == items[2] && items[2].includes("player2")) {
        return -2;
    }
    else if (items[3] == items[4] && items[4] == items[5] && items[5].includes("player2")) {
        return -2;
    }
    else if (items[6] == items[7] && items[7] == items[8] && items[8].includes("player2")) {
        return -2;
    }
    // Vertical
    else if (items[0] == items[3] && items[3] == items[6] && items[6].includes("player2")) {
        return -2;
    }
    else if (items[1] == items[4] && items[4] == items[7] && items[7].includes("player2")) {
        return -2;
    }
    else if (items[2] == items[5] && items[5] == items[8] && items[8].includes("player2")) {
        return -2;
    }
    // Diagonal
    else if (items[0] == items[4] && items[4] == items[8] && items[8].includes("player2")) {
        return -2;
    }
    else if (items[2] == items[4] && items[4] == items[6] && items[6].includes("player2")) {
        return -2;
    }
    /* DRAW */
    else if (document.getElementsByClassName("active").length == 0) {
        return -1;
    }
    else {
        return 0;
    }
}

/* -- HELPER FUNCTIONS -- */
function toggleClass(item, what) {
    if (item.className.includes(what)) {
        item.className = item.className.replace(` ${what}`, "");
    }
    else {
        item.className += " " + what;
    }
}

function addClass(item, what) {
    if (!item.className.includes(what)) {
        item.className += " " + what;
    }
}

function removeClass(item, what) {
    if (item.className.includes(what)) {
        item.className = item.className.replace(` ${what}`, "");
        item.className = item.className.replace(`${what}`, "");
    }
}

function forEach(list, func) {
    for (let i = 0; i < list.length; i++) {
        func(i);
    }
}