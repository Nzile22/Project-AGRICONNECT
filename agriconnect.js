document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000';

//     // Wait for the DOM to fully load
// document.addEventListener("DOMContentLoaded", () => {
    // Select buttons by their IDs
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");

    // Redirect to login.html
    loginButton.addEventListener("click", () => {
        window.location.href = "login.html";
    });

    // Redirect to register.html
    registerButton.addEventListener("click", () => {
        window.location.href = "register.html";
    });
});

// Function to show Login form (example implementation)
function showLoginForm() {
    // You can create and display a login form dynamically or redirect to a login page
    const loginForm = `
        <div id="loginForm">
            <h3>Login</h3>
            <input type="text" placeholder="Username" id="username">
            <input type="password" placeholder="Password" id="password">
            <button onclick="submitLogin()">Submit</button>
            <button onclick="closeForm()">Close</button>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", loginForm);
}

// Function to show Register form (example implementation)
function showRegisterForm() {
    const registerForm = `
        <div id="registerForm">
            <h3>Register</h3>
            <input type="text" placeholder="Full Name" id="fullName">
            <input type="email" placeholder="Email" id="email">
            <input type="password" placeholder="Password" id="registerPassword">
            <button onclick="submitRegister()">Submit</button>
            <button onclick="closeForm()">Close</button>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", registerForm);
}

// Function to handle Login submission (example)
function submitLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    alert(`Logging in with Username: ${username}`);
    // Here, you can send the data to a server using fetch() or XMLHttpRequest
    closeForm();
}

// Function to handle Register submission (example)
function submitRegister() {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("registerPassword").value;
    alert(`Registering with Full Name: ${fullName}, Email: ${email}`);
    // Send the registration data to a server here
    closeForm();
}

// Function to close the forms
function closeForm() {
    const form = document.getElementById("loginForm") || document.getElementById("registerForm");
    if (form) {
        form.remove();
    }
}

const apiUrl = 'http://localhost:3001'; 
    const productList = document.getElementById('productList');
    const  cartItems = document.getElementById('cartItems');

    const fetchProducts = async () => {
        const response = await fetch(`${'http://localhost:3001'}/medicines`);
        const medicines = await response.json();

        productList.innerHTML = '';
        medicines.forEach((medicine) => {
            const div = document.createElement('div');
            div.className = 'product';
            div.innerHTML = `
                <h3>${medicine.name}</h3>
                <p>Price: $${medicine.price}</p>
                <button onclick="addToCart(${medicine.id}, '${medicine.name}', ${medicine.price})">Add to Cart</button>
            `;
            productList.appendChild(div);
        });
    };
    const addToCart = (id, name, price) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h3>${name}</h3>
            <p>Price: $${price}</p>
        `;
        cartItems.appendChild(cartItem);
    };

    fetchProducts();