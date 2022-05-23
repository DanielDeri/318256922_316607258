function logInToSettings() {
    //inputs
    var userName = $("#lbUsernameLogin").val();
    var password = $("#lbPasswordLogin").val();
    //validion   
    if (!users_passwords.has(userName)) {
        alert("UserName does not exist.");
        return;
    }

    if (users_passwords.get(userName) != password) {
        alert("Password is incorrect.");
        return;
    }
    loggedUser = userName;
    $("#login_page").hide();
    resetSettings();
    $("#setting_page").show();
}


function showHideLoginFunc() {
    var firstPass = $("#lbPasswordLogin").attr("type");
    if (firstPass == "password") {
        $("#lbPasswordLogin").attr("type", "text");
    }
    else {
        $("#lbPasswordLogin").attr("type", "password");
    }
}