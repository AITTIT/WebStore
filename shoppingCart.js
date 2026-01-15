const addToCartBtn = document.getElementById('addToCart');

// If on product.html, set an event listener for 'add to cart' button
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', fetchProductInfo);
}

const shoppingCartList = document.getElementById('cartContainer');
const orderBtn = document.getElementById('orderBtn');

// If in shopping cart, set a listener for 'order' button and display cart
if (shoppingCartList) {
    orderBtn.addEventListener('click', sendOrder);
    displayCart();    
}

// Sends order if possible
function sendOrder() {
    
    // fetch logged in information from browser local storage
    const login = localStorage.getItem('isLoggedIn');

    // check if login true and execute order, otherwise give error message.
    if (login) {    
        window.alert('Tilaus lähetetty.');

        // Simulate saving the order by printing into console
        console.log(getCart());
        emptyCart();
    } else {
        window.alert('Kirjaudu sisään tilataksesi.');
    }
}

function displayCart() {

    const cart = getCart();

    // Create div handle and empty it
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHtml = '';

    // The total price of the cart.
    let cartTotal = 0;


    // Create a table of the products in the shopping cart
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

        // Update cart total price
        cartTotal += product.price * product.quantity;

    }


    // Create row for total price and append to table
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



// Fetch product information with the ID in the URL
function fetchProductInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log(productId);

    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => createProductObject(product));
}

// Create a product object with only the properties that are
// needed for the product when it is in the cart.
function createProductObject(product) {
    console.log(product);
    const cartItem = {
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1
    };
    console.log(cartItem);

    addToCart(cartItem);
}


// Add product to cart
function addToCart(product) {
    const cart = getCart();
    

    // Check if item already in cart
    let existingItem = null;
    for (const item of cart) {
        if (item.id === product.id) {
            existingItem = item;
            break;
        }        
    }

    // If the item is already in cart, increase quantity, otherwise push() to array
    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    // Save new cart to local storage
    saveCart(cart);
}

// Fetches shopping cart from local storage. If no shopping cart, returns an empty array.
function getCart() {
    const cart = localStorage.getItem("shoppingCart");
    
    if (cart) {
        return JSON.parse(cart);
    } else {
        return [];
    }
}

// Saves cart into local storage as a JSON
function saveCart(cart) {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// Empties cart when an order is successfully made
function emptyCart() {
    let emptyCart = [];
    saveCart(emptyCart);
}