let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(button) {
  const gift = button.closest('.gift');
  const name = gift.getAttribute('data-name');
  const price = parseInt(gift.getAttribute('data-price'));

  cart.push({ name, price });
  saveCart();
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function checkout() {
  if(cart.length === 0) {
    alert("Ваш кошик порожній!");
  } else {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Дякуємо за замовлення! Всього: ${total} грн`);
    cart = [];
    saveCart();
    updateCartUI();
  }
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
  const cartCount = document.getElementById('cart-count');
  if(cartCount) cartCount.innerText = cart.length;

  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  if(cartItems) {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `${item.name} - ${item.price} грн <button onclick="removeFromCart(${index})">X</button>`;
      cartItems.appendChild(div);
    });
    if(cartTotal) cartTotal.innerText = `Всього: ${total} грн`;
  }
}

// Ініціалізація при завантаженні сторінки
updateCartUI();
