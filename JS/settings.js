var timeChosen;
var numOfBalls;

var ballColor5;
var ballColor15;
var ballColor25;

var upArrow;
var downArrow;
var rightArrow;
var leftArrow;

var upArrowName;
var downArrowName;
var rightArrowName;
var leftArrowName;


var numberOfMonsters = 0;
var monsters = new Map([["ElmoMonster", false], ["BigBirdMonster", false], ["IrvineMonster", false], ["GroverMonster", false]])
var monstersInputs = new Map([["ElmoMonster", "ElmoInput"], ["BigBirdMonster", "BigBirdInput"], ["IrvineMonster", "IrvineInput"], ["GroverMonster", "GroverInput"]])

function settingsStartGame() {
    timeChosen = Number($("#TimeInput").val());
    numOfBalls = Number($("#BallsInput").val());
    upArrowName = $("#UPKey").val();
    downArrowName = $("#DOWNKey").val();
    rightArrowName = $("#RIGHTKey").val();
    leftArrowName = $("#LEFTKey").val();
    ballColor5 = $("#5Color").val();
    ballColor15 = $("#15Color").val();
    ballColor25 = $("#25Color").val();

    // chcek at list one monster was chosen
    if (numberOfMonsters == 0) {
        alert("Please select at list one pursuer.");
        return;
    }
    // check no button is the same
    if (upArrowName == downArrowName || upArrowName == rightArrowName || upArrowName == leftArrowName || downArrowName == rightArrowName || downArrowName == leftArrowName || leftArrowName == rightArrowName) {
        alert("Please select diffrent keys.");
        return;
    }

    if (ballColor5 == ballColor15 || ballColor5 == ballColor25 || ballColor15 == ballColor25) {
        alert("Please select diffrent colors.");
        return;
    }
    goToGame();
    return;
}


function settingsRandom() {
    //reset values
    resetSettings();
    // Set randome game time
    timeChosen = Math.floor(Math.random() * (121)) + 60;
    $("#TimeInput").attr("value", timeChosen);
    // Set randome number of balls
    numOfBalls = Math.floor(Math.random() * (41)) + 50;
    $("#BallsInput").attr("value", numOfBalls);

    // Set Random Balls colors 
    ballColor5 = getRandomColor();
    $("#5Color").attr("value", ballColor5);
    ballColor15 = getRandomColor();
    while (ballColor15 == ballColor5) {
        ballColor15 = getRandomColor();
    }
    $("#15Color").attr("value", ballColor15);
    ballColor25 = getRandomColor();
    while (ballColor25 == ballColor15 || ballColor25 == ballColor5) {
        ballColor25 = getRandomColor();

    }
    $("#25Color").attr("value", ballColor25);

    // Set Random Monsters number
    numberOfMonsters = Math.floor(Math.random() * 4) + 1;
    var counter = numberOfMonsters;
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
    leftArrow = 37;
    upArrow = 38;
    rightArrow = 39;
    downArrow = 40;
    //start game:
    setTimeout(goToGame, 200);
    return;
}
function goToGame() {
    var startGameCon = confirm("Would you like the start the game with the chosen settings?");
    if (startGameCon == true) {
        // Update Finale app setting 
        updateGamePage();
        resetSettings();
        $("#setting_page").hide();
        $("#game_page").show();
        Start();
        return;
    }
    return;
}

function updateGamePage() {
    gameTime = timeChosen;
    ballsNum = numOfBalls;
    monstersNum = numberOfMonsters;
    choseenMonster = monsters;
    color5Ball = ballColor5;
    color15Ball = ballColor15;
    color25Ball = ballColor25;
    //buttons update from setting:
    leftButtonCode = leftArrow;
    upButtonCode = upArrow;
    righttButtonCode = rightArrow;
    downButtonCode = downArrow;

    $("#timeSet").attr("value", timeChosen);
    $("#Balls").attr("value", numOfBalls);
    document.getElementById('5BallColor').style.backgroundColor = ballColor5;
    document.getElementById('15BallColor').style.backgroundColor = ballColor15;
    document.getElementById('25BallColor').style.backgroundColor = ballColor25;
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
    $("#TimeInput").attr("value", 60);
    $("#BallsInput").attr("value", 50);
    // rest colors
    $("#5Color").attr("value", "#9D6538");
    $("#15Color").attr("value", "#CF9F6E");
    $("#25Color").attr("value", "#DABE99");
    // reset ElmoInput
    document.getElementById('ElmoInput').style.border = "none";
    $("#ElmoInput").attr("alt", "notSelected");
    // reset BigBirdInput
    document.getElementById('BigBirdInput').style.border = "none";
    $("#BigBirdInput").attr("alt", "notSelected");
    // reset IrvineInput
    document.getElementById('IrvineInput').style.border = "none";
    $("#IrvineInput").attr("alt", "notSelected");
    // reset GroverInput
    document.getElementById('GroverInput').style.border = "none";
    $("#GroverInput").attr("alt", "notSelected");
    // reset monsters counter to 0
    numberOfMonsters = 0;
}


function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}


function selectMonster(monster) {
    var isSelected = monster.alt;
    var name = monster.src.split("/").pop().split(".")[0];
    console.log("Monster name:" + name);
    // var monsterSrc = 
    if (isSelected == "selected") {
        monster.alt = "notSelected";
        monster.style.border = "none";
        monsters.set(name, false);
        numberOfMonsters = numberOfMonsters - 1;
    }
    else {
        monster.alt = "selected";
        monster.style.border = "1px solid grey";
        monsters.set(name, true);
        numberOfMonsters = numberOfMonsters + 1;
    }
    console.log("Map Values:" + Array.from(monsters.entries(), ([k, v]) => `\n  ${k}: ${v}`).join("") + "\n");
    console.log("Number Of Monsters:" + numberOfMonsters)
}


//set arrows
function setUpKey(key, event) {
    $(key).val(event.code);
    upArrow = event.which;
    upArrowName = event.code;

}

function setDOWNKey(key, event) {
    $(key).val(event.code);
    downArrow = event.which;
    downArrowName = event.code;
}

function setRIGHTKey(key, event) {
    $(key).val(event.code);
    rightArrow = event.which;
    rightArrowName = event.code;
}

function setLEFTKey(key, event) {
    $(key).val(event.code);
    leftArrow = event.which;
    leftArrowName = event.code;
}
