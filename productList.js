// Luo objektin osoitteen loppuosasta
const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
// Luodusta objektista otetaan id:n arvo, jota sitten käytetään
// oikean tuotteen hakemiseen tietokannasta.
const categoryID = urlParams.get('id');
console.log(categoryID);

// Jos kategoriaID, toisin sanoen kategorian nimi löytyy URLista,
// haetaan kyseisen kategorian tuotteet. Jos ei, haetaan 'kaikki tuotteet'.
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
    // Tuotetietojen tarkasteluun konsolissa looppi.
    for (let key in list) {
        console.log(list[key]);
    }

    // luodaan polku products diviin
    const productContainer = document.getElementById('products');

    // fetchistä syötetään funktioon 'list', joka on kaikki kyseisen kategorian
    // sisältävä tuoteobjektien lista. Niiden pohjalta luodaan forEach() rakenteella
    // luodaan linkkielementtejä.
    list.forEach(product => {
        // Luo tuotteelle linkkielementin
        const link = document.createElement('a');

        // Antaa kyseisen tuotteen a-elementille href attribuutin, jonka
        // arvo tulee tuoteobjektin id:stä, joka sitten voidaan poimia
        // tuotesivulle siirryttäessä.
        link.href = `product.html?id=${product.id}`;
        // Antaa linkin tekstiksi tuotteen nimen.
        link.textContent = product.title;
        // Antaa kaikille linkeille luokan jota voi sitten käyttää muotoilussa.
        link.className = 'product-link';
        // Liittää tehdyn linkin diviin jonka id on products
        productContainer.appendChild(link);

        // Muotoilua
        const linebreak = document.createElement('br');
        productContainer.appendChild(linebreak);
    });

    }