// Login button functionality
let loginBtn = document.getElementById('btnLogin');
loginBtn.addEventListener('click', checkCredentials);

// Logoff button functionality
let logoffBtn = document.getElementById('btnLogoff');
logoffBtn.addEventListener('click', logoff);

// If the user is logged in, login div displayed and logoff hidden.
// If the user is logged off, vice versa.
if (localStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById("logoff").style.display = "block";
    document.getElementById("login").style.display = "none";
} else {
    document.getElementById("logoff").style.display = "none";
    document.getElementById("login").style.display = "block";
}

let loginUsername = '';
let loginPassword = '';

function checkCredentials() {
    let usernameCorrect = false;
    let passwordCorrect = false;

    // Fetch user input
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');

    loginUsername = usernameInput.value;
    loginPassword = passwordInput.value;

    // Fetch users from API
    fetch('https://fakestoreapi.com/users')
    .then(res => res.json())
    .then(json => {
        // Check every user's information against the entered password and username
        json.forEach(user => {
            const storedUsername = user.username;
            const storedPassword = user.password;

            if (storedUsername === loginUsername) {
                usernameCorrect = true;
                if (storedPassword === loginPassword) {
                    passwordCorrect = true;
                    return;
                }
            }
        });

        // Take action depending if there was a match
        if (usernameCorrect && passwordCorrect) {
            // Hide login, display logoff
            document.getElementById("login").style.display = "none";
            document.getElementById("logoff").style.display = "block";

            // Save loggedin information to browser local storage.
            localStorage.setItem('isLoggedIn', 'true');
        } else {
            // Error message if password and/or username did not match.
            document.getElementById('loginMessage').textContent = 'Käyttäjätunnus tai salasana väärin!';
        }
    });
}

function logoff() {
    // display login div
    document.getElementById("login").style.display = "block";
    // hide logoff div
    document.getElementById("logoff").style.display = "none";
    // Remove the loggedin info from browser local storage.
    localStorage.removeItem('isLoggedIn');
}