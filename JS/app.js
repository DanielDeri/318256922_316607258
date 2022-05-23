var context;
var shape = new Object();
var board;
var score;
var startTime;
var timeElapsed;
var interval;
var canvasHeight;
var canvasWidth;
// var canvasCellCenterOffset;
var canvasCellRadius;
var canvasCell;
var sizeOfBoard
var halfOfBoard;
var gameCompleted;
var lostLife = false;
var firstTime;
// var gameRuning;
var higestScore;
var maxScore;
//settingsDefine:
var settingsCanvas;
var gameTime; //get time
//monsters, moved to pacman
var monstersNum; //from setting
var choseenMonster; //get set from setting - (name, bool) - monster1, monster2
var monsterXYcenter;
var monsterLastMoveArr;
var monsterIntervalToWait;
var monsterIntervalCount;
var monstersImgs;
var monsterStep = 0;
var pacmanStepMonster = 3;
//Static balls(5,15,25)
var ballsNum;
var BallsTextSize;
//the choosen colors:
var ballsRemain;
var color5Ball;
var color15Ball;
var color25Ball;
var ball25Remain;
var ball15Remain;
var ball5Remain;
//moved Bonuscookie (randomlly) (+50)
var bonusCoockieEaten;
var bonusCoockieRemain;
var bonusCoockieIntervalToWait;
var bonusCoockieIntervalCount;
var bonusCoockieI;
var bonusCoockieJ;
var bonusCoockieImg;
var cookieStep = 0;
var pacmanStepCookie = 20;
//static sruprise ( +/- 70 )
var surpriseEaten;
var surpriseRemain;
var surpriseI;
var surpriseJ;
var surpriseImg;
//life cookie:
var cookieLifeEaten;
var cookieLifeRemain;
var cookieLifeI;
var cookieLifeJ;
var cookieLifeImg;
var lifeGameRemain;
//CookieMan:
var pacmanImg;
var pacmanDownImg;
var pacmanLeftImg;
var pacmanUpImg;
var pacmanRemain;
//buttons:
var leftButtonCode;
var upButtonCode;
var righttButtonCode;
var downButtonCode;

//setting in the side:
var userName;
var gameMusic;
//music&sound:
// $(document).ready(function() {
// 	Start();
// });

// stop the game and clear intrval for board update
function Stop() {
	window.clearInterval(interval);
	if (typeof gameMusic !== 'undefined') {
		pauseMusic(gameMusic);
	}
	if (score > higestScore) {
		users_highScore.set(loggedUser, score);
	}
}

