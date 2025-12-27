// ================= Кошик =================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(button) {
  const gift = button.closest('.gift');
  const name = gift.getAttribute('data-name');
  const price = parseInt(gift.getAttribute('data-price'));

  cart.push({ name, price });
  saveCart();
  updateCartUI();

  // Повідомлення
  alert(`🎁 Ви додали "${name}" у кошик!`);
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

// ================= Реєстрація =================
let users = JSON.parse(localStorage.getItem('users')) || [];

function register() {
  const username = document.getElementById('reg-username').value.trim();
  const password = document.getElementById('reg-password').value.trim();

  if(!username || !password) {
    alert("Введіть логін і пароль");
    return;
  }

  const exists = users.some(u => u.username === username);
  if(exists) {
    alert("Користувач з таким логіном вже існує!");
    return;
  }

  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert("Реєстрація успішна!");
}

function login() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  const user = users.find(u => u.username === username && u.password === password);
  if(user) {
    alert(`Вітаємо, ${username}! Ви увійшли.`);
  } else {
    alert("Невірний логін або пароль");
  }
}

// Ініціалізація UI
updateCartUI();
