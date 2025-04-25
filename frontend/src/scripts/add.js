const baseUrl = 'http://localhost:3000/api/wishlist';

document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.add');
    console.log('Add buttons found:', addButtons.length);  // Debug

    addButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const productId = btn.dataset.id;
            // const productId = btn.closest('.tile').id;
            console.log('Clicked button for productId:', productId);  // Debug
            try {
                const res = await fetch("/api/wishlist/add", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: productId })
                });

                if (!res.ok) throw new Error(`Server error: ${res.status}`);

                alert(`Added ${productId} to wishlist.`);
            } catch (err) {
                console.error('Fetch error:', err);
            }
        });
    });
});
