// function loadDAta() {
//     try {
//         fetch(`https://dummyjson.com/products?limit=10`)
//             .then(res => res.json)
//             .then(data => console.log(data.products))

//     } catch (error) {
//         console.error("Failed to fetch data:", error);
//     }
// }

// window.onload = loadDAta;

async function loadDAta() {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=10');
        const data = await response.json();
        console.log("Products loaded:", data.products);

        // NEXT STEP: Call a function here to put this data into your table
        // displayProducts(data.products);

    } catch (error) {
        console.error("Failed to fetch data:", error);
        alert("Error: Could not connect to the API.");
    }
}

window.onload = loadDAta;