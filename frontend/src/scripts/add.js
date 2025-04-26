document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.add');
    console.log('Add buttons found:', addButtons.length);  // Debug
    console.log('Add buttons:', addButtons);  // Debug

    addButtons.forEach(btn => {
        console.log('Button:', btn);  // Debug
        console.log('Button ID:', btn.dataset.id);  // Debug
        btn.addEventListener('click', async () => {
            const productId = btn.dataset.id;
            // const productId = btn.closest('.tile').id;
            let product = document.getElementById(productId);
            console.log('Product:', product);  // Debug
            console.log('Clicked button for productId:', productId);  // Debug
            try {
                console.log('Sending fetch request to add productId:', productId);  // Debug
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
                console.log('Fetch response:', res);  // Debug

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
