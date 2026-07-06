// =========================================
// HEADER JAVASCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");
    const searchInput = document.querySelector(".search-form input");
    const searchForm = document.querySelector(".search-form");
    const cartCount = document.querySelector(".cart-count");



    // =========================================
    // HEADER SHADOW ON SCROLL
    // =========================================

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            header.style.boxShadow = "0 10px 35px rgba(0,0,0,0.12)";
            header.style.background = " #fc0000";

        } else {

            header.style.boxShadow = "0 5px 25px rgba(0,0,0,.08)";
            header.style.background = " #fc0000";

        }

    });



    // =========================================
    // SEARCH INPUT EFFECT
    // =========================================

    searchInput.addEventListener("focus", () => {

        searchForm.style.transform = "scale(1.02)";

    });

    searchInput.addEventListener("blur", () => {

        searchForm.style.transform = "scale(1)";

    });



    // =========================================
    // SEARCH VALIDATION
    // =========================================

    searchForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let value = searchInput.value.trim();

        if (value === "") {

            alert("Please enter something to search.");

            searchInput.focus();

            return;

        }

        console.log("Searching for:", value);

        // Future:
        // window.location.href = `search.html?q=${encodeURIComponent(value)}`;

    });



    // =========================================
    // CART FUNCTION (FUTURE READY)
    // =========================================

    let cartItems = 0;

    function updateCart(number) {

        cartItems = number;

        cartCount.textContent = cartItems;

    }

    // Initial Count
    updateCart(0);



    // =========================================
    // PAGE FADE IN
    // =========================================

    document.body.style.opacity = "0";

    setTimeout(() => {

        document.body.style.transition = "opacity .4s ease";

        document.body.style.opacity = "1";

    }, 100);

});

/*=========================================
            NAVBAR JAVASCRIPT
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // ELEMENTS
    // ===============================


    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");



    // ===============================
    // MOBILE MENU TOGGLE
    // ===============================

    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (navMenu.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }



    // ===============================
    // CLOSE MENU AFTER CLICK
    // ===============================

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 992) {

                navMenu.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    });



    // ===============================
    // CLICK OUTSIDE MENU
    // ===============================

    document.addEventListener("click", (e) => {

        if (
            navMenu &&
            menuToggle &&
            !navMenu.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {

            navMenu.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });



    // ===============================
    // ACTIVE PAGE
    // ===============================

    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (
            href === currentPage ||
            (currentPage === "" && href === "index.html")
        ) {

            link.classList.add("active");

        }

    });



    // ===============================
    // NAVBAR SHADOW
    // ===============================

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            navbar.style.boxShadow = "0 10px 25px rgba(0,0,0,.12)";

        } else {

            navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,.05)";

        }

    });

});
// ================================
// Hero Slider
// ================================

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const slider = document.querySelector(".slider");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let current = 0;
let autoSlide;

// ================================
// Show Slide
// ================================

function showSlide(index) {

    slides.forEach((slide) => {

        slide.classList.remove("active");

    });

    dots.forEach((dot) => {

        dot.classList.remove("active");

    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

}

// ================================
// Next
// ================================

function nextSlide() {

    current++;

    if (current >= slides.length) {

        current = 0;

    }

    showSlide(current);

}

// ================================
// Previous
// ================================

function prevSlide() {

    current--;

    if (current < 0) {

        current = slides.length - 1;

    }

    showSlide(current);

}

// ================================
// Auto Slide
// ================================

function startSlider() {

    autoSlide = setInterval(() => {

        nextSlide();

    }, 6000);

}

function stopSlider() {

    clearInterval(autoSlide);

}

// ================================
// Buttons
// ================================

if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
        stopSlider();
        nextSlide();
        startSlider();
    });

    prevBtn.addEventListener("click", () => {
        stopSlider();
        prevSlide();
        startSlider();
    });
}

// ================================
// Dots
// ================================

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        stopSlider();

        current = index;

        showSlide(current);

        startSlider();

    });

});

// ================================
// Pause On Hover
// ================================

slider.addEventListener("mouseenter", stopSlider);

slider.addEventListener("mouseleave", startSlider);

// ================================
// Keyboard
// ================================

document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight") {

        stopSlider();

        nextSlide();

        startSlider();

    }

    if (e.key === "ArrowLeft") {

        stopSlider();

        prevSlide();

        startSlider();

    }

});

// ================================
// Touch Swipe
// ================================

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener("touchstart", (e) => {

    touchStartX = e.changedTouches[0].screenX;

});

slider.addEventListener("touchend", (e) => {

    touchEndX = e.changedTouches[0].screenX;

    if (touchEndX < touchStartX - 50) {

        stopSlider();

        nextSlide();

        startSlider();

    }

    if (touchEndX > touchStartX + 50) {

        stopSlider();

        prevSlide();

        startSlider();

    }

});

// ================================
// Start
// ================================

showSlide(current);
startSlider();

// ========================================
//
// CATEGORY SECTION
//
// ========================================

const cards = document.querySelectorAll(".category");

cards.forEach((card) => {

    // Click Animation
    card.addEventListener("click", function () {

        card.style.transform = "scale(0.96)";

        setTimeout(() => {

            card.style.transform = "";

        }, 150);

    });

    // Keyboard Support
    card.setAttribute("tabindex", "0");

    card.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            card.querySelector("a").click();

        }

    });

});

// ========================================
//
// RIPPLE EFFECT
//
// ========================================

cards.forEach((card) => {

    card.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const rect = card.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";

        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

        ripple.classList.add("ripple");

        card.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior: "smooth"

        });

    });

});

const topBtn = document.getElementById("topBtn");

// Scroll hone par button show/hide
window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

// Click karte hi turant top par
topBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
});

const shopBtn = document.querySelector(".shop-btn");

shopBtn.addEventListener("click", function () {
    console.log("Shop Now Clicked!");
});

/*=========================================
            LOADING SCREEN
=========================================*/

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    // Agar loader HTML me nahi hai to error na aaye
    if (!loader) return;

    // 2.5 second tak loader dikhega
    setTimeout(function () {

        loader.classList.add("hide");

        // Fade animation complete hone ke baad remove
        setTimeout(function () {

            loader.style.display = "none";

        }, 800);

    }, 2000);

});

