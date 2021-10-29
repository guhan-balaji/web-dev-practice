
var randNum1 = Math.floor(Math.random() * 6) + 1;
var randNum2 = Math.floor(Math.random() * 6) + 1;

document.querySelector(".img1").setAttribute("src", "images/dice" + randNum1 + ".png");
document.querySelector(".img2").setAttribute("src", "images/dice" + randNum2 + ".png");

if (randNum1 > randNum2) {
    document.querySelector("h1").textContent = "Player 1 wins.";
}
else if (randNum2 > randNum1) {
    document.querySelector("h1").textContent = "Player 2 wins.";
}
else {
    document.querySelector("h1").textContent = "A Tie. Roll again.";
}


