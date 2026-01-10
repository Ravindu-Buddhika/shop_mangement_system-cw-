async function loadDAta() {
    const loader = document.getElementById('loading-state');
    const tableContainer = document.getElementById('table-container');

    try {
        loader.style.display = 'block';
        tableContainer.style.display = 'none';

        const response = await fetch('https://dummyjson.com/products?limit=10');
        const data = await response.json();
        
        console.log("Products loaded:", data.products);

        displayTable(data.products);

        loader.style.display = 'none';
        tableContainer.style.display = 'block';

    } catch (error) {
        console.error("Failed to fetch data:", error);
        alert("Error: Could not connect to the API.");
    }
}

window.onload = loadDAta;

const displayTable = (products) => {
    const tableBody = document.getElementById('product-list');
    tableBody.innerHTML = "";

    products.forEach(product => {
        const row = `
            <tr>
                <td><img src="${product.thumbnail}" alt="${product.title}" width="50" class="rounded"></td>
                <td>${product.title}</td>
                <td>$${product.price}</td>
                <td><span class="badge bg-secondary">${product.category}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="handleEdit(${product.id}, '${product.title}', ${product.price}, '${product.category}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id}, this)">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
};

function handleEdit(id, title, price, category){
    document.getElementById('prod-id').value = id;
    document.getElementById('prod-title').value = title;
    document.getElementById('prod-price').value = price;
    document.getElementById('prod-category').value = category;
}