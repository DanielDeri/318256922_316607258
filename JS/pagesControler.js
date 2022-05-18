var users_passwords = new Map([["k", "k"]]);
var users_highScore = new Map([["k", 0]]);
var emailList = [""];
// signup_page.style.display = 'none';
// login_page.style.display = 'none';
// setting_page.style.display = 'none';
// game_page.style.display = 'none';

$(document).ready(function () {
    // hide all pages besides welcome 
    // $("#signup_page").hide();
    // $("#login_page").hide();
    // $("#setting_page").hide();
    // $("#game_page").hide();


    // triggers in welcome page:
    $("#WSignUpButton").click(welcomeToSignUp);
    $("#WLogInButton").click(welcomeToLogIn);

    // triggers in SignUp page:
    $("#suSubmit").click(signUpToLogIn);
    $("#showHide").click(showHideFunc);
    $("#showHideConfirm").click(showHideFuncConfirm);

    // triggers in logIn page:
    $("#liSubmit").click(logInToSettings);
    $("#showHideLogin").click(showHideLoginFunc);

    // triggers in settings:
    $("#setStart").click(settingsStartGame);
    $("#setRandom").click(settingsRandom);
    $("#setReset").click(resetSettings);

    // settings - set arrows:
    $("#UPKey").keydown(function (event) { setUpKey(this, event); });
    $("#DOWNKey").keydown(function (event) { setDOWNKey(this, event); });
    $("#RIGHTKey").keydown(function (event) { setRIGHTKey(this, event); });
    $("#LEFTKey").keydown(function (event) { setLEFTKey(this, event); });
});