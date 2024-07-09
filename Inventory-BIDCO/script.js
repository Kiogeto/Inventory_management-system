document.addEventListener("DOMContentLoaded", function() {
    loadHomePage();
});

function loadHomePage() {
    document.getElementById('content').innerHTML = `
        <h2>Welcome to the Inventory Management System</h2>
        <p>Use the navigation above to manage your inventory.</p>
    `;
}

function loadAddProductPage() {
    document.getElementById('content').innerHTML = `
        <h2>Add a New Product</h2>
        <form id="addProductForm">
            <label for="name">Product Name:</label>
            <input type="text" id="name" name="name" required><br><br>
            <label for="sku">SKU:</label>
            <input type="text" id="sku" name="sku" required><br><br>
            <label for="supplier">Supplier:</label>
            <input type="text" id="supplier" name="supplier" required><br><br>
            <label for="stock">Initial Stock:</label>
            <input type="number" id="stock" name="stock" required><br><br>
            <input type="submit" value="Add Product">
        </form>
        <div id="barcode"></div>
    `;

    document.getElementById('addProductForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addProduct();
    });
}

function loadInventoryPage() {
    fetch('get_inventory.php')
        .then(response => response.json())
        .then(data => {
            let inventoryTable = `
                <h2>Inventory</h2>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Supplier</th>
                        <th>Stock</th>
                    </tr>
            `;

            data.forEach(product => {
                inventoryTable += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.sku}</td>
                        <td>${product.supplier}</td>
                        <td>${product.stock}</td>
                    </tr>
                `;
            });

            inventoryTable += `</table>`;
            document.getElementById('content').innerHTML = inventoryTable;
        });
}

function addProduct() {
    const formData = new FormData(document.getElementById('addProductForm'));
    fetch('add_product.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadHomePage();
    });
}
