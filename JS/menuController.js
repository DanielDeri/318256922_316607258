function showWelcome() {
    if (document.getElementById("welcome_page").style.display == "none") {
        $(signup_page).hide();
        $(login_page).hide();
        $(setting_page).hide();
        $(game_page).hide();
        $(welcome_page).show();
        // stopGame();
    }

}

function showSignup() {
    if (document.getElementById("signup_page").style.display == "none") {
        $(welcome_page).hide();
        $(login_page).hide();
        $(setting_page).hide();
        $(game_page).hide();
        signup_form.reset();
        $(signup_page).show();
        // resetForms();
        // stopGame();
    }
}
function showLogin() {
    if (document.getElementById("login_page").style.display == "none") {
        $(welcome_page).hide();
        $(signup_page).hide();
        $(setting_page).hide();
        $(game_page).hide();
        login_form.reset();
        $(login_page).show();
        // stopGame();
    }
}



function showAbout() {
    document.getElementById("about_window").style.display = 'block';
}

function hideAbout() {
    document.getElementById("about_window").style.display = 'none';
}

var modal = document.getElementById("about_window");

// Close about window after pressing outside of the modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Close about window after pressing esc
window.addEventListener('keydown', function (event) {
    if (event.key == 'Escape') {
        modal.style.display = "none";
    }
})
