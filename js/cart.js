/* Cart logic (localStorage) + cart page rendering */
const getCart = () => load('bts_cart', []);
const COUPONS = { SAVE10: 0.10, TECH20: 0.20 };
function addToCart(id, qty = 1) {
  const c = getCart(), i = c.find(x => x.id === id);
  i ? i.qty += qty : c.push({ id, qty }); save('bts_cart', c); updateBadges();
  toast(`${byId(id).name} added to cart 🛒`);
}
function setQty(id, q) { let c = getCart(); q < 1 ? c = c.filter(x => x.id !== id) : c.find(x => x.id === id).qty = Math.min(q, 99); save('bts_cart', c); updateBadges(); }
function cartTotals() {
  const items = getCart().map(i => ({ ...i, p: byId(i.id) })).filter(i => i.p);
  const sub = items.reduce((s, i) => s + i.p.price * i.qty, 0), code = load('bts_coupon', '');
  const disc = COUPONS[code] ? sub * COUPONS[code] : 0, ship = items.length && sub - disc < FREE_SHIPPING_OVER ? SHIPPING_FEE : 0;
  return { items, sub, code, disc, ship, total: sub - disc + ship };
}
function totalsHTML() {
  const t = cartTotals();
  return `<div class="line"><span>Subtotal</span><span>${money(t.sub)}</span></div>${t.disc ? `<div class="line ok"><span>Coupon (${t.code})</span><span>-${money(t.disc)}</span></div>` : ''}
  <div class="line"><span>Shipping</span><span>${t.ship ? money(t.ship) : 'Free'}</span></div><div class="line total"><span>Total</span><span>${money(t.total)}</span></div>`;
}
function renderCart() {
  const box = $('#cartItems'); if (!box) return;
  const t = cartTotals();
  box.innerHTML = t.items.length ? t.items.map(({ p, qty }) => `<div class="card cart-item"><a href="product.html?id=${p.id}">${img(p)}</a>
  <div class="ci-info"><h3><a href="product.html?id=${p.id}">${p.name}</a></h3><span class="muted">${money(p.price)} each</span></div>
  <div class="qty"><button data-q="${p.id}" data-d="-1" aria-label="Decrease quantity">−</button><output>${qty}</output><button data-q="${p.id}" data-d="1" aria-label="Increase quantity">+</button></div>
  <strong>${money(p.price * qty)}</strong><button class="icon-btn" data-rm="${p.id}" aria-label="Remove ${p.name}">🗑</button></div>`).join('')
    : '<div class="card empty-cart"><h2>Your cart is empty</h2><a class="btn" href="shop.html">Start Shopping</a></div>';
  $('#cartTotals').innerHTML = totalsHTML();
  $('#checkoutBtn').style.display = t.items.length ? '' : 'none';
}
document.addEventListener('DOMContentLoaded', () => {
  if (!$('#cartItems')) return; renderCart();
  $('#cartItems').addEventListener('click', e => {
    const q = e.target.closest('[data-q]'), r = e.target.closest('[data-rm]');
    if (q) setQty(+q.dataset.q, getCart().find(x => x.id == q.dataset.q).qty + +q.dataset.d);
    if (r) { setQty(+r.dataset.rm, 0); toast('Item removed', 'info'); }
    renderCart();
  });
  $('#couponForm').addEventListener('submit', e => {
    e.preventDefault(); const c = $('#coupon').value.trim().toUpperCase();
    if (COUPONS[c]) { save('bts_coupon', c); toast(`Coupon ${c} applied!`); } else toast('Invalid coupon code', 'error');
    renderCart();
  });
});