// start the game with const intrval for board update
function Start() {
	context = canvas.getContext("2d");
	board = new Array();
	score = 0;
	var cnt = 100;
	// settngs:
	bonusCoockieEaten = false;
	ballsRemain = ballsNum;
	cookieLifeEaten = false;
	pacmanRemain = 1;
	bonusCoockieRemain = 1;
	surpriseRemain = 2;
	cookieLifeRemain = 1;
	lifeGameRemain = 5;
	gameCompleted = false;
	ball25Remain = Math.floor(ballsRemain * 0.1);
	ball15Remain = Math.floor(ballsRemain * 0.3);
	ball5Remain = Math.floor(ballsRemain * 0.6);
	maxScore = bonusCoockieRemain * 50 + ball25Remain * 25 + ball15Remain * 15 + ball5Remain * 5;
	//add images:
	pacmanImg = document.getElementById("CookieMan");
	pacmanUpImg = document.getElementById("CookieManUp");
	pacmanDownImg = document.getElementById("CookieManDown");
	pacmanLeftImg = document.getElementById("CookieManLeft");
	bonusCoockieImg = document.getElementById("BonusCookie");
	surpriseImg = document.getElementById("Surprise");
	cookieLifeImg = document.getElementById("BonusLife");
	gameMusic = document.getElementById("gameAudio");
	startTime = new Date();
	sizeOfBoard = 12;
	halfOfBoard = sizeOfBoard / 2;
	firstTime = true;
	canvasHeight = canvas.height;//600
	canvasWidth = canvas.width;//600
	canvasCell = canvasWidth / sizeOfBoard;//50
	canvasCellRadius = canvasCell / 2;
	BallsTextSize = Math.floor(canvasCellRadius / 2);
	monsterXYcenter = [[0, 0], [0, (sizeOfBoard - 1)], [(sizeOfBoard - 1), 0], [(sizeOfBoard - 1), (sizeOfBoard - 1)]];
	monsterLastMoveArr = [null, null, null, null];
	let randomNum_0_to_7_1 = Math.floor(Math.random() * 8);
	let randomNum_0_to_7_2 = Math.floor(Math.random() * 8);
	let randomNum_0_to_7_3 = Math.floor(Math.random() * 8);
	for (var i = 0; i < sizeOfBoard; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < sizeOfBoard; j++) {
			if (// RANDOM:
				(i == (randomNum_0_to_7_1) && j == 1) ||
				(i == (randomNum_0_to_7_2) && j == 1) ||
				(i == (randomNum_0_to_7_3) && j == 1) ||
				//spaciel wall
				(i == 2 && j == 4) ||
				(i == 3 && j == 4) ||
				(i == 4 && j == 4) ||
				(i == 5 && j == 4) ||
				(i == 6 && j == 4) ||
				(i == 7 && j == 4) ||
				(i == 8 && j == 4) ||
				(i == 9 && j == 4) ||
				(i == (sizeOfBoard - 4) && j == (halfOfBoard - 2)) ||
				(i == (sizeOfBoard - 4) && j == (halfOfBoard - 1)) ||
				(i == (sizeOfBoard - 4) && j == (halfOfBoard)) ||
				(i == (halfOfBoard - 3) && j == (halfOfBoard - 2)) ||
				(i == (halfOfBoard - 3) && j == (halfOfBoard - 1)) ||
				(i == (halfOfBoard - 3) && j == (halfOfBoard)) ||
				//button wall
				(i == 1 && j == (sizeOfBoard - 2)) ||
				(i == 2 && j == (sizeOfBoard - 2)) ||
				(i == 3 && j == (sizeOfBoard - 2)) ||
				(i == 4 && j == (sizeOfBoard - 2)) ||
				(i == 5 && j == (sizeOfBoard - 2)) ||
				(i == 7 && j == (sizeOfBoard - 2))) {
				board[i][j] = "wall";//4
			}
			else if (i == 5 && j == 5) {
				bonusCoockieRemain--;
				bonusCoockieI = i;
				bonusCoockieJ = j;
				board[i][j] = "bonusCoockie";
			}
			// monsters:
			else if ((i == 0 && j == 0) ||
				(i == 0 && j == (sizeOfBoard - 1)) ||
				(i == (sizeOfBoard - 1) && j == 0) ||
				(i == (sizeOfBoard - 1) && j == (sizeOfBoard - 1))) {
				board[i][j] = "monster" //1
			}
			else {
				var randomNum = Math.random();
				//balls:
				if (randomNum <= (1.0 * ballsRemain) / cnt) {
					var randomNum_0_to_9 = Math.floor(Math.random() * 10);
					//maby 9
					if (randomNum_0_to_9 >= 8 && ball25Remain > 0) {
						ballsRemain--;
						ball25Remain--;
						board[i][j] = "color25Ball";
					}
					//maby 7
					else if (randomNum_0_to_9 >= 6 && ball15Remain > 0) {
						ballsRemain--;
						ball15Remain--;
						board[i][j] = "color15Ball";
					}
					else if (randomNum_0_to_9 > 3 && ball5Remain > 0) {
						ballsRemain--;
						ball5Remain--;
						board[i][j] = "color5Ball";
					}
					else {
						board[i][j] = "empty";
					}
				}
				//extras:		
				else if (randomNum <= (1.0 * (surpriseRemain + cookieLifeRemain + ballsRemain)) / cnt) {
					if (randomNum_0_to_9 >= 2 && cookieLifeRemain > 0) {
						cookieLifeRemain--;
						cookieLifeI = i;
						cookieLifeJ = j;
						board[i][j] = "cookieLife";
					}
					else if (randomNum_0_to_9 >= 1 && surpriseRemain > 0) {
						surpriseRemain--;
						surpriseI = i;
						surpriseJ = j;
						board[i][j] = "surprise";
					}
					else {
						board[i][j] = "empty";
					}
				}
				//pacman:								
				else if (randomNum < (1.0 * (surpriseRemain + cookieLifeRemain + pacmanRemain + ballsRemain) / cnt)) {
					shape.i = i;
					shape.j = j;
					shape.direction = "Right";
					pacmanRemain--;
					board[i][j] = "pacman";
				}
				else {
					board[i][j] = "empty";
				}
				cnt--;
			}
		}
	}
	while (pacmanRemain > 0) {
		let emptyCellForPacman = findRandomEmptyCell(board);
		shape.i = emptyCellForPacman[0];
		shape.j = emptyCellForPacman[1];
		board[shape.i][shape.j] = "pacman";
		pacmanRemain--;
	}
	while (ballsRemain > 0) {
		let emptyCellForBall = findRandomEmptyCell(board);
		if (ball25Remain > 0) {
			board[emptyCellForBall[0]][emptyCellForBall[1]] = "color25Ball";
			ball25Remain--;
			ballsRemain--;
		}
		if (ball15Remain > 0) {
			board[emptyCellForBall[0]][emptyCellForBall[1]] = "color15Ball";
			ball15Remain--;
			ballsRemain--;
		}
		else {
			board[emptyCellForBall[0]][emptyCellForBall[1]] = "color5Ball";
			ball5Remain--;
			ballsRemain--;
		}
	}
	while (surpriseRemain > 0) {
		let emptyCellForSurprise = findRandomEmptyCell(board);
		board[emptyCellForSurprise[0]][emptyCellForSurprise[1]] = "surprise";
		surpriseRemain--;
	}
	if (cookieLifeRemain > 0) {
		let emptyCellForCookieLife = findRandomEmptyCell(board);
		board[emptyCellForCookieLife[0]][emptyCellForCookieLife[1]] = "cookieLife";
		cookieLifeRemain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	// gameRuning = true;
	interval = setInterval(UpdatePosition, 100);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * (sizeOfBoard - 1) + 1);
	var j = Math.floor(Math.random() * (sizeOfBoard - 1) + 1);
	while (board[i][j] != "empty") {
		i = Math.floor(Math.random() * (sizeOfBoard - 1) + 1);
		j = Math.floor(Math.random() * (sizeOfBoard - 1) + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[upButtonCode]) {
		return "up";
	}
	if (keysDown[downButtonCode]) {
		return "down";
	}
	if (keysDown[leftButtonCode]) {
		return "left";
	}
	if (keysDown[righttButtonCode]) {
		return "right";
	}
}
function Draw() {
	canvas.width = canvas.width; //clean board
	context.rect(0, 0, canvasWidth, canvasHeight);
	context.fillStyle = "white";
	context.fill();
	lblScore.value = score;
	lblTime.value = timeElapsed;
	for (var i = 0; i < sizeOfBoard; i++) {
		for (var j = 0; j < sizeOfBoard; j++) {
			var center = new Object();
			center.x = i * canvasCell + canvasCellRadius;
			center.y = j * canvasCell + canvasCellRadius;
			if (board[i][j] === "color25Ball") {
				Draw25Ball(center.x, center.y);
			}
			else if (board[i][j] === "color15Ball") {
				Draw15Ball(center.x, center.y);
			}
			else if (board[i][j] === "color5Ball") {
				Draw5Ball(center.x, center.y);
			}
			else if (board[i][j] === "pacman") {
				DrawPacman(center.x, center.y);
			}
			else if (board[i][j] === "bonusCoockie") {
				DrawBonusCoockie(center.x, center.y);
			}
			else if (board[i][j] === "cookieLife") {
				DrawCoockieLife(center.x, center.y);
			}
			else if (board[i][j] === "surprise") {
				DrawSurprise(center.x, center.y);
			}
			else if (board[i][j] === "wall") {
				context.beginPath();
				context.rect(center.x - canvasCellRadius, center.y - canvasCellRadius, canvasCell, canvasCell);
				context.fillStyle = "grey";
				context.fill();
			}
		}
	}
	DrawAllMonsters();
}

