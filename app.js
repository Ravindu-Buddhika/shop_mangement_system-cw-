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

async function handleEdit(id, title, price, category) {
    document.getElementById('prod-id').value = id;
    document.getElementById('prod-title').value = title;
    document.getElementById('prod-price').value = price;
    document.getElementById('prod-category').value = category;
}


async function saveProduct(event) {
    event.preventDefault();

    const id = document.getElementById('prod-id').value;
    const title = document.getElementById('prod-title').value;
    const price = document.getElementById('prod-price').value;
    const category = document.getElementById('prod-category').value;

    const isEditing = id !== ""; 
    
    const url = isEditing 
        ? `https://dummyjson.com/products/${id}` 
        : 'https://dummyjson.com/products/add';
    
    const method = isEditing ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, price, category })
        });

        const result = await response.json();

        if (response.ok) {
            if (isEditing) {

                updateTableRow(id, title, price, category);
                alert("Product Updated Successfully!");
            } else {

                addNewRowToTable(result);
                alert("New Product Added!");
            }


            resetForm(); 
        }
    } catch (error) {
        console.error("Save Error:", error);
    }
}
function addNewRowToTable(product) {
    const tableBody = document.getElementById('table-body');
    const newRow = `
        <tr>
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td>${product.category}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="handleEdit(${product.id}, '${product.title}', ${product.price}, '${product.category}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id}, this)">Delete</button>
            </td>
        </tr>`;
    tableBody.innerHTML += newRow;
}

function updateTableRow(id, title, price, category) {
    const rows = document.querySelectorAll('#table-body tr');
    rows.forEach(row => {
        // Find the row that contains the edit button with this specific ID
        if (row.innerHTML.includes(`handleEdit(${id}`)) {
            row.cells[0].innerText = title;
            row.cells[1].innerText = `$${price}`;
            row.cells[2].innerText = category;
        }
    });
}