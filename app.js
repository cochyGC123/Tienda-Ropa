const database = {
    products: [
        { id: 1, name: "Camisa Blanca", price: 500, image: "IMG/camisa-blanca.jpg" },
        { id: 2, name: "Jeans Azules", price: 700, image: "IMG/jeans-azules.jpg" },
        { id: 3, name: "Vestido Rojo", price: 1000, image: "IMG/vestido-rojo.jpg" },
        { id: 4, name: "Suéter Negro", price: 800, image: "IMG/sueter-negro.jpg" },
        { id: 5, name: "Falda Floral", price: 600, image: "IMG/falda-floral.jpg" },
        { id: 6, name: "Chaqueta de Cuero", price: 1500, image: "IMG/chaqueta-cuero.jpg" },
        { id: 7, name: "Camisa Rayada", price: 550, image: "IMG/camisa-rayada.jpg" },
        { id: 8, name: "Pantalón Beige", price: 750, image: "IMG/pantalon-beige.jpg" },
        { id: 9, name: "Blusa Verde", price: 650, image: "IMG/blusa-verde.jpg" },
        { id: 10, name: "Zapatos Negros", price: 1200, image: "IMG/zapatos-negros.jpg" },
        { id: 11, name: "Sombrero Marrón", price: 450, image: "IMG/sombrero-marron.jpg" },
        { id: 12, name: "Abrigo Gris", price: 2000, image: "IMG/abrigo-gris.jpg" },
    ],
    cart: JSON.parse(localStorage.getItem("cart")) || [],
};

// Función para renderizar los productos
function loadProducts() {
    const productsContainer = document.getElementById("products");
    database.products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Añadir al carrito</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Función para añadir un producto al carrito
function addToCart(productId) {
    const product = database.products.find((p) => p.id === productId);
    const existingItem = database.cart.find((item) => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        database.cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(database.cart));
    updateCartView();
    alert(`${product.name} añadido al carrito.`);
}

// Función para actualizar la vista del carrito
function updateCartView() {
    const cartItems = document.getElementById("cart-items");
    const cartButton = document.getElementById("cart-button");
    cartItems.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    database.cart.forEach((item, index) => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p>Precio: $${item.price}</p>
            <div class="quantity-controls">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById("total-price").textContent = `Total: $${totalPrice}`;
    cartButton.textContent = `🛒 Carrito (${totalItems})`;

    const emptyMessage = document.createElement("p");
    emptyMessage.id = "empty-cart-message";
    emptyMessage.textContent = "El carrito está vacío.";
    emptyMessage.classList.add("hidden");

    if (database.cart.length === 0) {
        cartItems.appendChild(emptyMessage);
        emptyMessage.classList.remove("hidden");
    }
}

// Cambiar cantidad de un producto en el carrito
function changeQuantity(index, delta) {
    database.cart[index].quantity += delta;

    if (database.cart[index].quantity <= 0) {
        database.cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(database.cart));
    updateCartView();
}

// Eliminar un producto del carrito
function removeFromCart(index) {
    database.cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(database.cart));
    updateCartView();
}

// Vaciar el carrito
function clearCart() {
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        database.cart = [];
        localStorage.setItem("cart", JSON.stringify(database.cart));
        updateCartView();
    }
}

// Configuración del modal del carrito
function setupModal() {
    const cartButton = document.getElementById("cart-button");
    const modal = document.getElementById("cart-modal");
    const closeCart = document.getElementById("close-cart");
    const clearCartButton = document.getElementById("clear-cart");

    cartButton.addEventListener("click", () => {
        modal.classList.toggle("hidden");
    });

    closeCart.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    clearCartButton.addEventListener("click", clearCart);
}

// Configuración del botón de cierre de sesión
function setupLogoutButton() {
    const logoutButton = document.getElementById("logout-button");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));

    if (loggedInUser) {
        logoutButton.classList.remove("hidden");
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            alert("Sesión cerrada con éxito.");
            window.location.href = "login.html";
        });
    }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    updateCartView();
    setupModal();
    setupLogoutButton();
});
