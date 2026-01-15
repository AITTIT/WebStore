// Fetch product categories from the API and call display them
// with displayCategories()
fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>displayCategories(json))


// Dynamically creates the category list
function displayCategories(categories) {
    
    // Creates 'Kaikki tuotteet' category to the list.
    const categoryContainer = document.getElementById('productCategories');
    const link = document.createElement('a');
    link.href = 'productList.html';
    link.textContent = 'Kaikki tuotteet';
    link.className = 'product-categories';
    categoryContainer.appendChild(link);

    // Formatting
    const linebreak = document.createElement('br');
    categoryContainer.appendChild(linebreak);

    // Creates an HTML element of every category
    for (const category of categories) {
    
        const categoryContainer = document.getElementById('productCategories');
        const link = document.createElement('a');
        link.href = `productList.html?id=${category}`;
        link.textContent = category;
        link.className = 'product-categories';
        categoryContainer.appendChild(link);
    
        // Formatting
        const linebreak = document.createElement('br');
        categoryContainer.appendChild(linebreak);
    }

}