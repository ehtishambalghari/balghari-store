/* Shared helpers, layout, wishlist, quick view, theme, home page */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => CURRENCY + Number(n).toFixed(2);
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const byId = id => PRODUCTS.find(p => p.id == id);
const catName = id => (CATEGORIES.find(c => c.id === id) || {}).name || id;
const stars = r => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
const discount = p => p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
const ph = t => 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a1128"/><stop offset="1" stop-color="#2563eb"/></linearGradient></defs><rect width="600" height="600" fill="url(#g)"/><text x="300" y="310" fill="#fff" font-family="Arial" font-size="30" text-anchor="middle">${t}</text></svg>`);
const img = (p, i = 0) => `<img src="${(p.gallery || [p.image])[i] || p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src=ph(this.alt)">`;

/* Toasts */
function toast(msg, type = 'ok') {
  const t = document.createElement('div'); t.className = 'toast ' + type; t.textContent = msg; $('#toasts').append(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 2600);
}

/* Wishlist */
const getWish = () => load('bts_wishlist', []);
function toggleWish(id) {
  id = +id; let w = getWish(); const has = w.includes(id);
  w = has ? w.filter(x => x !== id) : [...w, id]; save('bts_wishlist', w);
  $$(`[data-wish="${id}"]`).forEach(b => { b.classList.toggle('active', !has); b.setAttribute('aria-pressed', !has); });
  updateBadges(); toast(has ? 'Removed from wishlist' : 'Added to wishlist ♥', has ? 'info' : 'ok');
}

/* Product card */
function productCard(p) {
  const w = getWish().includes(p.id), off = discount(p);
  return `<article class="card product reveal"><a href="product.html?id=${p.id}" class="thumb" aria-label="${p.name}">${off ? `<span class="badge">-${off}%</span>` : ''}${img(p)}</a>
  <div class="pbody"><span class="cat">${catName(p.category)}</span><h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
  <div class="rating" aria-label="Rated ${p.rating} out of 5">${stars(p.rating)} <small>(${p.reviews})</small></div>
  <div class="price">${money(p.price)}${p.oldPrice ? `<del>${money(p.oldPrice)}</del>` : ''}</div>
  <div class="actions"><button class="btn sm" data-add="${p.id}">Add to Cart</button>
  <button class="icon-btn" data-quick="${p.id}" aria-label="Quick view ${p.name}">👁</button>
  <button class="icon-btn ${w ? 'active' : ''}" data-wish="${p.id}" aria-pressed="${w}" aria-label="Toggle wishlist for ${p.name}">♥</button></div></div></article>`;
}
const renderGrid = (el, list) => { el.innerHTML = list.length ? list.map(productCard).join('') : '<p class="muted empty">No products found.</p>'; observeReveal(); };

/* Modal (quick view + wishlist) */
function openModal(html) { $('#modalBody').innerHTML = html; $('#modal').hidden = false; document.body.classList.add('noscroll'); $('.modal-close').focus(); }
function closeModal() { $('#modal').hidden = true; document.body.classList.remove('noscroll'); }
function quickView(id) {
  const p = byId(id);
  openModal(`<div class="qv"><div class="qv-img">${img(p)}</div><div><span class="cat">${catName(p.category)}</span><h2>${p.name}</h2>
  <div class="rating">${stars(p.rating)} <small>(${p.reviews})</small></div><div class="price big">${money(p.price)}${p.oldPrice ? `<del>${money(p.oldPrice)}</del>` : ''}</div>
  <p>${p.desc}</p><div class="actions"><button class="btn" data-add="${p.id}">Add to Cart</button><a class="btn ghost" href="product.html?id=${p.id}">Full Details</a></div></div></div>`);
}
function showWishlist() {
  const items = getWish().map(byId).filter(Boolean);
  openModal(`<h2>♥ My Wishlist</h2>` + (items.length ? `<div class="grid products wl">${items.map(productCard).join('')}</div>` : '<p class="muted">Your wishlist is empty.</p>'));
  $$('#modalBody .reveal').forEach(e => e.classList.add('show'));
}

