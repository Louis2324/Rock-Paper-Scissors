function compChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function hasWon(userChoice, computerChoice) {
    return (
        (userChoice === "Rock" && computerChoice === "Scissors") ||
        (userChoice === "Paper" && computerChoice === "Rock") ||
        (userChoice === "Scissors" && computerChoice === "Paper")
    );
}


let playerScore = 0;
let computerScore = 0;
let drawCount = 0;

const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resetBtn = document.getElementById('reset-btn');
const startBtn = document.getElementById("Start");

const playerScoreScreen = document.getElementById('player-score-screen');
const playerDisplayScreen = document.getElementById("display-screen");
const computerScoreScreen = document.getElementById("cp-score");
const drawCountScreen = document.getElementById("draw-screen");

const gameSpace = document.getElementById("flex");
const gameInfo = document.getElementById("info");


function glowChoice(computerChoice) {
    const cpRockBtn = document.getElementById('cp-rock');
    const cpPaperBtn = document.getElementById('cp-paper');
    const cpScissorsBtn = document.getElementById('cp-scissors');

    if (computerChoice === 'Rock') {
        cpRockBtn.style.visibility = 'visible';
        cpRockBtn.classList.add('glow');
    } else if (computerChoice === 'Paper') {
        cpPaperBtn.style.visibility = 'visible';
        cpPaperBtn.classList.add('glow');
    } else if (computerChoice === 'Scissors') {
        cpScissorsBtn.style.visibility = 'visible';
        cpScissorsBtn.classList.add('glow');
    }

    setTimeout(function() {
        cpRockBtn.classList.remove('glow');
        cpPaperBtn.classList.remove('glow');
        cpScissorsBtn.classList.remove('glow');

        cpRockBtn.style.visibility = 'hidden';
        cpPaperBtn.style.visibility = 'hidden';
        cpScissorsBtn.style.visibility = 'hidden';
    }, 1500);
}

function updateScores(userChoice) {
    let resultMessage = '';
    let computerChoice = compChoice();
    glowChoice(computerChoice);

    if (hasWon(userChoice, computerChoice)) {
        drawCount = 0;
        playerScore++;
        resultMessage = `You won😁😁`;
    } else if (userChoice === computerChoice) {
        if (computerScore > 0) computerScore--;
        if (playerScore > 0) playerScore--;
        drawCount++;
        resultMessage = `You tied 😮‍💨😮‍💨 !`;
    } else {
        drawCount = 0;
        computerScore++;
        resultMessage = `You lost! 😭😭`;
    }

    displayOnScreens(resultMessage);
    winnerCheck();
}

function displayOnScreens(resultMessage) {
    playerScoreScreen.value = `${playerScore}`;
    computerScoreScreen.value = `${computerScore}`;
    drawCountScreen.value = `${drawCount}`;
    playerDisplayScreen.value = resultMessage;
}

function winnerCheck() {
    if (playerScore === 3 || (drawCount === 3 && playerScore <= computerScore)) {
        playerScoreScreen.value = "You won 🎉🎉🎉";
        computerScoreScreen.value = "I want a rematch😤😤🤦🏽";
        playerDisplayScreen.value = "What a game !!";
        endGame();
    } else if (computerScore === 3 || (drawCount === 3 && computerScore <= playerScore)) {
        playerScoreScreen.value = "😤😲😲";
        computerScoreScreen.value = "Want a rematch ? 😜😜";
        playerDisplayScreen.value = " You lost ?!?!";
        endGame();
    }
}

function endGame() {
    rockBtn.style.display = "none";
    scissorsBtn.style.display = "none";
    paperBtn.style.display = "none";
    resetBtn.style.display = "block";
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    drawCount = 0;
    displayOnScreens("Let's go for another round !!");
    rockBtn.style.display = "inline-block";
    paperBtn.style.display = "inline-block";
    scissorsBtn.style.display = "inline-block";
    resetBtn.style.display = "none";
}


rockBtn.addEventListener('click', function() {
    updateScores("Rock");
});

paperBtn.addEventListener('click', function() {
    updateScores("Paper");
});

scissorsBtn.addEventListener('click', function() {
    updateScores("Scissors");
});

resetBtn.addEventListener("click", resetGame);

startBtn.addEventListener("click", function() {
    startBtn.style.display = 'none';
    gameSpace.style.display = "";
    gameInfo.style.display = "none";
});