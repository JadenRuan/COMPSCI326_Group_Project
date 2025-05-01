// Change port to 3001 to run the frontend
document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.add');

    addButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const productId = btn.dataset.id;
            // const productId = btn.closest('.tile').id;
            let product = document.getElementById(productId);
            try {
                const res = await fetch("http://127.0.0.1:3000/api/wishlist", {
                    method: "POST",
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({ id: productId,
                        name: product.querySelector('h4').innerText, 
                        image: product.querySelector('img').src, 
                        description: product.querySelector('p').innerText, 
                        price: product.querySelector('p:nth-of-type(2)').innerText })
                });

                if (!res.ok) throw new Error(`Server error: ${res.status}`);

                alert(`Added ${productId} to wishlist.`);
           } catch (err) {
               console.error('Fetch error:', err);
           }
        });
    });
});

// const addButtons = document.querySelectorAll('.add');

// addButtons.forEach(button => {
//     button.addEventListener('click', async () => {
//         const productId = button.dataset.id;

//         const body = { id: productId };

//         try {
//             const res = await fetch("/api/wishlist", {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(body)
//             });

//             if (!res.ok) {
//                 const errorText = await res.text();
//                 throw new Error(`Error ${res.status}: ${errorText}`);
//             }

//             alert(`Added ${productId} to wishlist.`);
//         } catch (err) {
//             console.error("Wishlist POST error:", err);
//         }
//     });
// });