/* Layout: header + footer */
function buildLayout() {
  const page = location.pathname.split('/').pop() || 'index.html';
  const nav = [['index.html', 'Home'], ['shop.html', 'Shop'], ['cart.html', 'Cart'], ['checkout.html', 'Checkout']]
    .map(([h, t]) => `<a href="${h}" ${page === h ? 'aria-current="page"' : ''}>${t}</a>`).join('');
  $('#siteHeader').innerHTML = `<div class="demo-bar">⚠️ Demo project: no real products are sold and no payments are processed.</div><div class="container bar"><a class="logo" href="index.html"><img src="images/logo.png" alt="" width="34" height="34" onerror="this.style.display='none'"><span>Balghari<b></b> Store</span></a>
  <nav id="nav" class="nav" aria-label="Main navigation">${nav}</nav>
  <div class="tools"><button class="icon-btn" id="themeBtn" aria-label="Toggle dark mode">🌙</button>
  <button class="icon-btn badge-wrap" id="wishBtn" aria-label="Open wishlist">♥<span class="count" id="wishCount">0</span></button>
  <a class="icon-btn badge-wrap" href="cart.html" aria-label="Cart">🛒<span class="count" id="cartCount">0</span></a>
  <a class="icon-btn" href="login.html" id="userLink" aria-label="Login">👤</a>
  <button class="icon-btn burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="nav">☰</button></div></div>`;
  $('#siteFooter').innerHTML = `<div class="container foot"><div><h3>Balghari Store</h3><p>Quality computer accessories and technology products at honest prices.</p></div>
  <div><h4>Shop</h4>${CATEGORIES.slice(0, 5).map(c => `<a href="shop.html?cat=${c.id}">${c.name}</a>`).join('')}</div>
  <div><h4>Support</h4><a href="cart.html">Cart</a><a href="checkout.html">Checkout</a><a href="login.html">My Account</a></div>
  <div><h4>Contact</h4><p>📧 info@balgharistore.example<br>📞 +92 300 0000000</p></div></div><p class="copy">© ${new Date().getFullYear()} Balghari Store. All rights reserved.</p>`;
}
function updateBadges() {
  const c = $('#cartCount'), w = $('#wishCount');
  if (c) c.textContent = (load('bts_cart', [])).reduce((s, i) => s + i.qty, 0);
  if (w) w.textContent = getWish().length;
  const u = load('bts_user', null); if (u && $('#userLink')) $('#userLink').title = 'Hi, ' + u.name;
}

/* Theme */
function setTheme(t) { document.documentElement.dataset.theme = t; save('bts_theme', t); const b = $('#themeBtn'); if (b) b.textContent = t === 'dark' ? '☀️' : '🌙'; }

/* Scroll reveal */
let io; function observeReveal() {
  io = io || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } }), { threshold: .1 });
  $$('.reveal:not(.show)').forEach(e => io.observe(e));
}

/* Home page */
const REVIEWS = [
  { n: 'Ahmed Khan', t: 'The SSD is super fast and delivery took only two days. Great store!', r: 5 },
  { n: 'Sara Ali', t: 'Bought a mechanical keyboard and headphones. Both are excellent quality.', r: 5 },
  { n: 'Usman Raza', t: 'Genuine products and helpful support. Will buy again.', r: 4 }
];
function initHome() {
  if (!$('#categoryGrid')) return;
  $('#categoryGrid').innerHTML = CATEGORIES.map(c => `<a class="card cat-card reveal" href="shop.html?cat=${c.id}"><span class="ico">${c.icon}</span><span>${c.name}</span></a>`).join('');
  renderGrid($('#featuredGrid'), PRODUCTS.filter(p => p.featured).slice(0, 8));
  renderGrid($('#dealsGrid'), [...PRODUCTS].filter(p => p.oldPrice).sort((a, b) => discount(b) - discount(a)).slice(0, 4));
  $('#reviewGrid').innerHTML = REVIEWS.map(r => `<blockquote class="card review reveal"><div class="rating">${stars(r.r)}</div><p>“${r.t}”</p><footer>— ${r.n}</footer></blockquote>`).join('');
  observeReveal();
}

/* Global events */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-add],[data-quick],[data-wish],[data-close],#themeBtn,#wishBtn,#burger,#toTop');
  if (e.target.id === 'modal') return closeModal();
  if (!t) return;
  if (t.dataset.add) addToCart(+t.dataset.add);
  else if (t.dataset.quick) quickView(t.dataset.quick);
  else if (t.dataset.wish) toggleWish(t.dataset.wish);
  else if ('close' in t.dataset) closeModal();
  else if (t.id === 'themeBtn') setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  else if (t.id === 'wishBtn') showWishlist();
  else if (t.id === 'burger') { const o = $('#nav').classList.toggle('open'); t.setAttribute('aria-expanded', o); t.textContent = o ? '✕' : '☰'; }
  else if (t.id === 'toTop') scrollTo({ top: 0, behavior: 'smooth' });
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
addEventListener('scroll', () => { $('#toTop').hidden = scrollY < 400; $('#siteHeader').classList.toggle('scrolled', scrollY > 20); });
document.addEventListener('DOMContentLoaded', () => { setTheme(load('bts_theme', 'light')); buildLayout(); setTheme(load('bts_theme', 'light')); updateBadges(); initHome(); observeReveal(); });
