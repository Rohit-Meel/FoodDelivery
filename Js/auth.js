/*==================================================
        QUICKLOCAL AUTH V2 - PART A
        Signup + Login + Multiple Users
==================================================*/

// ---------- Local Storage Keys ----------

const USERS_KEY = "quicklocal_users";
const CURRENT_USER_KEY = "quicklocal_current_user";


// ---------- Helper Functions ----------

function getUsers() {

    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];

}

function saveUsers(users) {

    localStorage.setItem(USERS_KEY, JSON.stringify(users));

}

function getCurrentUser() {

    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));

}

function setCurrentUser(user) {

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

}

function logoutUser() {

    localStorage.removeItem(CURRENT_USER_KEY);

}



//==================================================
//                  SIGNUP
//==================================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document
            .getElementById("signupName")
            .value
            .trim();

        const email = document
            .getElementById("signupEmail")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("signupPassword")
            .value;

        const confirmPassword = document
            .getElementById("signupConfirmPassword")
            .value;



        // Empty Validation

        if (!name || !email || !password || !confirmPassword) {

            alert("Please fill all fields.");

            return;

        }



        // Password Match

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }



        // Existing Users

        const users = getUsers();



        // Duplicate Email Check

        const alreadyExists = users.find(

            user => user.email === email

        );



        if (alreadyExists) {

            alert("Email already registered.");

            return;

        }



        // New User

        const newUser = {

            id: Date.now(),

            name: name,

            email: email,

            password: password,

            createdAt: new Date().toISOString()

        };



        users.push(newUser);

        saveUsers(users);



        alert("Account Created Successfully.");



        window.location.href = "../Html/login.html";

    });

}



//==================================================
//                  LOGIN
//==================================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("loginPassword")
            .value;



        const users = getUsers();



        const user = users.find(

            u =>

                u.email === email &&

                u.password === password

        );



        if (!user) {

            alert("Invalid Email or Password.");

            return;

        }



        setCurrentUser(user);



        alert("Login Successful.");


        window.location.href = "../Html/index.html";

    });

}

/*==================================================
        QUICKLOCAL AUTH V2 - PART B
        Session + Header + Logout + Protection
==================================================*/

// ---------- Current User ----------

const currentUser = getCurrentUser();



//==================================================
//                  HEADER
//==================================================

const loginLink = document.getElementById("loginLink");
const logoutLink = document.getElementById("logoutLink");
const userName = document.getElementById("userName");
const displayName = document.getElementById("displayName");

if (currentUser) {

    if (loginLink)
        loginLink.style.display = "none";

    if (logoutLink)
        logoutLink.style.display = "flex";

    if (userName)
        userName.style.display = "inline";

    if (displayName)
        displayName.textContent = currentUser.name;

} else {

    if (loginLink)
        loginLink.style.display = "flex";

    if (logoutLink)
        logoutLink.style.display = "none";

    if (userName)
        userName.style.display = "none";

}



//==================================================
//                  LOGOUT
//==================================================

if (logoutLink) {

    logoutLink.addEventListener("click", function (e) {

        e.preventDefault();

        logoutUser();

        alert("Logged Out Successfully.");

        window.location.href = "../Html/login.html";

    });

}



//==================================================
//              PAGE PROTECTION
//==================================================

const page = window.location.pathname.toLowerCase();

const protectedPages = [

    "profile.html",

    "wishlist.html"

];

const isProtected = protectedPages.some(name => page.includes(name));

if (isProtected && !currentUser) {

    alert("Please Login First.");

    window.location.href = "../Html/login.html";

}



//==================================================
//              PROFILE PAGE
//==================================================

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const logoutBtn = document.getElementById("logoutBtn");

if (profileName && currentUser) {

    profileName.textContent = currentUser.name;

}

if (profileEmail && currentUser) {

    profileEmail.textContent = currentUser.email;

}

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        logoutUser();

        alert("Logged Out Successfully.");

        window.location.href = "../Html/login.html";

    });

}



//==================================================
//          UPDATE CURRENT USER
//==================================================

function updateCurrentUser(updatedUser) {

    const users = getUsers();

    const index = users.findIndex(user => user.id === updatedUser.id);

    if (index !== -1) {

        users[index] = updatedUser;

        saveUsers(users);

        setCurrentUser(updatedUser);

    }

}



//==================================================
//          GLOBAL USER OBJECT
//==================================================

window.quickLocalAuth = {

    getUsers,

    saveUsers,

    getCurrentUser,

    setCurrentUser,

    logoutUser,

    updateCurrentUser

};