//drawing balls:
function Draw25Ball(centerX, centerY) {
	context.beginPath();
	context.arc(centerX, centerY, canvasCell / 3, 0, 2 * Math.PI); // circle
	context.fillStyle = color25Ball; //color
	context.fill();
	context.font = 'bolder ' + BallsTextSize + 'pt Arial';
	context.fillStyle = 'white';
	context.textAlign = 'center';
	context.fillText('+25', centerX, centerY + canvasCellRadius / 10);

}

function Draw15Ball(centerX, centerY) {
	context.beginPath();
	context.arc(centerX, centerY, canvasCell / 3, 0, 2 * Math.PI); // circle
	context.fillStyle = color15Ball; //color
	context.fill();
	context.font = 'bolder ' + BallsTextSize + 'pt Arial';
	context.fillStyle = 'white';
	context.textAlign = 'center';
	context.fillText('+15', centerX, centerY + canvasCellRadius / 10);
}

function Draw5Ball(centerX, centerY) {
	context.beginPath();
	context.arc(centerX, centerY, canvasCell / 3, 0, 2 * Math.PI); // circle
	context.fillStyle = color5Ball; //color
	context.fill();
	context.font = 'bolder ' + BallsTextSize + 'pt Arial';
	context.fillStyle = 'white';
	context.textAlign = 'center';
	context.fillText('+5', centerX, centerY + canvasCellRadius / 10);
}

