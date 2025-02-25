// Kutsutaan checkCredentials-funktiota, kun klikataan Login-nappia
let loginBtn = document.getElementById('btnLogin');
loginBtn.addEventListener('click', checkCredentials);

// Kutsutaan logoff-funktiota, kun klikataan Logoff-nappia
let logoffBtn = document.getElementById('btnLogoff');
logoffBtn.addEventListener('click', logoff);

// Jos käyttäjä on kirjautuneena, Login-div on piilotettu ja Logoff-div näkyvillä.
// Jos käyttäjä ei ole kirjautuneena, Logoff-div on näkyvillä ja Login-div on piilotettu.
if (localStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById("logoff").style.display = "block";
    document.getElementById("login").style.display = "none";
} else {
    document.getElementById("logoff").style.display = "none";
    document.getElementById("login").style.display = "block";
}

// Globaaleja muuttujia, joihin lisätään sivulla olevista tekstikentistä arvot
let loginUsername = '';
let loginPassword = '';

// Tämän funktion sisällä oleva koodi suoritetaan vain, kun klikataan Login-nappia
function checkCredentials() {
    let usernameCorrect = false;
    let passwordCorrect = false;

    // Hae elementit käyttäjätunnukselle ja salasanalle
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');

    // Aseta globaaleille muuttujille tekstikenttien arvot
    loginUsername = usernameInput.value;
    loginPassword = passwordInput.value;

    // Haetaan käyttäjien tiedot palvelimelta
    fetch('https://fakestoreapi.com/users')
    .then(res => res.json())
    .then(json => {
        // Tarkastetaan jokaisen käyttäjän tiedot yksitellen
        json.forEach(user => {
            const storedUsername = user.username;
            const storedPassword = user.password;

            // Verrataan palvelimelta saatuja tunnusta ja salasanaa kenttiin syötettyihin arvoihin
            if (storedUsername === loginUsername) {
                usernameCorrect = true;
                if (storedPassword === loginPassword) {
                    passwordCorrect = true;
                    return;  // Löydettiin oikeat tunnukset, voidaan lopettaa silmukka
                }
            }
        });

        // Odotetaan, että tietojen käsittely on valmis ja tehdään toimenpiteitä sen mukaan, oliko tunnus ja salasana oikein
        if (usernameCorrect && passwordCorrect) {
            //Piilotetaan Login-ikkuna ja tuodaan Logoff-ikkuna esiin.
            document.getElementById("login").style.display = "none";
            document.getElementById("logoff").style.display = "block";

            //Tallennetaan kirjautuminen selaimeen.
            localStorage.setItem('isLoggedIn', 'true');
        } else {
            //Ilmoitetaan käyttäjälle, että tunnus tai salasana meni väärin.
            document.getElementById('loginMessage').textContent = 'Käyttäjätunnus tai salasana väärin!';
        }
    });
}

// Kirjataan käyttäjä ulos, piilotetaan Logoff-ikkuna ja näytetään Login-ikkuna.
function logoff() {
    //Näytetään Login-ikkuna.
    document.getElementById("login").style.display = "block";
    //Piilotetaan Logoff-ikkuna.
    document.getElementById("logoff").style.display = "none";
    //Poistetaan kirjautuminen selaimen välimuistista.
    localStorage.removeItem('isLoggedIn');
}