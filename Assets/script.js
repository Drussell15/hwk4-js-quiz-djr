//declare elements
var start = document.getElementById("startPage");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById('A');
var choiceB = document.getElementById('B');
var choiceC = document.getElementById('C');
var choiceD = document.getElementById('D');
var next = document.getElementById("next");
var submit = document.getElementById("submit");
var hsForm = document.getElementById("hs-form");
var initialsInput = document.querySelector("#initials-text")

//create variable to hold questions
var questions = [
    {
        question: "what is a variable?",
        choiceA: "String",
        choiceB: "Boolean",
        choiceC: "Ruby",
        choiceD: "Hold value for later use",
        correct: "D",
    },
    {
        question: "What are simple javascript data types?",
        choiceA: "String",
        choiceB: "Boolean",
        choiceC: "All of these",
        choiceD: "number",
        correct: "C",
    },
    {
        question: "What is an example string data?",
        choiceA: "zero",
        choiceB: "false",
        choiceC: "true ",
        choiceD: "Name",
        correct: "D",
    },
    {
        question: "What are complex data types?",
        choiceA: "Array",
        choiceB: "object",
        choiceC: "none of these",
        choiceD: "Both A and B",
        correct: "D",
    },
    {
        question: "We access values of properties on an object using?",
        choiceA: "concatination",
        choiceB: "dot.notation",
        choiceC: "Cars",
        choiceD: "Trains",
        correct: "B",
    }
];

// value variables, must be AFTER questions
var lastQuestion = questions.length - 1;
var nextQuestionIndex = 0;
var score = 0;


// function just to list question and options
function nextQuestion() {
    var q = questions[nextQuestionIndex];
    // replace the question/choice div with the appropriate question and choices
    question.innerHTML = q.question;
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

function startQuiz() {
    event.preventDefault();
    // display the first question
    start.style.display = "none";
    nextQuestion();
    quiz.style.display = "inline-block";
    Timer();
    setTime();
}

// more variables for timer
var secondsLeft = 300;
var timerInterval;
var timeEl = document.getElementById("counter");


function setTime() {
    timerInterval = setInterval(Timer, 1000);
}
// when Start Quiz button is clicked, then start timer
function Timer() {
    secondsLeft--;

    timeEl.textContent = secondsLeft;
    // if time is 0, clear time interval and go to score page
    if (secondsLeft === 0) {
        clearInterval(timerInterval);
        setTimeout(renderScore, 1000);
    }
}

// run the user's answer through this function to then check using conditional statements
function checkAnswer(event) {
    event.preventDefault();

    document.getElementById("correct").classList.add("hidden")
    document.getElementById("incorrect").classList.add("hidden")
    // events need to have targets
    const answer = event.currentTarget.id;
    // if question is correct, then go to next question
    if (questions[nextQuestionIndex].correct == answer) {
        correctAnswer();
    } else {
        incorrectAnswer();
    }
    // if not the last question, then continue with next question
    //button doesn't go to next question, doesn't increment this 'if else' statement is inside a function, have to call it outside
    goToNextQuestion();
}

function goToNextQuestion() {
    if (nextQuestionIndex < lastQuestion) {
        // go to next question
        nextQuestionIndex++;
        // ask the next question
        nextQuestion();
    } else {
        // stop the timer and show the score
        clearInterval(Timer)
        finalScore();
    }
}

function skipQuestion() {
    incorrectAnswer();
    goToNextQuestion();
}

// if correct, display Correct!
function correctAnswer() {
    document.getElementById("correct").classList.remove("hidden");
    score++;
    console.log(score);
    nextQuestion();
}

// if correct, display Inorrect!
function incorrectAnswer() {
    document.getElementById("incorrect").classList.remove("hidden");
    // take 10 seconds away from timer
    var w = secondsLeft -= 50;
    timeEl.textContent = w;

    console.log("wrong")
    nextQuestion();
}


function finalScore() {
    // display the last page of the quiz to show score
    quiz.style.display = "none";
    document.getElementById("finalScores").style.display = "block";

    // stop timer
    clearInterval(timerInterval);
    setTimeout(finalScore, 1000);

    // show score
    var scoreEl = score;
    document.querySelector("#score").textContent = scoreEl;
}


function saveHighscore() {
    // get value of input box
    var initials = initialsInput.value.trim();

    // make sure value wasn't empty
    if (initials !== "") {
        // get saved scores from localstorage, or if not any, set to empty array
        var highscores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];
        // format new score object for current user
        var newScore = {
            score: score,
            initials: initials
        };

        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        
        // redirect to next page
        window.location.href = "scores.html";
    }
}


hsForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var initialsText = initialsInput.value.trim();
    // Return from function early if submitted value is blank
    if (initialsText === "") {
        return;
    }

    saveHighscore();
});


// add event listeners for all buttons
start.addEventListener("click", startQuiz);
choiceA.addEventListener("click", checkAnswer);
choiceB.addEventListener("click", checkAnswer);
choiceC.addEventListener("click", checkAnswer);
choiceD.addEventListener("click", checkAnswer);
next.addEventListener("click", skipQuestion);
