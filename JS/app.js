var context;
var shape = new Object();
var board;
var score;
var startTime;
var timeElapsed;
var interval;
var canvasHeight;
var canvasWidth;
var canvasCellCenterOffset;
var canvasCellRadius;
var canvasCell;
var sizeOfBoard
var halfOfBoard;
// var lostLife = false;
var firstTime;
var gameRuning;
var higestScore;
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

//Static balls(5,15,25)
var ballsNum; 
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
//static sruprise ( +/- 70 )
var surpriseEaten;
var surpriseRemain;
var surpriseI;
var surpriseJ;
var surpriseImg;
//life cookie:
var lifesCancas;
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
//music&sound:
// $(document).ready(function() {
// 	Start();
// });

function Start() {
	context = canvas.getContext("2d");
	board = new Array();
	score = 0;
	var cnt = 100;
	//to change: ballsNum,monstersNum,
	// settngs:
	ballsNum = 60;
	// var balls_remain = ballsNum;
	// var pacman_remain = 1;
	// var cookies_bonus_remain = 1
	// var surprises_remain = 2;
	// var lifes_remain = 1;
	// var ball5_remain = Math.floor(balls_remain * 0.1);
	// var ball15_remain = Math.floor(balls_remain * 0.3);
	// var ball25_remain = Math.floor(balls_remain * 0.6);
	ballsRemain = ballsNum;
	cookieLifeEaten = false;
	pacmanRemain = 1;
	bonusCoockieRemain = 1;
	surpriseRemain = 2;
	cookieLifeRemain = 1;
	lifeGameRemain = 5;
	ball25Remain = Math.floor(ballsRemain * 0.6);
	ball15Remain = Math.floor(ballsRemain * 0.3);
	ball5Remain = Math.floor(ballsRemain * 0.1);
	//add images:
	pacmanImg = document.getElementById("CookieMan");
	pacmanUpImg = document.getElementById("CookieManUp");
	pacmanDownImg = document.getElementById("CookieManDown");
	pacmanLeftImg = document.getElementById("CookieManLeft");
	bonusCoockieImg = document.getElementById("BonusCookie");
	surpriseImg = document.getElementById("Surprise");
	cookieLifeImg = document.getElementById("BonusLife");

	startTime = new Date();
	monstersNum = 2;
	var monsters_remain = monstersNum;
	
	higestScore = 0;
	// var monsters_set_idInInx_bool = monsters;
	sizeOfBoard = 12;
	halfOfBoard = sizeOfBoard/2;
	firstTime = true;
	canvasHeight = canvas.height;//600
	canvasWidth = canvas.width;//600
	canvasCell = canvasWidth/sizeOfBoard;//50
	canvasCellCenterOffset = canvasCell/2
	canvasCellRadius = canvasCell/2;

	let randomNum_0_to_7_1 = Math.floor(Math.random() * 8);
	let randomNum_0_to_7_2 = Math.floor(Math.random() * 8);
	let randomNum_0_to_7_3 = Math.floor(Math.random() * 8);
	for (var i = 0; i < sizeOfBoard; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < sizeOfBoard; j++) {
			if (// RANDOM:
				(i == (randomNum_0_to_7_1) && j == 1 ) ||
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
				(i == (sizeOfBoard-4) && j == (halfOfBoard-2)) ||
				(i == (sizeOfBoard-4) && j == (halfOfBoard-1))||
				(i == (sizeOfBoard-4) && j == (halfOfBoard)) ||
				(i == (halfOfBoard-3) && j == (halfOfBoard-2)) ||
				(i == (halfOfBoard-3) && j == (halfOfBoard-1)) ||
				(i == (halfOfBoard-3) && j == (halfOfBoard)) ||
				//button wall
				(i == 1 && j == (sizeOfBoard-2)) ||
				(i == 2 && j == (sizeOfBoard-2)) ||
				(i == 3 && j == (sizeOfBoard-2)) ||
				(i == 4 && j == (sizeOfBoard-2)) ||
				(i == 5 && j == (sizeOfBoard-2)) ||
				(i == 7 && j == (sizeOfBoard-2))) 
				{
				board[i][j] = "wall";//4
				}
				// monsters:
			// else if((i == 0 && j == 0)||
			// 	(i == 0 && j == (sizeOfBoard-1))||
			// 	(i == (sizeOfBoard-1) && j == 0)||
			// 	(i == (sizeOfBoard-1) && j == (sizeOfBoard-1))){
			// 	board[i][j] = "" //1
			// 	// board[i][j] = "monsterHere";
			// 	}
			else{
				var randomNum = Math.random();
				//balls:
				if (randomNum <= (1.0 * ballsRemain) / cnt) {
					var randomNum_0_to_9 = Math.floor(Math.random() * 10);
					//maby 9
					if(randomNum_0_to_9 >= 8 && ball25Remain > 0){
						ballsRemain--;
						ball25Remain--;
						// board[i][j] = 1;
						board[i][j] = "color25Ball";
					}
					//maby 7
					else if(randomNum_0_to_9 >= 6 && ball15Remain > 0){
						ballsRemain--;
						ball15Remain--;
						board[i][j] = "color15Ball";
						// board[i][j] = 1;
					}
					else if(randomNum_0_to_9 > 3 && ball5Remain > 0){
						ballsRemain--;
						ball5Remain--;
						board[i][j] = "color5Ball";
						// board[i][j] = 1;
					}
					// else{
						// board[i][j] = "empty";
					// 	board[i][j] = 0;
					// }
				}
				//extras:		
				else if (randomNum <= (1.0 * (bonusCoockieRemain + surpriseRemain + cookieLifeRemain + ballsRemain)) / cnt) {
				// 	let randomNum_0_to_9_sec = Math.floor(Math.random() * 10);
					if (randomNum_0_to_9 >=3 && bonusCoockieRemain > 0){
						bonusCoockieRemain--;
						bonusCoockieI = i;
						bonusCoockieJ = j;
						board[i][j] = "bonusCoockie";
					}			
					else if(randomNum_0_to_9 >=2 && cookieLifeRemain > 0){
						cookieLifeRemain--;
						cookieLifeI = i;
						cookieLifeJ = j;
						board[i][j] = "cookieLife";
					}
					else if(randomNum_0_to_9 >= 1 && surpriseRemain > 0){
						surpriseRemain--;
						surpriseI = i;
						surpriseJ = j;
						board[i][j] = "surprise";
					}
				}
				//pacman:								
				else if(randomNum < (1.0 * (bonusCoockieRemain + surpriseRemain + cookieLifeRemain + pacmanRemain + ballsRemain) / cnt)) {
					shape.i = i;
					shape.j = j;
					shape.direction = "Right";
					pacmanRemain--;
					board[i][j] = "pacman"; //pacman 2
					// board[i][j] = 2;
				}
				else{
						board[i][j] = "empty";
						// board[i][j] = 0;
					}
				cnt--;
			}
		}
	}
	while (pacmanRemain > 0){
		let emptyCellForPacman = findRandomEmptyCell(board);
		shape.i = emptyCellForPacman[0];
		shape.j = emptyCellForPacman[1];
		board[shape.i][shape.j] = "pacman";
		pacmanRemain--;
	}
	while (ballsRemain > 0) {
		let emptyCellForBall = findRandomEmptyCell(board);
		if(ball25Remain > 0){
			board[emptyCellForBall[0]][emptyCellForBall[1]] = "color25Ball";
			ball25Remain--;
			ballsRemain--;
		}
		if(ball15Remain > 0){
			board[emptyCellForBall[0]][emptyCellForBall[1]] = "color15Ball";
			ball15Remain--;
			ballsRemain--;
		}
		if(ball5Remain > 0){
			board[emptyCellForBall[0]][emptyCellForBall[1]] = "color5Ball";
			ball5Remain--;
			ballsRemain--;
		}
	}
	while (surpriseRemain > 0){
		let emptyCellForSurprise = findRandomEmptyCell(board);
		board[emptyCellForSurprise[0]][emptyCellForSurprise[1]] = "surprise";
		surpriseRemain--;
	}
	if (bonusCoockieRemain > 0){
		let emptyCellForBonusCoockie = findRandomEmptyCell(board);
		bonusCoockieI = emptyCellForSurprise[0];
		bonusCoockieJ = emptyCellForSurprise[1];
		board[emptyCellForBonusCoockie[0]][emptyCellForBonusCoockie[1]] = "bonusCoockie";
		bonusCoockieRemain--;
	}
	if (cookieLifeRemain > 0){
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
	interval = setInterval(UpdatePosition, 150);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * (sizeOfBoard-1) + 1);
	var j = Math.floor(Math.random() * (sizeOfBoard-1) + 1);
	while (board[i][j] != "empty") {
		i = Math.floor(Math.random() * (sizeOfBoard-1) + 1);
		j = Math.floor(Math.random() * (sizeOfBoard-1) + 1);
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
	// canvas.fillStyle = "green";
	// context.fillRect(0,0,canvasWidth,canvasHeight);
	context.rect(0,0,canvasWidth,canvasHeight);
	context.fillStyle = "#b3e0ff";
	context.fill();
	lbHighScore.value = higestScore;
	lblScore.value = score;
	lblTime.value = timeElapsed;
	for (var i = 0; i < sizeOfBoard; i++) {
		for (var j = 0; j < sizeOfBoard; j++) {
			var center = new Object();
			center.x = i * canvasCell + canvasCellCenterOffset;
			center.y = j * canvasCell + canvasCellCenterOffset;
			if (board[i][j] === "color25Ball"){
				Draw25Ball(center.x,center.y);
			}
			else if (board[i][j] === "color15Ball"){
				Draw15Ball(center.x,center.y);
			}
			else if (board[i][j] === "color5Ball"){
				Draw5Ball(center.x,center.y);
			}
			else if (board[i][j] === "pacman"){
				DrawPacman(center.x,center.y);
			}
			else if (board[i][j] === "bonusCoockie"){
				DrawBonusCoockie(center.x,center.y);
			}
			else if ( board[i][j] === "cookieLife"){
				DrawCoockieLife(center.x,center.y);
			}
			else if ( board[i][j] === "surprise"){
				DrawSurprise(center.x,center.y);
			}
			else if (board[i][j] == "wall") {
				context.beginPath();
				context.rect(center.x - canvasCellRadius, center.y - canvasCellRadius, canvasCell, canvasCell);
				context.fillStyle = "grey"; //color
				context.fill();
			}	
		}
	}
}

