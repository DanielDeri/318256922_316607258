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


    $("#login_page").hide();
    $("#setting_page").show();
    document.getElementById('login_form').reset()
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