function DrawPacman(centerX, centerY) {
	if (shape.direction == "Right") {
		context.drawImage(pacmanImg, centerX - canvasCellRadius / 1.5, centerY - canvasCellRadius / 1.5, canvasCellRadius * 1.5, canvasCellRadius * 1.5);
	}
	if (shape.direction == "Left") {
		context.drawImage(pacmanLeftImg, centerX - canvasCellRadius / 1.5, centerY - canvasCellRadius / 1.5, canvasCellRadius * 1.5, canvasCellRadius * 1.5);
	}
	if (shape.direction == "Down") {
		context.drawImage(pacmanDownImg, centerX - canvasCellRadius / 1.5, centerY - canvasCellRadius / 1.5, canvasCellRadius * 1.5, canvasCellRadius * 1.5);
	}
	else if (shape.direction == "Up") {
		context.drawImage(pacmanUpImg, centerX - canvasCellRadius / 1.5, centerY - canvasCellRadius / 1.5, canvasCellRadius * 1.5, canvasCellRadius * 1.5);
	}
}

function DrawBonusCoockie(centerX, centerY) {
	context.drawImage(bonusCoockieImg, centerX - canvasCellRadius / 1.5, centerY - canvasCellRadius / 1.5, canvasCellRadius * 1.5, canvasCellRadius * 1.5);
}

function DrawCoockieLife(centerX, centerY) {
	context.drawImage(cookieLifeImg, centerX - canvasCellRadius / 1.5, centerY - canvasCellRadius / 1.5, canvasCellRadius * 1.5, canvasCellRadius * 1.5);
}

function DrawSurprise(centerX, centerY) {
	context.drawImage(surpriseImg, centerX - canvasCellRadius / 1.5, centerY - canvasCellRadius / 1.5, canvasCellRadius * 1.5, canvasCellRadius * 1.5);
}

function DrawAllMonsters() {
	for (let i = 0; i < monstersNum; i++) {
		//monsterXYcenter = [[0,0],[0,(sizeOfBoard-1)],[(sizeOfBoard-1),0],[(sizeOfBoard-1),(sizeOfBoard-1)]];
		let monsterCenterX = monsterXYcenter[i][0] * canvasCell + canvasCellRadius;
		let monsterCenterY = monsterXYcenter[i][1] * canvasCell + canvasCellRadius;
		DrawMonster(monsterCenterX, monsterCenterY, monstersImgs.get(i + 1));
	}
}

function DrawMonster(centerX, centerY, imgMonster) {
	context.drawImage(imgMonster, centerX - canvasCellRadius / 1.5, centerY - canvasCellRadius / 1.5, canvasCellRadius * 1.5, canvasCellRadius * 1.5);
}

