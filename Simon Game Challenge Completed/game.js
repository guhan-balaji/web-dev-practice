// jshint esversion: 6

var gamePattern = [];
var userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
level = 0;
started = false;

$(".btn").click(function (e) {
  var userChosenColour = e.target.id;
  sound(userChosenColour);
  animate(userChosenColour);

  userClickedPattern.push(userChosenColour);
});

$(document).keypress(function (e) {
    if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  sound(randomChosenColour);

  level++;
  $('#level-title').html('level ' + level);
}

function animate(key) {
  $("#" + key).addClass("pressed");
  setTimeout(() => {
    $("#" + key).removeClass("pressed");
  }, 100);
}

function sound(key) {
  var audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
}