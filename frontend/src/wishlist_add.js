let db;
const request = indexedDB.open("wishlist", 1);

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("IndexedDB opened successfully");
}

request.onerror = function(event) {
    console.error("IndexedDB error:", event.target.errorCode);
}

request.onupgradeneeded = function(event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains("items")) {
        db.createObjectStore("items", { keyPath: "id" });
    }
}

// document.addEventListener("DOMContentLoaded", function() {
//     const addButton = document.getElementById("add-v1p10"); // Assuming you have a button with id 'add-v1p10'
//     if (!addButton) return; // Exit if the button is not found
//     const itemId = document.getElementById("v1product1").value; // Assuming you have an element with id 'item-id'

//     addButton.addEventListener("click", function() {
//         const transaction = db.transaction(["items"], "readwrite");
//         const objectStore = transaction.objectStore("items");

//         const item = {
//             id: itemId,
//             name: itemName
//         };

//         const request = objectStore.add(item);

//         request.onsuccess = function(event) {
//             console.log("Item added to wishlist:", event.target.result);
//             alert("Item added to wishlist!");
//         };

//         request.onerror = function(event) {
//             console.error("Error adding item to wishlist:", event.target.errorCode);
//             alert("Error adding item to wishlist.");
//         };
//     });
// });

function addToWishlist(prodId) {
    const transaction = db.transaction(["items"], "readwrite");
    const store = transaction.objectStore("items");

    const prod = {
        id: prodId,
        name: document.querySelector(".prod-name").textContent,
        image: document.querySelector(".prod-img").src,
        description: document.querySelector(".prod-desc").textContent,
        price: document.querySelector(".prod-price").textContent
    };

    const request = store.add(prod);

    // transaction.oncomplete = function() {
    //     console.log("Item added to wishlist!");
    //     addToUI(); // Call the function to update the UI
    // }; 
    
    request.onsuccess = function() {
        console.log("Item added to wishlist!");
        alert("Item added to wishlist!");
        addToUI(); // Call the function to update the UI
    };

    request.onerror = function(event) {
        console.error("Error adding item:", event.target.errorCode);
        alert("This item is already in the wishlist.");
        addToUI(); // Call the function to update the UI
    }
}

