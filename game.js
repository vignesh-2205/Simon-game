var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = 0;
var level = 1;

//triggering the start of game
$(document).on('keydown', function() {
  if (started === 0) {
    nextSequence();
    started = 1;
  }
});

// noting down user button clicks
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

// function to generate random numbers
function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("LEVEL " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;

}


// function to play sound of each colours
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// function to trigger pressing animation of button
function animatePress(currentColour) {
  $('#' + currentColour).addClass("pressed");
  setTimeout(function() {
    $('#' + currentColour).removeClass("pressed");
  }, 100);
}



//function to check the answer
function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("great success");
  if (userClickedPattern.length === gamePattern.length) { //1s delay for the next sequence to trigger
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
      $("#level-title").text("Game Over, Press any key to restart");
      startOver();
    }
  }

  // function to restart the game
  function startOver(){
    level = 1;
    started = 0;
    gamePattern=[];
  }
