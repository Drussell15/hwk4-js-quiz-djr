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

