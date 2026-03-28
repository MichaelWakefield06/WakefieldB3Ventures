// cart.js
const Cart = {
  key: 'cart',

  get() {
    try {
      const raw = localStorage.getItem(this.key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  save(cart) {
    localStorage.setItem(this.key, JSON.stringify(cart));
  },

  addItem(product) {
    const cart = this.get();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1
      });
    }
    this.save(cart);
  },

  updateQty(index, qty) {
    const cart = this.get();
    if (!cart[index]) return;
    cart[index].qty = qty;
    this.save(cart);
  },

  remove(index) {
    const cart = this.get();
    cart.splice(index, 1);
    this.save(cart);
  }
};

function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (!el) return;
  const cart = Cart.get();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  el.innerText = count;
}
