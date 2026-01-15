// Creates an object that contains a string of the ID
const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
// Extract the ID if it exists
const categoryID = urlParams.get('id');
console.log(categoryID);


// fetch the category according to ID, or all products if no ID
if (categoryID) {
    fetch(`https://fakestoreapi.com/products/category/${categoryID}`)
    .then(res=>res.json())
    .then(json=>displayProduct(json))
} else {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>displayProduct(json))
}



function displayProduct(list) {
    // print product list in console
    for (let key in list) {
        console.log(list[key]);
    }

    // Path to products div
    const productContainer = document.getElementById('products');

    // Create HTML links for each of the product in the category
    list.forEach(product => {

        const link = document.createElement('a');

        // Product id set into the address, so that it can be used to fetch product
        link.href = `product.html?id=${product.id}`;
        
        link.textContent = product.title;

        // Assigns class for all links
        link.className = 'product-link';
        // Link added to div
        productContainer.appendChild(link);

        // Formatting
        const linebreak = document.createElement('br');
        productContainer.appendChild(linebreak);
    });

    }