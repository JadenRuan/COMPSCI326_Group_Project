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

function addToWishlist(prodId) {
    const transaction = db.transaction(["items"], "readwrite");
    const store = transaction.objectStore("items");

    store.clear(); // Clear the store before adding new items

    const prod = {
        id: prodId,
        name: document.querySelector(".prod-name").textContent,
        image: document.querySelector(".prod-img").src,
        description: document.querySelector(".prod-desc").textContent,
        price: document.querySelector(".prod-price").textContent
    };

    const request = store.add(prod);
    
    request.onsuccess = function() {
        console.log("Request result", request.result);
        console.log("Item added to wishlist!");
        alert("Item added to wishlist!");
        addToUI(); // Call the function to update the UI
    };

    request.onerror = function(event) {
        console.log("Request result", request.result);
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

    window.location.href = "wishlist.html"; // Redirect to wishlist page
    console.log("Redirecting to wishlist.html");

    if (window.location.pathname.includes("wishlist.html")) {
        console.log("In wishlist.html")
        
        const wishlist = document.getElementById("tiles");
        console.log("Wishlist element:", wishlist);

        request.onsuccess = function(event) {
            console.log("Request entered:", event);
            const products = event.target.result;
            
            console.log(wishlist);

            wishlist.innerHTML = ""; // Clear previous items

            console.log("innerHTML cleared");
            console.log("Products:", products);

            products.forEach(item => {
                console.log("Item:", item);
                const tile = document.createElement("div");
                tile.classList.add("tile");
                console.log("Tile created:", tile);
                tile.id = item.id; // Set the ID of the tile to the product ID

                tile.innerHTML = `
                    <h4>${item.name}</h4>
                    <img src="${item.image}" alt="${item.name}" width="200" height="200">
                    <p>${item.description}</p>
                    <p>Price: $${item.price}</p>
                    <button class="remove-btn" data-id="${item.id}">Remove</button>
                `;

                console.log("Tile innerHTML set:", tile.innerHTML);

                wishlist.appendChild(tile);
                console.log("Tile appended to wishlist:", tile);
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
    const addButtons = document.querySelectorAll(".add");
    addButtons.forEach(button => {
        button.addEventListener("click", function() {
            const prodId = button.getAttribute("data-id"); // Assuming you have a data attribute for product ID
            addToWishlist(prodId); // Call the function to add the item
        });
    });
});

// if (window.location.pathname.includes("wishlist.html")) {
//     window.addEventListener("DOMContentLoaded", addToUI());
// }