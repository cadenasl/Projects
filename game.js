var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = 0;
var level = 0;
// this code registers the first click to initialize the game
$(document).keypress(function() {
  if (started == 0) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
     started = 1;
  }
});


$(".btn").click(function() {

  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  animatePress(userChosenColor);

  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length -1);

  //calls the function to check checkAnswer

});

function playSound(name){
  var audio = new Audio('sounds/'+ name+'.mp3');
  audio.play();

}

function startOver(){
   gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = 0;

  $("#level-title").text("Press A key to start");


}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed")
  setTimeout(function(){$('#'+currentColor).removeClass("pressed");}, 10)

}
function nextSequence(){
  ++level;
$("#level-title").text("Level " + level);
var randomNumber = Math.floor(Math.random()*4);
 var randomChosenColor = buttonColors[randomNumber];
 gamePattern.push(randomChosenColor);
 $('#' + randomChosenColor).fadeOut();
 setTimeout(function(){$('#'+randomChosenColor).fadeIn();}, 10);
 playSound(randomChosenColor);
}

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
{console.log("correct");

  if (userClickedPattern.length === gamePattern.length){
  setTimeout(nextSequence(),10);
  userClickedPattern = [];
}
}
else{console.log("incorrect");
var wrongAudio = new Audio("sounds/wrong.mp3");
wrongAudio.play();
$("body").addClass("game-over");
setTimeout(function(){$("body").removeClass("game-over");},200);
$("h1").text("Game Over, Press Any key to Restart");

startOver();
}}
