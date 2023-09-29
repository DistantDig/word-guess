/**
 * Registering user keydown 
 * Use localStorage
 * Have a timer for guessing
 * Have a button that starts the game
 */


var words = ["happy", "sad", "description", "loss", "world", "javascript", "berkeley"];
var word = [];
var wordToGuess = document.getElementById("word-to-guess");
var wordHidden = [];

var timer = document.getElementById("timer");

var wins = 0;
var losses = 0;

function newGame() {
    word = words[Math.floor(Math.random() * words.length)].split("");
    console.log(word);

    for (var i = 0; i < word.length; i++) {
        wordHidden.push("_ ");
    }

    document.addEventListener("keydown", detectKeydown);
    renderWord();
    timeLeft();
}

function timeLeft() {
    var seconds = 15;
    var localTimer = setInterval(function () {
        timer.innerHTML = "Time: " + seconds;

        if (seconds == 0) {
            clearInterval(localTimer);
            document.removeEventListener("keydown", detectKeydown);
            losses++;
            console.log("Wins: " + wins);
            console.log("Losses: " + losses);
        } else if (!wordHidden.includes("_ ")) {
            clearInterval(localTimer);
            document.removeEventListener("keydown", detectKeydown);
            wins++;
            console.log("Wins: " + wins);
            console.log("Losses: " + losses);
        }
        else {
            seconds--;
        }
    }, 1000);
}

function renderWord() {
    wordToGuess.innerHTML = wordHidden.join("");
}


function detectKeydown(event) {
    // console.log(event);

    var userGuess = event.key;
    console.log(userGuess);
    
    if (word.includes(userGuess)) { // Checks if the letter is in the word
        var letterIndex = word.indexOf(userGuess); // Get the index of the letter in word

        wordHidden[letterIndex] = userGuess; // Replace the underscore with the correct letter
        word[letterIndex] = "_"; // Replace the letter with an underscore to handle duplicate letters
        renderWord();

    } else {
        console.log(userGuess, "does not exists")
    }
}

newGame();