function addToUI() {
    console.log("Entering addToUI function");
    const transaction = db.transaction(["items"], "readonly");
    const store = transaction.objectStore("items");

    const request = store.getAll();

    console.log("Request to get all items:", request);

    request.onsuccess = function(event) {
        console.log("Request entered:", event);
        const products = event.target.result;
        const wishlist = document.getElementById("tiles");

        wishlist.innerHTML = ""; // Clear previous items

        console.log("innerHTML cleared");
        console.log("Products:", products);

        products.forEach(item => {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = item.id; // Set the ID of the tile to the product ID

            tile.innerHTML = `
                <h4>${item.name}</h4>
                <img src="${item.image}" alt="${item.name}" width="200" height="200">
                <p>${item.description}</p>
                <p>Price: $${item.price}</p>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;

            wishlist.appendChild(tile);
        });

        const removeButtons = document.querySelectorAll(".remove");
        removeButtons.forEach(button => {
            button.addEventListener("click", function() {
                const prodId = button.getAttribute("data-id"); // Assuming you have a data attribute for product ID
                removeFromWishlist(prodId); // Call the function to remove the item
            });
        });
    }
    
}

function removeFromWishlist(prodId) {
    const transaction = db.transaction(["items"], "readwrite");
    const store = transaction.objectStore("items");

    const request = store.delete(prodId);

    request.onsuccess = function() {
        console.log("Item removed from wishlist!");
        addToUI(); // Call the function to update the UI
    };
}

document.addEventListener("DOMContentLoaded", function() {
    // const addButton = document.getElementById("add-v1p10"); // Assuming you have a button with id 'add-v1p10'
    // if (!addButton) return; // Exit if the button is not found
    // const itemId = document.getElementById("v1product1").value; // Assuming you have an element with id 'item-id'

    // addButton.addEventListener("click", function() {
    //     addToWishlist(itemId); // Call the function to add the item
    // });

    const addButtons = document.querySelectorAll(".add");
    addButtons.forEach(button => {
        button.addEventListener("click", function() {
            const prodId = button.getAttribute("data-id"); // Assuming you have a data attribute for product ID
            addToWishlist(prodId); // Call the function to add the item
        });
    });
});

// let db;
// const request = indexedDB.open("wishlist", 1);

// request.onsuccess = function(event) {
//     db = event.target.result;
//     console.log("IndexedDB opened successfully");
//     addToUI(); // Load wishlist items if on wishlist page

//     // Load wishlist items if on wishlist page
//     if (window.location.pathname.includes("wishlist.html")) {
//         addToUI();
//     }
// };

// request.onerror = function(event) {
//     console.error("IndexedDB error:", event.target.errorCode);
// };

// request.onupgradeneeded = function(event) {
//     db = event.target.result;
//     if (!db.objectStoreNames.contains("items")) {
//         db.createObjectStore("items", { keyPath: "id" });
//     }
// };

// // Add a product to the wishlist
// function addToWishlist(prodId, buttonElement) {
//     const productElement = buttonElement.closest(".tile");
//     const transaction = db.transaction(["items"], "readwrite");
//     const store = transaction.objectStore("items");

//     const prod = {
//         id: prodId,
//         // name: productElement.querySelector(".product-name").textContent,
//         // image: productElement.querySelector(".product-image").src,
//         // description: productElement.querySelector(".product-description").textContent,
//         // price: productElement.querySelector(".product-price").textContent
//         name: "Sample Product", // Replace with actual product name
//         image: "sample.jpg", // Replace with actual product image URL
//         description: "Sample Description", // Replace with actual product description
//         price: "$10.00" // Replace with actual product price
//     };

//     store.add(prod);

//     request.onsuccess = function() {
//         console.log("Item added to wishlist!");
//         alert("Item added to wishlist!");
//     };

//     request.onerror = function(event) {
//         console.error("Error adding item:", event.target.errorCode);
//         alert("This item is already in the wishlist.");
//     };
// }

// // Render the wishlist UI
// function addToUI() {
//     const transaction = db.transaction(["items"], "readonly");
//     const store = transaction.objectStore("items");

//     const request = store.getAll();

//     request.onsuccess = function(event) {
//         const products = event.target.result;
//         const wishlist = document.getElementById("wishlist-tiles");

//         wishlist.innerHTML = "";

//         products.forEach(item => {
//             const tile = document.createElement("div");
//             tile.classList.add("tile");
//             tile.id = item.id;

//             tile.innerHTML = `
//                 <h4 class="product-name">${item.name}</h4>
//                 <img class="product-image" src="${item.image}" alt="${item.name}" width="200" height="200">
//                 <p class="product-description">${item.description}</p>
//                 <p class="product-price">Price: ${item.price}</p>
//                 <button class="remove-btn" data-id="${item.id}">Remove</button>
//             `;

//             wishlist.appendChild(tile);
//         });

//         // Add event listeners to remove buttons
//         const removeButtons = document.querySelectorAll(".remove-btn");
//         removeButtons.forEach(button => {
//             button.addEventListener("click", function() {
//                 const prodId = button.getAttribute("data-id");
//                 removeFromWishlist(prodId);
//             });
//         });
//     };
// }

// // Remove a product from the wishlist
// function removeFromWishlist(prodId) {
//     const transaction = db.transaction(["items"], "readwrite");
//     const store = transaction.objectStore("items");

//     const request = store.delete(prodId);

//     request.onsuccess = function() {
//         console.log("Item removed from wishlist!");
//         addToUI();
//     };

//     request.onerror = function(event) {
//         console.error("Error removing item:", event.target.errorCode);
//     };
// }

// // Hook up 'add' buttons on the product page
// document.addEventListener("DOMContentLoaded", function() {
//     const addButtons = document.querySelectorAll(".add");
//     addButtons.forEach(button => {
//         button.addEventListener("click", function() {
//             const prodId = button.getAttribute("data-id");
//             addToWishlist(prodId, button);
//         });
//     });
// });

// // Hook up 'add' buttons on the wishlist page
// document.addEventListener("DOMContentLoaded", function() {
//     const removeButtons = document.querySelectorAll(".remove");
//     removeButtons.forEach(button => {
//         button.addEventListener("click", function() {
//             const prodId = button.getAttribute("data-id");
//             removeFromWishlist(prodId);
//         });
//     });
// });

// let db;
// const request = indexedDB.open("wishlist", 1);

// request.onsuccess = function(event) {
//     db = event.target.result;
//     console.log("IndexedDB opened successfully");

//     // Refresh the wishlist UI when IndexedDB is ready
//     addToUI();
// };

// request.onerror = function(event) {
//     console.error("IndexedDB error:", event.target.errorCode);
// };

// request.onupgradeneeded = function(event) {
//     db = event.target.result;
//     if (!db.objectStoreNames.contains("items")) {
//         db.createObjectStore("items", { keyPath: "id" });
//     }
// };

// // Function to add an item to the wishlist in IndexedDB
// function addToWishlist(prodId) {
//     const transaction = db.transaction(["items"], "readwrite");
//     const store = transaction.objectStore("items");

//     // Assuming you have product data from another source
//     const prod = {
//         id: prodId,
//         name: "Sample Product Name", // Fetch product name dynamically
//         image: "sample-image.jpg",   // Fetch product image dynamically
//         description: "Sample description",
//         price: "$10.00"
//     };

//     store.add(prod);

//     transaction.oncomplete = function() {
//         console.log("Item added to wishlist!");
//         // Trigger a storage event to refresh the wishlist
//         localStorage.setItem('wishlist-updated', Date.now());  // We use this to trigger the event
//     };
// }

// // Function to update the UI by getting all items from the wishlist
// function addToUI() {
//     const transaction = db.transaction(["items"], "readonly");
//     const store = transaction.objectStore("items");

//     const request = store.getAll();

//     request.onsuccess = function(event) {
//         const products = event.target.result;
//         const wishlist = document.getElementById("tiles");

//         wishlist.innerHTML = ""; // Clear previous items

//         products.forEach(item => {
//             const tile = document.createElement("div");
//             tile.classList.add("tile");
//             tile.id = item.id;

//             tile.innerHTML = `
//                 <h4>${item.name}</h4>
//                 <img src="${item.image}" alt="${item.name}" width="200" height="200">
//                 <p>${item.description}</p>
//                 <p>Price: ${item.price}</p>
//                 <button class="remove-btn" data-id="${item.id}">Remove</button>
//             `;

//             wishlist.appendChild(tile);
//         });

//         // Attach event listeners to remove buttons
//         const removeButtons = document.querySelectorAll(".remove-btn");
//         removeButtons.forEach(button => {
//             button.addEventListener("click", function() {
//                 const prodId = button.getAttribute("data-id");
//                 removeFromWishlist(prodId);
//             });
//         });
//     };
// }

// // Function to remove an item from the wishlist
// function removeFromWishlist(prodId) {
//     const transaction = db.transaction(["items"], "readwrite");
//     const store = transaction.objectStore("items");

//     const request = store.delete(prodId);

//     request.onsuccess = function() {
//         console.log("Item removed from wishlist!");
//         localStorage.setItem('wishlist-updated', Date.now());  // Trigger update
//     };
// }

// // Listen for the storage event to update the wishlist across tabs
// window.addEventListener("storage", function(event) {
//     if (event.key === "wishlist-updated") {
//         addToUI(); // Refresh the UI when data changes in another tab
//     }
// });

// // Initialize the UI when the page loads
// document.addEventListener("DOMContentLoaded", function() {
//     addToUI();

//     const addButtons = document.querySelectorAll(".add");
//     addButtons.forEach(button => {
//         button.addEventListener("click", function() {
//             console.log("Add button clicked!");
//             const prodId = button.getAttribute("data-id");
//             addToWishlist(prodId);
//         });
//     });
// });
