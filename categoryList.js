// hakee API:sta tuotekategoriat, luo vastauksesta objektin ja syöttää sen 
// displayCategories() funktioon
fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>displayCategories(json))


// Luo dynaamisesti kategorialistan.
function displayCategories(categories) {
    
    // Luo 'Kaikki tuotteet' linkin kategorialistaan
    const categoryContainer = document.getElementById('productCategories');
    const link = document.createElement('a');
    link.href = 'productList.html';
    link.textContent = 'Kaikki tuotteet';
    link.className = 'product-categories';
    categoryContainer.appendChild(link);

    // Muotoilua
    const linebreak = document.createElement('br');
    categoryContainer.appendChild(linebreak);

    // for-loop joka käy läpi kaikki kategoriat ja kasaa niistä html-elementin
    for (const category of categories) {
    
        const categoryContainer = document.getElementById('productCategories');
        const link = document.createElement('a');
        link.href = `productList.html?id=${category}`;
        link.textContent = category;
        link.className = 'product-categories';
        categoryContainer.appendChild(link);
    
        // Muotoilua
        const linebreak = document.createElement('br');
        categoryContainer.appendChild(linebreak);
    }

}