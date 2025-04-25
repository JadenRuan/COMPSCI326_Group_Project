document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('tiles');

    try {
        // Fetch wishlist items from the backend
        const res = await fetch('/api/wishlist', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error('Failed to fetch wishlist');
        const items = await res.json();

        container.innerHTML = ''; // Clear existing content

        items.forEach(item => {
            const tile = document.createElement('div');
            tile.className = 'tile';

            tile.innerHTML = `
                <h4>${item.name}</h4>
                <br>
                <img src="${item.image || 'empty-image.jpg'}" alt="Product Image" width="200" height="200">
                <p>${item.description}</p>
                <p>Price: $${item.price}</p>
                <button class="remove" data-id="${item.id}">Remove</button>
            `;

            container.appendChild(tile);
        });

        // Attach delete listeners after DOM is built
        document.querySelectorAll('.remove').forEach(btn => {
            btn.addEventListener('click', async () => {
                const productId = btn.dataset.id;
                try {
                    const res = await fetch('/api/wishlist', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ productId })
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
