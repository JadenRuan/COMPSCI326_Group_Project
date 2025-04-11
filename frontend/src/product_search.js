function search() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const products = document.querySelectorAll(".prod-name");

    products.forEach(product => {
        const productName = product.textContent.toLowerCase();
        if (productName.includes(searchInput)) {
            product.closest('.tile').style.display = "block"; // Show matching product
        } else {
            product.closest('.tile').style.display = "none"; // Hide non-matching product
        }
    });
}
