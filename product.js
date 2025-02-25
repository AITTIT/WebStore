// Tämä koodi ajetaan kun tullaan tuotesivulle, ja silloin URLissa
// on joku ID koska käyttäjä on klikannut tuotetta.

// Luo objektin osoitteesta
const urlParams = new URLSearchParams(window.location.search);
// Luodusta objektista otetaan id:n arvo, jota sitten käytetään
// oikean tuotteen hakemiseen tietokannasta.
const productId = urlParams.get('id');

console.log(productId);

// Aiemmin hankittua ID:tä käytetään nyt hakemaan oikea tuote
// tietokannasta, palauttaa 
fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => { 
        //product on objekti, josta otetaan halutut arvot, ja päivitetään
        // HTML-elementit tuotteen tiedoilla.
        document.getElementById('productTitle').textContent = product.title;
        document.getElementById('productImage').src = product.image;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productPrice').textContent = `$${product.price}`;
    })
