// =========================================
// TRENDING PRODUCTS
// =========================================

// products.js me products array hona chahiye

const trendingContainer = document.getElementById("trendingProducts");

if (trendingContainer && typeof products !== "undefined") {

    const categories = [

        "grocery",
        "restaurant",
        "medicine",
        "services"

    ];

    let trendingProducts = [];

    categories.forEach(category => {

        const items = products
            .filter(product => product.category === category)
            .slice(0, 2);

        trendingProducts.push(...items);

    });

    trendingProducts.forEach(product => {

        trendingContainer.innerHTML += `

        <div class="trending-card"
        onclick="openCategory('${product.category}')">

            <span class="trending-discount">

                ${product.discount}

            </span>

            <div class="trending-image">

                <img src="${product.image}" alt="${product.name}">

            </div>

            <div class="trending-info">

                <h3>${product.name}</h3>

                <div class="trending-rating">

                    ${product.rating}

                </div>

                <div class="trending-price">

                    <span class="new-price">

                        ₹${product.price}

                    </span>

                    <span class="old-price">

                        ₹${product.oldPrice}

                    </span>

                </div>

                <button
                    class="trending-btn"
                    onclick="event.stopPropagation();addTrendingToCart('${product.name}')">

                    Add To Cart

                </button>

            </div>

        </div>

        `;

    });

}



// =========================================
// OPEN CATEGORY
// =========================================

function openCategory(category){

    window.location.href =
    "../Html/products.html?category=" + category;

}



// =========================================
// ADD TO CART
// (Temporary)
// =========================================

function addTrendingToCart(name){

    alert(name + " added to cart.");

}