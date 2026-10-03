/* Product details page */
document.addEventListener('DOMContentLoaded', () => {
  const p = byId(new URLSearchParams(location.search).get('id')), v = $('#productView');
  if (!p) { v.innerHTML = '<div class="card empty-cart"><h2>Product not found</h2><a class="btn" href="shop.html">Back to Shop</a></div>'; $('.head').hidden = true; return; }
  document.title = p.name + ' | Balghari Store'; $('meta[name=description]').content = p.desc; $('#crumb').textContent = p.name;
  const g = p.gallery || [p.image], off = discount(p), w = getWish().includes(p.id);
  v.innerHTML = `<div class="gallery"><div class="main-img" id="mainImg">${img(p)}</div><div class="thumbs">${g.map((s, i) => `<button class="${i ? '' : 'active'}" data-i="${i}" aria-label="View image ${i + 1}"><img src="${s}" alt="${p.name} view ${i + 1}" onerror="this.onerror=null;this.src=ph(this.alt)"></button>`).join('')}</div></div>
  <div class="info"><span class="cat">${catName(p.category)}</span><h1>${p.name}</h1><div class="rating">${stars(p.rating)} <small>${p.rating} (${p.reviews} reviews)</small></div>
  <div class="price big">${money(p.price)}${p.oldPrice ? `<del>${money(p.oldPrice)}</del><span class="badge inline">Save ${off}%</span>` : ''}</div><p>${p.desc}</p>
  <div class="buy"><div class="qty"><button id="minus" aria-label="Decrease quantity">−</button><input id="qty" type="number" value="1" min="1" max="99" aria-label="Quantity"><button id="plus" aria-label="Increase quantity">+</button></div>
  <button class="btn" id="addBtn">Add to Cart</button><button class="icon-btn ${w ? 'active' : ''}" data-wish="${p.id}" aria-pressed="${w}" aria-label="Toggle wishlist">♥</button></div>
  <h2>Specifications</h2><table class="specs"><tbody>${Object.entries(p.specs).map(([k, x]) => `<tr><th scope="row">${k}</th><td>${x}</td></tr>`).join('')}</tbody></table></div>`;
  const qty = $('#qty'), clamp = n => qty.value = Math.max(1, Math.min(99, n || 1));
  $('#minus').onclick = () => clamp(+qty.value - 1); $('#plus').onclick = () => clamp(+qty.value + 1); qty.onchange = () => clamp(+qty.value);
  $('#addBtn').onclick = () => addToCart(p.id, +qty.value);
  $('.thumbs').onclick = e => { const b = e.target.closest('button'); if (!b) return; $$('.thumbs button').forEach(x => x.classList.remove('active')); b.classList.add('active'); $('#mainImg').innerHTML = img(p, +b.dataset.i); };
  renderGrid($('#relatedGrid'), PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).concat(PRODUCTS.filter(x => x.category !== p.category)).slice(0, 4));
});
