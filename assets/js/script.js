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

function newGame() {
    word = words[Math.floor(Math.random() * words.length)].split("");
    console.log(word);

    for (var i = 0; i < word.length; i++) {
        wordHidden.push("_ ");
    }

    renderWord();
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


document.addEventListener("keydown", detectKeydown);

newGame();