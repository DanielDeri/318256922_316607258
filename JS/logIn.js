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
}
