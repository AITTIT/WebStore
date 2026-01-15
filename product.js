// Creates an object that contains a string of the ID
const urlParams = new URLSearchParams(window.location.search);
// Extract the ID if it exists
const productId = urlParams.get('id');

console.log(productId);

// fetch product from API and display on page.
fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => { 
        document.getElementById('productTitle').textContent = product.title;
        document.getElementById('productImage').src = product.image;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productPrice').textContent = `$${product.price}`;
    })
