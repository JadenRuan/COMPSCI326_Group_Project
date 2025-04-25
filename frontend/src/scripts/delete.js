// const baseUrl = 'http://localhost:3000/api/wishlist';

document.addEventListener('DOMContentLoaded', () => {
    const removeButtons = document.querySelectorAll('.remove');

    removeButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const productId = btn.previousElementSibling?.dataset?.id;
            try {
                await fetch("/api/wishlist", {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId })
                });
                alert(`Removed ${productId} from wishlist.`);
                location.reload(); // Optional: refresh to update UI
            } catch (err) {
                console.error(err);
            }
        });
    });
});