//drawing balls:
function Draw25Ball(centerX,centerY){
	context.beginPath();
	context.arc(centerX, centerY, canvasCell/5 , 0, 2 * Math.PI); // circle
	context.fillStyle = color25Ball; //color
	context.fill();
}
function Draw15Ball(centerX,centerY){
	context.beginPath();
	context.arc(centerX, centerY, canvasCell/5 , 0, 2 * Math.PI); // circle
	context.fillStyle = color15Ball; //color
	context.fill();
}
function Draw5Ball(centerX,centerY){
	context.beginPath();
	context.arc(centerX, centerY, canvasCell/5 , 0, 2 * Math.PI); // circle
	context.fillStyle = color5Ball; //color
	context.fill();
}
function DrawPacman(centerX,centerY){
	if(shape.direction == "Right"){
		context.drawImage(pacmanImg, centerX-canvasCellRadius/1.5, centerY-canvasCellRadius/1.5, canvasCellRadius*1.5, canvasCellRadius*1.5);
	}
	if(shape.direction == "Left"){
		context.drawImage(pacmanLeftImg, centerX-canvasCellRadius/1.5, centerY-canvasCellRadius/1.5, canvasCellRadius*1.5, canvasCellRadius*1.5);
	}
	if(shape.direction == "Down"){
		context.drawImage(pacmanDownImg, centerX-canvasCellRadius/1.5, centerY-canvasCellRadius/1.5, canvasCellRadius*1.5, canvasCellRadius*1.5);
	}
	else if(shape.direction == "Up"){
		context.drawImage(pacmanUpImg, centerX-canvasCellRadius/1.5, centerY-canvasCellRadius/1.5, canvasCellRadius*1.5, canvasCellRadius*1.5);
	}
}
function DrawBonusCoockie(centerX,centerY){
	context.drawImage(bonusCoockieImg, centerX-canvasCellRadius/1.5, centerY-canvasCellRadius/1.5, canvasCellRadius*1.5, canvasCellRadius*1.5);
}
function DrawCoockieLife(centerX,centerY){
	context.drawImage(cookieLifeImg, centerX-canvasCellRadius/1.5, centerY-canvasCellRadius/1.5, canvasCellRadius*1.5, canvasCellRadius*1.5);
}
function DrawSurprise(centerX,centerY){
	context.drawImage(surpriseImg, centerX-canvasCellRadius/1.5, centerY-canvasCellRadius/1.5, canvasCellRadius*1.5, canvasCellRadius*1.5);
}
// function DrawMonster(centerX,centerY){
// }



