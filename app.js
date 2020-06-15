//declare variables
var score= 0;
var questinIndex = 0;

//variables needed or timing to work
var currentTime= document.querySelector("#currentTime");
var timer= document.querySelector("#startTime");
var questionDiv =document.querySelector("#questionDiv");
var wrapper= document.querySelector("#wrapper");

//if user is given 15 seconds to answer each question
var secondsLeft= 76;
//holding interval time
var holdInverval= 0;
//hold time penalty
var penalty= 10;
//create new element
var ulCreate= document.createElement("ul");

//trigger timer on button click show user on screen
timer.addEventListenr("click",function () {
  //timer originally set to zero, check if its zero
  if (holdInterval ===0) {
    holdInterval= setInterval(function () {
      secondsLeft--;
      currentTime.textContent= "Time:  " + secondsLeft;
      
      
     if (secondsLeft <= 0) {
       clearInterval(holdInterval);
       allDone();
       currentTime.text.Content= "Time's up!";
     }
    }, 1000);
  }
  render(questionIndex);
});
//next section renders questions and choices to page
function render(questionIndex) {
  //clear out existing data
  questionsDiv.innerHTML= "";
  ulCreate.innerHTML= "";
  //for loops to loop through all the information in an array
  for (var i=0; i <questions.length; i++) {
    //append question titles
    var userQuestions= questions[questionsIndex].title;
    var userChoices= question[questionsIndex].choices;
    questionsDiv.textContent= userQuestion;
  }
  //new for each question choices
  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent= newItem;
    questionsDiv.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", (compare));
  })
}
//event to compare choice with answer
    
    
