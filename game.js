var PLAYER_1 = 1; 
var PLAYER_2 = 2;

var p1Lives = 3;
var p2Lives = 3;

var firstRandom 	= Math.floor(Math.random()*21);
var secondRandom 	= Math.floor(Math.random()*21);
var operation 		= Math.floor(Math.random()*3);

var turn = PLAYER_1;
var playerAnswer 	= 0;

var prompt = require('sync-prompt').prompt;

function trueAddAnswer () 	{ return (firstRandom + secondRandom) == playerAnswer };
function trueSubAnswer () 	{ return (firstRandom - secondRandom) == playerAnswer };
function trueMultiAnswer () { return (firstRandom * secondRandom) == playerAnswer};
function trueAnswer () 		{ return trueMultiAnswer() || trueSubAnswer() || trueAddAnswer() };

function setNumbers() {
	firstRandom 	= Math.floor(Math.random()*21);
	secondRandom 	= Math.floor(Math.random()*21);
	operation 		= Math.floor(Math.random()*3);
}

function gameLoop () {
	//-----------//
	var playOrNot = prompt("Play? Y/N (if 'N', refresh to restart game)");
	if(playOrNot == "Y") {
		while(p1Lives > 0 && p2Lives > 0) {
			setNumbers();
			chooseMath(); 

			if (turn == PLAYER_1) {
				answerForP1();
			} else {
				answerForP2();
			}	
		}

		p1GameOver();
		p2GameOver();
		
		gameLoop();
	}
}


function chooseMath() {
	if(operation == 1) {
		playerAnswer = prompt(firstRandom + " + " + secondRandom + " = " );
	}
	else if(operation == 2) {
		playerAnswer = prompt(firstRandom + " - " + secondRandom + " = " );
	}
	else {
		playerAnswer = prompt(firstRandom + " * " + secondRandom + " = " );
	}
}


function answerForP1() {
	if ( !trueAnswer() ) {
		p1Lives -= 1;
		console.log("Wrong! Health -1. Player 2, get ready. Yours lives are at:");
	}
	else {
		console.log("Right! Player 2, get ready. Yours lives are at:");
	}
	turn = PLAYER_2;
	console.log(p1Lives);
}

function answerForP2() {
	if ( !trueAnswer() ) {
		p2Lives -= 1;
		console.log("Wrong! Health -1. Player 1, get ready. Yours lives are at:");
	}
	else {
		console.log("Right! Player 1, get ready. Yours lives are at:");
	}
	turn = PLAYER_1;
	console.log(p2Lives);
}


function p1GameOver() {
	if(p1Lives == 0) {
		console.log("Player 2 WINS!");
	}
}

function p2GameOver() {
	if(p2Lives == 0) {
		console.log("Player 1 WINS!");
	}
}

gameLoop();
