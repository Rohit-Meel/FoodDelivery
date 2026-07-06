// =====================================
// QUICKLOCAL CART
// =====================================

const logedUser = JSON.parse(localStorage.getItem("quicklocal_current_user"));

if (!logedUser) {

    alert("Please Login First");

    window.location.href = "../Html/login.html";

}

const cartKey = "cart_" + currentUser.email;

let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

const cartItems = document.getElementById("cartItems");
const totalItems = document.getElementById("totalItems");
const totalPrice = document.getElementById("totalPrice");
const emptyCart = document.getElementById("emptyCart");



// =====================================
// SAVE CART
// =====================================

function saveCart() {

    localStorage.setItem(cartKey, JSON.stringify(cart));

}



// =====================================
// DISPLAY CART
// =====================================

function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        document.querySelector(".cart-container").style.display = "none";

        emptyCart.style.display = "block";

        return;

    }

    document.querySelector(".cart-container").style.display = "grid";

    emptyCart.style.display = "none";



    let items = 0;

    let total = 0;



    cart.forEach((product, index) => {

        items += product.qty;

        total += product.price * product.qty;



        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${product.image}">

            <div class="item-details">

                <h3>${product.name}</h3>

                <div class="item-price">

                    ₹${product.price}

                </div>

                <div class="qty-box">

                    <button class="qty-btn minus" data-index="${index}">-</button>

                    <span>${product.qty}</span>

                    <button class="qty-btn plus" data-index="${index}">+</button>

                </div>

                <button class="remove-btn"

                data-index="${index}">

                Remove

                </button>

            </div>

        </div>

        `;

    });



    totalItems.innerHTML = items;

    totalPrice.innerHTML = "₹" + total;

}



// =====================================
// BUTTON EVENTS
// =====================================

document.addEventListener("click", function(e){

    const index = e.target.dataset.index;

    if(index===undefined) return;



    if(e.target.classList.contains("plus")){

        cart[index].qty++;

    }



    if(e.target.classList.contains("minus")){

        if(cart[index].qty>1){

            cart[index].qty--;

        }

    }



    if(e.target.classList.contains("remove-btn")){

        cart.splice(index,1);

    }



    saveCart();

    displayCart();

});



// =====================================
// CHECKOUT
// =====================================

const checkoutBtn=document.getElementById("checkoutBtn");

if(checkoutBtn){

checkoutBtn.onclick=function(){

alert("Checkout Coming Soon 🚀");

}

}



// =====================================
// START
// =====================================

displayCart();








