document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Iphone 12", price: 59.99 },
    { id: 2, name: "Samsung Galaxy S21", price: 49.99 },
    { id: 3, name: "Google Pixel 5", price: 39.99 },
  ];

  const cart = [];

  const productList = document.getElementById("product-list");
  const cartList = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");

  // --- RENDER PRODUCTS ---
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });

  // --- EVENT LISTENERS ---

  // Listen for clicks on the "Add to Cart" buttons
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      if (product) {
        addToCart(product);
      }
    }
  });

  // *** NEW: Listen for clicks on the "Remove" buttons within the cart ***
  cartList.addEventListener("click", (e) => {
    // Check if a remove button was clicked
    if (e.target.classList.contains("remove-btn")) {
      const itemIndex = parseInt(e.target.getAttribute("data-index"));
      removeFromCart(itemIndex);
    }
  });

  checkoutButton.addEventListener("click", () => {
    alert("Checkout Successful!");
    cart.length = 0; // Clear the cart array
    renderCart();
  });

  // --- FUNCTIONS ---

  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  // *** NEW: Function to remove an item from the cart ***
  function removeFromCart(index) {
    // Remove 1 item at the specified index from the cart array
    cart.splice(index, 1);
    renderCart(); // Re-render the cart to show the changes
  }

  // --- RENDER CART (UPDATED) ---
  function renderCart() {
    cartList.innerHTML = ""; // Clear the current cart display
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item"); // Added for styling

        // *** UPDATED: Added a remove button with a 'data-index' attribute ***
        cartItem.innerHTML = `
          <span>${item.name} - $${item.price.toFixed(2)}</span>
          <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartList.appendChild(cartItem);
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
    }

    // Update the total price display
    totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // Initial render of the cart (it will be empty)
  renderCart();
});
