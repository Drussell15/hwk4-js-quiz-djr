var highscoresEmptyArray = [];

function renderScoreBoard() {
    // get scored from local storage
    var highscores2 = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // sort highscores by score property in descending order
    highscores2.sort(function (a, b) {
        return b.score - a.score;
    });

    highscores2.forEach(function (score) {
        // create li tag for each high score
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;

        // display on page
        var olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
    });

}

function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.href = "scores.html";
}

// clears scores from local storage
document.getElementById("clear").onclick = clearHighscores;

renderScoreBoard();
