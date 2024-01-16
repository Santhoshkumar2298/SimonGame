var buttonColours = ["red", "blue", "purple", "green"];

var pattern = [];
var userClickPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("h2").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".button").click(function () {
  var userColour = $(this).attr("id");
  userClickPattern.push(userColour);

  playSound(userColour);
  animatePress();
  checkAnswer(userClickPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (pattern[currentLevel] === userClickPattern[currentLevel]) {
    if (userClickPattern.length === pattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h2").text("Game Over ! Press any Key to Replay...");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickPattern = [];
  level++;
  $("h2").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  pattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function animatePress(pressedColour) {
  $("#" + pressedColour).addClass("pressed");
  setTimeout(function () {
    $("#" + pressedColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  pattern = [];
  started = false;
}
