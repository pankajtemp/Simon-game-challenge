var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function flash(colour) {
  $("#" + colour).fadeIn(40).fadeOut(40).fadeIn(40);
}

function animatePress(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function() {
    $("#" + colour).removeClass("pressed");
  }, 100);
}

function playSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function newSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  flash(randomChosenColour);
  playSound(randomChosenColour);
}

$(".btn").click(function(event) {
  var userChosenColour = event.currentTarget.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(level);
});

$(document).keydown(function() {
  if (!started) {
    started = true;
    newSequence();
  }
});

function checkAnswer(currentLevel) {
  var index = userClickedPattern.length - 1;
  if (userClickedPattern[index] === gamePattern[index]) {
    console.log("Success");
    if (index + 1 === currentLevel) {
      userClickedPattern = [];
      setTimeout(newSequence, 1000);
    }
  } else {
    console.log("Wrong");
    var audio = new Audio("sounds/wrong.mmp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass(("game-over"));
    }, 200);
    $("#level-title").text("Game over! Press a key to restart");
    startOver();
  }
}

function startOver() {
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
