let cart = [];
let medicines = []; // Declare medicines array to store fetched medicines

// Modal elements
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');

// Button elements
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const closeLogin = document.getElementById('close-login');
const closeRegister = document.getElementById('close-register');

// Open login modal
loginBtn.onclick = function() {
    loginModal.style.display = "block";
}

// Open register modal
registerBtn.onclick = function() {
    registerModal.style.display = "block";
}

// Close login modal
closeLogin.onclick = function() {
    loginModal.style.display = "none";
}

// Close register modal
closeRegister.onclick = function() {
    registerModal.style.display = "none";
}

// Fetch medicines from db.json
async function fetchMedicines() {
    try {
        const response = await fetch('db.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        medicines = data.medicines; // Store fetched medicines in the global array
        displayMedicines(medicines);
    } catch (error) {
        console.error('Error fetching medicines:', error);
        alert('Failed to load medicines. Please try again later.'); // User feedback
    }
}

// Display medicines
function displayMedicines(medicines) {
    const medicinesContainer = document.getElementById('medicines');
    medicinesContainer.innerHTML = '';
    medicines.forEach(medicine => {
        const medicineDiv = document.createElement('div');
        medicineDiv.className = 'product';
        medicineDiv.innerHTML = `
            <img src="${medicine.image}" alt="${medicine.name}" style="width:100px; height:100px;">
            <span>${medicine.name} - $${medicine.price}</span>
            <p>${medicine.description}</p> <!-- Display the description -->
            <select id="quantity-${medicine.id}">
                ${Array.from({ length: medicine.quantity }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
            </select>
            <button class="add-to-cart" onclick="addToCart(${medicine.id})">Add to Cart</button>
        `;
        medicinesContainer.appendChild(medicineDiv);
    });
}

// Add to cart
function addToCart(id) {
    const quantitySelect = document.getElementById(`quantity-${id}`);
    const quantity = parseInt(quantitySelect.value, 10); // Get selected quantity
    console.log('Adding to cart:', id, 'Quantity:', quantity); // Debugging statement

    const medicine = cart.find(item => item.id === id);
    if (medicine) {
        medicine.quantity += quantity; // Update quantity
    } else {
        cart.push({ id, quantity }); // Add new item with selected quantity
    }
    console.log('Current cart:', cart); // Debugging statement
    displayCart(); // Update the cart display
}

// Display cart
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous cart items
    cart.forEach(item => {
        const medicine = medicines.find(med => med.id === item.id);
        if (medicine) { // Check if medicine exists
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <span>${medicine.name} - $${medicine.price} x ${item.quantity}</span>
                <button class="remove-from-cart" onclick="removeFromCart(${ item.id})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        }
    });
}

// Remove from cart
function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
        cart.splice(index, 1);
    }
    displayCart(); // Update the cart display after removal
}

// Checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Checkout successful!');
        cart = []; // Clear the cart after checkout
        displayCart(); // Update the cart display
    } else {
        alert('Your cart is empty!');
    }
});

// Initialize
fetchMedicines();