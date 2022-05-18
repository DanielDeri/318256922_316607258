function signUpToLogIn() {
    // validion    
    var userName = $("#lbUsernameInput").val();
    var password = $("#lbPasswordInput").val();
    var rePassword = $("#lbPasswordConInput").val();
    var fullName = $("#lbFullNameInput").val();
    var email = $("#lbEmailInput").val();

    // password:
    if (password.search(/\d/) == -1) {
        alert("Password must contains numbers");
        return;
    }
    else if (password.search(/[a-zA-Z]/) == -1) {
        alert("Password must contains letters");
        return;
    }
    if (password != rePassword) {
        alert("Password must contains letters");
        return;
    }
    // name:
    if (fullName.search(/\d/) == 1) {
        alert("full name should contain only letters");
        return;
    }

    console.log("emails Before:" + emailList);
    console.log("dict Before:" + users_passwords.size);

    if (users_passwords.has(userName)) {
        alert("UserName already in use , please choose another one.");
        return;
    }
    // email
    if (emailList.includes(email)) {
        alert("Email adress already in use , please choose another one.");
        return;
    }

    // add to dictionary
    users_passwords.set(userName, password);
    users_highScore.set(userName, 0);
    // push to end of array
    emailList.push(email);
    // clear cells for next time
    console.log("users_passwords dict After:" + users_passwords.size);
    console.log("users_highScore dict After:" + users_highScore.size);
    console.log("emails After:" + emailList);

    alert("Welcome to the Cookie-Man game. please Login to your new account");
    // add to list

    $("#signup_page").hide();
    $("#login_page").show();
}


function showHideFunc() {
    var firstPass = $("#lbPasswordInput").attr("type");
    if (firstPass == "password") {
        $("#lbPasswordInput").attr("type", "text");
    }
    else {
        $("#lbPasswordInput").attr("type", "password");
    }
}

function showHideFuncConfirm() {
    var confirmPass = $("#lbPasswordConInput").attr("type");
    if (confirmPass == "password") {
        $("#lbPasswordConInput").attr("type", "text");
    }
    else {
        $("#lbPasswordConInput").attr("type", "password");
    }
}

