var loggedUser;
var upArrowName;
var downArrowName;
var rightArrowName;
var leftArrowName;

var monsters = new Map([["ElmoMonster", false], ["BigBirdMonster", false], ["IrvineMonster", false], ["GroverMonster", false]])
var monstersInputs = new Map([["ElmoMonster", "ElmoInput"], ["BigBirdMonster", "BigBirdInput"], ["IrvineMonster", "IrvineInput"], ["GroverMonster", "GroverInput"]])

function settingsStartGame() {

    gameTime = Number($("#TimeInput").val());
    ballsNum = Number($("#BallsInput").val());
    upArrowName = $("#UPKey").val();
    downArrowName = $("#DOWNKey").val();
    rightArrowName = $("#RIGHTKey").val();
    leftArrowName = $("#LEFTKey").val();
    color5Ball = $("#5Color").val();
    color15Ball = $("#15Color").val();
    color25Ball = $("#25Color").val();

    // chcek at list one monster was chosen
    if (monstersNum == 0) {
        alert("Please select at list one pursuer.");
        return;
    }
    // check no button is the same
    if (upArrowName == downArrowName || upArrowName == rightArrowName || upArrowName == leftArrowName || downArrowName == rightArrowName || downArrowName == leftArrowName || leftArrowName == rightArrowName) {
        alert("Please select diffrent keys.");
        return;
    }
    if (typeof upArrowName === 'undefined' || typeof rightArrowName === 'undefined' || typeof downArrowName === 'undefined' || typeof leftArrowName === 'undefined') {
        leftButtonCode = 37;
        upButtonCode = 38;
        righttButtonCode = 39;
        downButtonCode = 40;
    }
    if (gameTime < 60) {
        alert("Time must be grater then 60.");
        return;
    }

    if (ballsNum < 50 || ballsNum > 90) {
        alert("Number of Balls between 50-90.");
        return;
    }

    if (color5Ball == color15Ball || color5Ball == color25Ball || color15Ball == color25Ball) {
        alert("Please select diffrent colors.");
        return;
    }
    if (color5Ball == "#ffffff" || color15Ball == "#ffffff" || color25Ball == "#ffffff") {
        alert("Ball color can't be white, please select diffrent color.");
        return;
    }
    goToGame();
    return;
}

function settingsRandom() {
    //reset values
    resetSettings();
    // Set randome game time
    gameTime = Math.floor(Math.random() * (121)) + 60;
    $("#TimeInput").attr("value", gameTime);
    // Set randome number of balls
    ballsNum = Math.floor(Math.random() * (41)) + 50;
    $("#BallsInput").attr("value", ballsNum);

    // Set game keys
    upArrowName = $("#UPKey").val();
    downArrowName = $("#DOWNKey").val();
    rightArrowName = $("#RIGHTKey").val();
    leftArrowName = $("#LEFTKey").val();

    // Set Random Balls colors 
    color5Ball = getRandomColor();
    $("#5Color").attr("value", color5Ball);
    color15Ball = getRandomColor();
    while (color15Ball == color5Ball) {
        color15Ball = getRandomColor();
    }
    $("#15Color").attr("value", color15Ball);
    color25Ball = getRandomColor();
    while (color25Ball == color15Ball || color25Ball == color5Ball) {
        color25Ball = getRandomColor();

    }
    $("#25Color").attr("value", color25Ball);

    // Set Random Monsters number
    monstersNum = Math.floor(Math.random() * 4) + 1;
    var counter = monstersNum;
    for (let [key, value] of monsters.entries()) {
        if (counter > 0) {
            monsterTagId = monstersInputs.get(key);
            document.getElementById(monsterTagId).style.border = "1px solid grey";
            $("#" + monsterTagId).attr("alt", "attr");
            monsters.set(key, true);
            counter--;
        }
        else {
            break;
        }
    }
    //start game:
    setTimeout(goToGame, 150);
    return;
}

function goToGame() {
    var startGameCon = confirm("Would you like the start the game with the chosen settings?");
    if (startGameCon == true) {
        // Update Finale app setting 
        updateGamePage();
        // resetSettings();
        $("#setting_page").hide();
        $("#game_page").show();
        Start();
        return;
    }
    return;
}