function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x === "up") {
		shape.direction = "Up";
		if (shape.j > 0 && board[shape.i][shape.j - 1] != "wall") {
			shape.j--;
		}
	}
	if (x === "down") {
		shape.direction = "Down";
		if (shape.j < (sizeOfBoard-1) && board[shape.i][shape.j + 1] != "wall") {
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
		if (shape.i < (sizeOfBoard-1) && board[shape.i + 1][shape.j] != "wall") {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == "color5Ball" ) {
		score += 5;
	}
	if (board[shape.i][shape.j] == "color15Ball" ) {
		score += 15;
	}
	if (board[shape.i][shape.j] == "color25Ball" ) {
		score += 25;
	}
	if (board[shape.i][shape.j] == "bonusCoockie" ) {
		score += 50;
	}
	if (board[shape.i][shape.j] == "surprise") {
		rand = Math.floor(Math.random() * 2);
		if(rand==1){
			score += 50;
		}
		else{
			score -= 50;
		}
	}
	if (board[shape.i][shape.j] == "cookieLife" ) {
		lifeGameRemain++;
		cookieLifeEaten = true;
		updateLifeSetting();
	}

	board[shape.i][shape.j] = "pacman";
	var currentTime = new Date();
	timeElapsed = (currentTime - startTime) / 1000;
	if (score >= 20 && timeElapsed <= 10) {
		pacColor = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

// function updateLifeSetting(){
// 	let imgNumTemp = lifeGameRemain;
// 	if (cookieLifeEaten){
// 		let lifeToAdd = "life" + imgNumTemp;
		
// 	}
// }
