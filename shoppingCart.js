const addToCartBtn = document.getElementById('addToCart');

// Tarkastellaan ollaanko tuotesivulla, ja jos ollaan,
// asetetaan addToCartBtn:ille kuuntelija.
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', fetchProductInfo);
}

const shoppingCartList = document.getElementById('cartContainer');
const orderBtn = document.getElementById('orderBtn');

// tarkastellaan ollaanko ostoskori-sivulla, ja jos ollaan
// asetetaan kuuntelija tilaus-napille ja kutsutaan displayCart()
if (shoppingCartList) {
    orderBtn.addEventListener('click', sendOrder);
    displayCart();    
}

// Lähettää "tilauksen" jos mahdollista
function sendOrder() {
    
    // haetaan tieto ollaankoo kirjauduttu sisään local storagesta.
    const login = localStorage.getItem('isLoggedIn');

    // tarkastetaan, onko login true, ja jos on, suoritetaan tilaus.
    // Jos ei ole, kehotetaan käyttäjää kirjautumaan.
    if (login) {    //Tämä on siis true boolean, vaikka se on string jossa lukee true? Vai jotenkin 'truthy'?
        window.alert('Tilaus lähetetty.');
        // simuloidaan ostoskorin lähettämistä eteenpäin tulostamalla konsoliin
        console.log(getCart());
        // Tyhjätään kauppakori.
        emptyCart();
    } else {
        window.alert('Kirjaudu sisään tilataksesi.');
    }
}

// Näytetään ostoskorin sisältö ostoskori-sivulla.
function displayCart() {
    // Haetaan ostoskori muuttujaan
    const cart = getCart();

    // Luodaan polku diviin, ja tyhjätään se
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHtml = '';

    // Muuttuja, johon lasketaan koko ostoskorin arvo.
    let cartTotal = 0;

    // Loopataan kaikki ostoskorissa olevat tuotteet
    // ja luodaan niistä taulukon rivejä
    for (const product of cart) {

        const cartRow = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        const priceCell = document.createElement('td');
        priceCell.textContent = `$${product.price.toFixed(2)}`;
        const quantityCell = document.createElement('td');
        quantityCell.textContent = product.quantity;

        cartRow.appendChild(nameCell);
        cartRow.appendChild(priceCell);
        cartRow.appendChild(quantityCell);

        cartContainer.appendChild(cartRow);

        //lisätään tuotteen hinta kertaa määrä ostoskorin kokonaishintaan.
        cartTotal += product.price * product.quantity;

    }


    // Luodaan kokonaishinnan taulukkorivi ja liitetään se html:ään
    const cartRow = document.createElement('tr');
    const emptyCell = document.createElement('td');
    emptyCell.textContent = ' ';
    const cartTotalCell = document.createElement('td');
    cartTotalCell.textContent = `Kokonaishinta: $${cartTotal.toFixed(2)}`;
    cartRow.appendChild(emptyCell);
    cartRow.appendChild(emptyCell);
    cartRow.appendChild(cartTotalCell);
    cartContainer.appendChild(cartRow);

}


// Haetaan tuotteen tiedot käyttämällä URLista saatua id:tä
// ja kutsutaan createProductObjectia
function fetchProductInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log(productId);

    // Aiemmin ongittua ID:tä käytetään nyt hakemaan oikea tuote tietokannasta
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => createProductObject(product));
}

// luodaan haetusta tuoteobjektista ostoskorituote,
// jolla on vähän eri ominaisuudet.
function createProductObject(product) {
    console.log(product);
    const cartItem = {
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1
    };
    console.log(cartItem);
    // Lisätään luotu ostoskorituote ostoskorilistaan.
    addToCart(cartItem);
}


// Lisää ostoskoriin argumenttina saadun tuotteen.
function addToCart(product) {
    // Hakee ostoskorin getCart() funktiolla,
    const cart = getCart();
    
    let existingItem = null;
    // Verrataan ostoskorissa olevia tuotteita lisättävään tuotteeseen
    // jos tuote on jo ostoskorissa
    for (const item of cart) {
        if (item.id === product.id) {
            existingItem = item;
            break;
        }        
    }

    // Jos 'existingItem' on pysynyt nullina, eli tuotetta ei ole löytynyt
    // ostoskorista, pushataan tuote ostoskoriin, muuten kasvatetaan
    // ostoskorissa olevan tuotteen määrää.
    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    // Lopuksi tallennetaan päivitetty ostoskori.
    saveCart(cart);
}

// Hakee ostoskorin local storagesta 
function getCart() {
    // getItem() hakee avainta vastaavan arvon, jos ei löydy, palauttaa null.
    const cart = localStorage.getItem("shoppingCart");
    //Jos ostoskori löytyy, muuttaa sen listaksi objekteja
    // ja palauttaa sen. Jos ei, palauttaa listan,
    // koska silloin ostoskoriin ei vielä ole lisätty mitään.
    if (cart) {
        return JSON.parse(cart);
    } else {
        return [];
    }
}

// Tallettaa luodun sisään otetun kauppakorin local storageen tekstimuotoisena.
// cart on lista joka koostuu tuotteista.
function saveCart(cart) {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// Tyhjää Ostoskorin tilauksen yhteydessä.
function emptyCart() {
    let emptyCart = [];
    saveCart(emptyCart);
}