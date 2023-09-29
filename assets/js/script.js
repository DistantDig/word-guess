/**
 * Registering user keydown - DONE
 * Use localStorage - DONE
 * Have a timer for guessing - DONE
 * Have a button that starts the game - DONE
 */


var words = ["happy", "sad", "description", "loss", "world", "javascript", "berkeley"];
var word = [];
var wordToGuess = document.getElementById("word-to-guess");
var wordHidden = [];

var timer = document.getElementById("timer");
var startGame = document.getElementById("button");
var scoreboard = document.getElementById("scoreboard");
var scoreWins = document.getElementById("wins");
var scoreLosses = document.getElementById("losses");


if (localStorage.getItem("wins") == "") {
    localStorage.setItem("wins", 0);
}

if (localStorage.getItem("wins") == undefined) {
    localStorage.setItem("wins", 0);
}

if (localStorage.getItem("losses") == "") {
    localStorage.setItem("losses", 0);
}

if (localStorage.getItem("losses") == undefined) {
    localStorage.setItem("losses", 0);
}


function newGame() {
    word = words[Math.floor(Math.random() * words.length)].split("");
    console.log(word);

    for (var i = 0; i < word.length; i++) {
        wordHidden.push("_ ");
    }

    document.addEventListener("keydown", detectKeydown);
    renderer();
    timeLeft();

    startGame.style.visibility = "hidden";
}

function endGame() {
    console.log("Wins: " + localStorage.getItem("wins"));
    console.log("Losses: " + localStorage.getItem("losses"));
    document.removeEventListener("keydown", detectKeydown);
    startGame.style.visibility = "visible";

    wordHidden = [];
    timer.innerHTML = "";
    renderer();
}

function timeLeft() {
    var seconds = 15;
    var localTimer = setInterval(function () {
        timer.innerHTML = "Time: " + seconds;

        if (seconds == 0) {
            clearInterval(localTimer);
            // losses++;
            var losses = parseInt(localStorage.getItem("losses"));
            console.log(losses);
            localStorage.setItem("losses", losses + 1);
            endGame();

            alert("You lose");
        } else if (!wordHidden.includes("_ ")) {
            clearInterval(localTimer);
            // wins++;
            var wins = parseInt(localStorage.getItem("wins"));
            console.log(wins);
            localStorage.setItem("wins", wins + 1);
            endGame();

            alert("You win!");
        }
        else {
            seconds--;
        }
    }, 1000);
}

function renderer() {
    wordToGuess.innerHTML = wordHidden.join("");
    scoreWins.innerHTML = "Wins: " + localStorage.getItem("wins");
    scoreLosses.innerHTML = "Losses: " + localStorage.getItem("losses");
}


function detectKeydown(event) {
    // console.log(event);

    var userGuess = event.key;
    console.log(userGuess);
    
    if (word.includes(userGuess)) { // Checks if the letter is in the word
        var letterIndex = word.indexOf(userGuess); // Get the index of the letter in word

        wordHidden[letterIndex] = userGuess; // Replace the underscore with the correct letter
        word[letterIndex] = "_"; // Replace the letter with an underscore to handle duplicate letters
        renderer();

    } else {
        console.log(userGuess, "does not exists")
    }
}

// newGame();
renderer();