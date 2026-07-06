// =========================================
// GET CATEGORY
// =========================================

const params = new URLSearchParams(window.location.search);

const selectedCategory = params.get("category");

const container = document.getElementById("productsContainer");

const title = document.getElementById("categoryTitle");

const noProducts = document.getElementById("noProducts");

const searchInput = document.getElementById("searchInput");

if (selectedCategory) {
    title.innerHTML =
        selectedCategory.charAt(0).toUpperCase() +
        selectedCategory.slice(1) +
        " Products";
}
else {
    title.innerHTML = "All Products";
}


// =========================================
// SHOW PRODUCTS
// =========================================

function displayProducts(search = "") {

    container.innerHTML = "";

    const filtered = products.filter(product => {

        const categoryMatch = !selectedCategory || product.category === selectedCategory;

        const searchMatch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        return categoryMatch && searchMatch;

    });

    if (filtered.length === 0) {

        noProducts.style.display = "block";
        return;

    }

    noProducts.style.display = "none";

    filtered.forEach(product => {

        container.innerHTML += `

        <div class="product-card">

            <span class="discount">${product.discount}</span>

            <div class="product-image">

                <img src="${product.image}" alt="">

            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <div class="rating">

                    ${product.rating}

                </div>

                <div class="price">

                    <span class="new-price">

                        ₹${product.price}

                    </span>

                    <span class="old-price">

                        ₹${product.oldPrice}

                    </span>

                </div>

                <button class="add-cart">

                    Add To Cart

                </button>

            </div>

        </div>

        `;

    });

}



// =========================================
// SEARCH
// =========================================

searchInput.addEventListener("keyup", () => {

    displayProducts(searchInput.value);

});



// =========================================
// START
// =========================================

displayProducts();



// =========================================
// ADD TO CART
// =========================================

document.addEventListener("click", (e) => {

    if (!e.target.classList.contains("add-cart")) return;

    // Login Check
    const currentUser = JSON.parse(localStorage.getItem("quicklocal_current_user"));

    if (!currentUser) {

        alert("Please Login First");

        window.location.href = "../Html/login.html";

        return;
    }

    // Product Card
    const card = e.target.closest(".product-card");

    const name = card.querySelector("h3").innerText;

    const price = Number(
        card.querySelector(".new-price").innerText.replace("₹", "")
    );

    const image = card.querySelector("img").src;

    // User Cart Key
    const cartKey = "cart_" + currentUser.email;

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Product Exists?
    const existing = cart.find(item => item.name === name);

    if (existing) {

        existing.qty++;

    } else {

        cart.push({

            name,

            price,

            image,

            qty: 1

        });

    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    alert("Product Added Successfully 🛒");

});