function UpdatePosition() {
	board[shape.i][shape.j] = "empty";
	var x = GetKeyPressed();
	if (x === "up") {
		shape.direction = "Up";
		if (shape.j > 0 && board[shape.i][shape.j - 1] != "wall") {
			shape.j--;
		}
	}
	if (x === "down") {
		shape.direction = "Down";
		if (shape.j < (sizeOfBoard - 1) && board[shape.i][shape.j + 1] != "wall") {
			shape.j++;
		}
	}
	if (x === "left") {
		shape.direction = "Left";
		if (shape.i > 0 && board[shape.i - 1][shape.j] != "wall") {
			shape.i--;
		}
	}
	if (x === "right") {
		shape.direction = "Right";
		if (shape.i < (sizeOfBoard - 1) && board[shape.i + 1][shape.j] != "wall") {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == "color5Ball") {
		score += 5;
	}
	else if (board[shape.i][shape.j] == "color15Ball") {
		score += 15;
	}
	else if (board[shape.i][shape.j] == "color25Ball") {
		score += 25;
	}
	else if (board[shape.i][shape.j] == "bonusCoockie") {
		score += 50;
		bonusCoockieEaten = true;
	}
	else if (board[shape.i][shape.j] == "surprise") {
		rand = Math.floor(Math.random() * 2);
		if (rand) {
			score += 70;
			maxScore += 70;
		}
		else {
			score -= 70;
			maxScore -= 70;

		}
	}
	if (board[shape.i][shape.j] == "cookieLife") {
		lifeGameRemain++;
		cookieLifeEaten = true;
		updateLifeSetting();
	}
	if (cookieStep < pacmanStepCookie) {
		cookieStep++;
	} else if (!bonusCoockieEaten) {
		UpdateCookieBonusPosition();
		cookieStep = 0;
	}
	board[shape.i][shape.j] = "pacman";

	// Monsters moves 1 step for every 4 pacman steps
	if (monsterStep < pacmanStepMonster) {
		monsterStep++;
	}
	else {
		UpdateMonsterPosition();
		monsterStep = 0;
	}

	var currentTime = new Date();
	timeElapsed = (currentTime - startTime) / 1000;
	//time over
	if (score >= maxScore) {
		// gameRuning = false;
		window.clearInterval(interval);
		alert("Winner!");
		Stop();
		// return;
	}
	if (timeElapsed >= gameTime) {
		window.clearInterval(interval);
		// gameRuning = false;
		//looser
		if (score < 100) {
			let notWinnerMessage = "You are Better Than " + score.toString() + " points!♥";
			alert(notWinnerMessage);
			// return;
		}
		//winner
		else {
			alert("Winner!");
			// return;
		}
		Stop();
	}
	else {
		if ((monstersNum > 0 && monsterXYcenter[0][0] == shape.i && monsterXYcenter[0][1] == shape.j) ||
			(monstersNum > 1 && monsterXYcenter[1][0] == shape.i && monsterXYcenter[1][1] == shape.j) ||
			(monstersNum > 2 && monsterXYcenter[2][0] == shape.i && monsterXYcenter[2][1] == shape.j) ||
			(monstersNum > 3 && monsterXYcenter[3][0] == shape.i && monsterXYcenter[3][1] == shape.j)
		) {
			lifeGameRemain--;
			score -= 10;
			maxScore -= 10;
			if (lifeGameRemain <= 0) {
				window.clearInterval(interval);
				updateLifeSetting();
				window.alert("loser!");
				// gameRuning = false;
				Stop();
				// return;
			}
			else {
				board[shape.i][shape.j] = "empty";
				let emptyCellForPacman = findRandomEmptyCell(board);
				shape.i = emptyCellForPacman[0];
				shape.j = emptyCellForPacman[1];
				shape.direction = "Right";
				board[shape.i][shape.j] = "pacman";
				monsterXYcenter = [[0, 0], [0, (sizeOfBoard - 1)], [(sizeOfBoard - 1), 0], [(sizeOfBoard - 1), (sizeOfBoard - 1)]];
				monsterLastMoveArr = [null, null, null, null];
				updateLifeSetting();
				// update cookieBonus position
				if (!bonusCoockieEaten) {
					board[bonusCoockieI][bonusCoockieJ] = "empty";
					bonusCoockieI = 5;
					bonusCoockieJ = 5;
					board[5][5] = "bonusCoockie";
				}
				lostLife = true;
			}
		}
		if (lostLife) {
			lostLife = false;
			window.clearInterval(interval);
			//music
			let start = new Date().getTime();
			let end = 0;
			while ((end - start) < 2000) {
				end = new Date().getTime();
			}
			interval = setInterval(UpdatePosition, 200);
		}
		else if (firstTime) {
			Draw();
			firstTime = false;
			//music
			// $("#music").unbind("click").on("click", function () {
			// 	$("#video").get(0).play();
			// });
			window.clearInterval(interval);
			setTimeout(function () { interval = setInterval(UpdatePosition, 200); }, 1000);
			setTimeout(function () { playMusic(gameMusic); }, 1000);
		}
		else {
			Draw();
		}
	}
}
function playMusic(src) {
	src.play();
}

function pauseMusic(src) {
	src.pause();
}
function updateLifeSetting() {
	let imgNumTemp = lifeGameRemain;
	let lifeToAdd;
	if (cookieLifeEaten) {
		lifeToAdd = "life" + imgNumTemp;
		// lifeToAdd.style.display = "block";
		document.getElementById(lifeToAdd).style.display = "block";
		cookieLifeEaten = false;
	}
	else {
		lifeToAdd = "life" + (imgNumTemp + 1);
		document.getElementById(lifeToAdd).style.display = "none";
	}
}

function UpdateCookieBonusPosition() {
	let emptyCell = findRandomEmptyCell(board);
	board[bonusCoockieI][bonusCoockieJ] = "empty";
	bonusCoockieI = emptyCell[0];
	bonusCoockieJ = emptyCell[1];
	board[bonusCoockieI][bonusCoockieJ] = "bonusCoockie";
}

// function newGameHandler() {
// 	// stop currect game
// 	Stop();
// 	// switch to settings div
// 	$("#game_page").hide();
// 	$("#game_setting").show();
// }

function gameToSettings() {
	Stop();
	$(game_page).hide();
	resetSettings();
	$(setting_page).show();
}

function UpdateMonsterPosition() {
	let pacX = shape.i;
	let pacY = shape.j;
	// X=I=COL AND Y=J=ROW
	for (let i = 0; i < monstersNum; i++) {
		let monsterX = monsterXYcenter[i][0];
		let monsterY = monsterXYcenter[i][1];
		// monsterMovesArr fixed steps = [0-UP, 1-DOWN, 2-LEFT, 3-RIGHT]
		let monsterMovesArr = [];

		// 	 monster direction = "Up"
		if (monsterY > 0 && board[monsterX][monsterY - 1] != "wall" && !(monsterLastMoveArr[i] === "UP")) {
			monsterMovesArr[0] = ManhattanDistance(pacX, pacY, monsterX, monsterY - 1);
		}
		else {
			monsterMovesArr[0] = Number.POSITIVE_INFINITY;
		}

		// 	 monster direction = "Down"
		if (monsterY < (sizeOfBoard - 1) && board[monsterX][monsterY + 1] != "wall" && !(monsterLastMoveArr[i] === "DOWN")) {
			monsterMovesArr[1] = ManhattanDistance(pacX, pacY, monsterX, monsterY + 1);
		}
		else {
			monsterMovesArr[1] = Number.POSITIVE_INFINITY;
		}

		//  monster direction = "Left"
		if (monsterX > 0 && board[monsterX - 1][monsterY] != "wall" && !(monsterLastMoveArr[i] === "LEFT")) {
			monsterMovesArr[2] = ManhattanDistance(pacX, pacY, monsterX - 1, monsterY);
		}
		else {
			monsterMovesArr[2] = Number.POSITIVE_INFINITY;
		}

		//  monster direction = "Right"
		if (monsterX < (sizeOfBoard - 1) && board[monsterX + 1][monsterY] != "wall" && !(monsterLastMoveArr[i] === "RIGHT")) {
			monsterMovesArr[3] = ManhattanDistance(pacX, pacY, monsterX + 1, monsterY);
		}
		else {
			monsterMovesArr[3] = Number.POSITIVE_INFINITY;
		}

		let nextStepIndex = monsterMovesArr.indexOf(Math.min.apply(null, monsterMovesArr));
		// move UP
		if (nextStepIndex == 0) {
			monsterXYcenter[i][1]--;
			monsterMovesArr[i] = "DOWN";
		}
		// move DOWN
		else if (nextStepIndex == 1) {
			monsterXYcenter[i][1]++;
			monsterMovesArr[i] = "UP";
		}
		// move LEFT
		else if (nextStepIndex == 2) {
			monsterXYcenter[i][0]--;
			monsterMovesArr[i] = "RIGHT";
		}
		// move RIGHT
		else if (nextStepIndex == 3) {
			monsterXYcenter[i][0]++;
			monsterMovesArr[i] = "LEFT";
		}
	}
}

// calculate ManhattanDistance between monster and pacman
function ManhattanDistance(pacX, pacY, monsterX, monsterY) {
	return Math.abs(pacX - monsterX) + Math.abs(pacY - monsterY);
}

