// Change port to 3001 to run the frontend
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('tiles');

    try {
        // Fetch wishlist items from the backend
        console.log("Inside try to fetch wishlist items"); // Debug
        const res = await fetch('http://127.0.0.1:3000/api/wishlist', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        console.log("Response from fetch wishlist items:", res); // Debug
        if (!res.ok) throw new Error('Failed to fetch wishlist');
        const items = await res.json()

        let itemsArray = Object.values(items.items); // Convert object to array

        container.innerHTML = ''; // Clear existing content

        itemsArray.forEach(item => {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.id = item.id; // Set the id of the tile to the product id

            tile.innerHTML = `
                <h4>${item.name}</h4>
                <br>
                <img src="${item.image || 'empty-image.jpg'}" alt="Product Image" width="200" height="200">
                <p>${item.description}</p>
                <p>Price: $${item.price}</p>
                <br>
                <button class="remove" data-id="${item.id}">Remove</button>
            `;

            container.appendChild(tile);
        });

        // Attach delete listeners after DOM is built
        document.querySelectorAll('.remove').forEach(btn => {
            btn.addEventListener('click', async () => {
                const productId = btn.dataset.id;
                let product = document.getElementById(productId);
                try {
                    const res = await fetch('http://127.0.0.1:3000/api/wishlist', {
                        method: "DELETE",
                        headers: { 
                            'Accept': 'application/json',
                            'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: productId,
                            name: product.querySelector('h4').innerText, 
                            image: product.querySelector('img').src, 
                            description: product.querySelector('p').innerText, 
                            price: product.querySelector('p:nth-of-type(2)').innerText
                        })
                    });

                    if (res.ok) {
                        btn.parentElement.remove(); // Remove tile from UI
                    } else {
                        alert('Failed to remove item');
                    }
                } catch (err) {
                    console.error(err);
                    alert('Error removing item');
                }
            });
        });

    } catch (err) {
        console.error('Error loading wishlist:', err);
    }
});
