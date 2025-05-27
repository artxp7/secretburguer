// =========================
// Slider de Hambúrgueres
// =========================

const burgers = [
  {
    name: "Cheddar Bacon",
    price: "R$ 25,00",
    img: "burguer4.jpg"
  },
  {
    name: "Smash",
    price: "R$ 22,00",
    img: "burguer2.jpg"
  },
  {
    name: "Duplo Cheese",
    price: "R$ 27,00",
    img: "burguer3.jpg"
  }
];

let currentIndex = 0;
const burgerCard = document.getElementById('burgerCard');

function updateBurger() {
  const burger = burgers[currentIndex];
  burgerCard.innerHTML = `
    <img src="${burger.img}" alt="${burger.name}">
    <h3>${burger.name}</h3>
    <p>${burger.price}</p>
  `;
}

function nextBurger() {
  currentIndex = (currentIndex + 1) % burgers.length;
  updateBurger();
}

function prevBurger() {
  currentIndex = (currentIndex - 1 + burgers.length) % burgers.length;
  updateBurger();
}

updateBurger();

// =========================
// Carrinho de Compras
// =========================

const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const sidebarCart = document.getElementById('sidebar-cart');
const shadowCart = document.querySelector('.shadow-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let cart = [];

openCartBtn.addEventListener('click', () => {
  sidebarCart.classList.add('active');
  shadowCart.style.visibility = 'visible';
});

closeCartBtn.addEventListener('click', closeCart);
shadowCart.addEventListener('click', closeCart);

function closeCart() {
  sidebarCart.classList.remove('active');
  shadowCart.style.visibility = 'hidden';
}

// =========================
// Adicionar ao Carrinho
// =========================

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} x${item.quantity} 
      <strong>R$ ${(item.price * item.quantity).toFixed(2)}</strong>
      <button onclick="removeFromCart('${item.name}')">❌</button>
    `;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.innerText = total.toFixed(2);
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

// =========================
// Enviar Pedido no WhatsApp
// =========================

function sendOrder() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  let message = "Olá! Quero fazer um pedido:%0A";
  cart.forEach(item => {
    message += `🍔 ${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}%0A`;
  });
  message += `%0ATotal: R$ ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}`;

  const phone = "5511999999999"; // Coloque seu número aqui (Ex.: 5511999999999)
  const url = `https://wa.me/${phone}?text=${message}`;

  window.open(url, '_blank');
}