function updateGamePage() {
    choseenMonster = monsters;
    lbUsername.value = loggedUser;
    lbHighScore.value = users_highScore.get(loggedUser);
    higestScore = users_highScore.get(loggedUser);
    $("#timeSet").attr("value", gameTime);
    $("#Balls").attr("value", ballsNum);
    document.getElementById('5BallColor').style.backgroundColor = color5Ball;
    document.getElementById('15BallColor').style.backgroundColor = color15Ball;
    document.getElementById('25BallColor').style.backgroundColor = color25Ball;
    $("#UPKeySet").attr("value", upArrowName);
    $("#DOWNKeySet").attr("value", downArrowName);
    $("#RIGHTKeySet").attr("value", rightArrowName);
    $("#LEFTKeySet").attr("value", leftArrowName);

    var counter = 1
    monstersImgs = new Map();
    for (let [key, value] of monsters.entries()) {
        if (value == true) {
            monstersImgs.set(counter, document.getElementById(key));
            var imgSrc = $("#" + key).attr("src");
            $("#monster" + counter).attr("src", imgSrc);
            document.getElementById("monster" + counter).style.display = "block";
            counter++;
        }
    }

}

function resetSettings() {
    // reset game setting input
    document.getElementById('setting_form').reset();
    gameTime = 60;
    $("#TimeInput").attr("value", 60);
    ballsNum = 50;
    $("#BallsInput").attr("value", 50);

    // rest colors
    color5Ball = "#9D6538";
    $("#5Color").attr("value", "#9D6538");
    color15Ball = "#CF9F6E";
    $("#15Color").attr("value", "#CF9F6E");
    color25Ball = "#DABE99";
    $("#25Color").attr("value", "#DABE99");

    // reset all monsters:
    resetMonstersFromGame();

    //config button by defult:
    leftButtonCode = 37;
    upButtonCode = 38;
    righttButtonCode = 39;
    downButtonCode = 40;

    //reset life
    document.getElementById("life1").style.display = "block";
    document.getElementById("life2").style.display = "block";
    document.getElementById("life3").style.display = "block";
    document.getElementById("life4").style.display = "block";
    document.getElementById("life5").style.display = "block";
    document.getElementById("life6").style.display = "none";
}

function resetMonstersFromGame() {
    monstersNum = 0;
    var monstersNames = ["Elmo", "BigBird", "Irvine", "Grover"];
    for (var i = 0; i < 4; i++) {
        let name = monstersNames[i];
        $("#" + name + "Input").attr("alt", "notSelected");
        document.getElementById(name + "Input").style.border = "none";
        monsters.set(name + "Monster", false);
        let counter = i + 1;
        var monsterImg = document.getElementById("monster" + counter);
        if (monsterImg.style != "none") {
            // monsterImg.src = "none";
            monsterImg.style.display = "none";
        }
    }
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function selectMonster(monster) {
    var isSelected = monster.alt;
    var name = monster.src.split("/").pop().split(".")[0];
    console.log("Monster name:" + name);

    if (isSelected == "selected") {
        monster.alt = "notSelected";
        monster.style.border = "none";
        monsters.set(name, false);
        monstersNum = monstersNum - 1;
    }
    else {
        monster.alt = "selected";
        monster.style.border = "1px solid grey";
        monsters.set(name, true);
        monstersNum = monstersNum + 1;
    }
    console.log("Map Values:" + Array.from(monsters.entries(), ([k, v]) => `\n  ${k}: ${v}`).join("") + "\n");
    console.log("Number Of Monsters:" + monstersNum)
}


//set arrows
function setUpKey(key, event) {
    $(key).val(event.code);
    upButtonCode = event.which;
    upArrowName = event.code;
}

function setDOWNKey(key, event) {
    $(key).val(event.code);
    downButtonCode = event.which;
    downArrowName = event.code;
}

function setRIGHTKey(key, event) {
    $(key).val(event.code);
    righttButtonCode = event.which;
    rightArrowName = event.code;
}

function setLEFTKey(key, event) {
    $(key).val(event.code);
    leftButtonCode = event.which;
    leftArrowName = event.code;
}
