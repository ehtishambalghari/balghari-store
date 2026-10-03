/* Checkout page */
document.addEventListener('DOMContentLoaded', () => {
  const t = cartTotals(), form = $('#checkoutForm');
  if (!t.items.length) { $('#checkoutWrap').innerHTML = '<div class="card empty-cart"><h2>Your cart is empty</h2><a class="btn" href="shop.html">Start Shopping</a></div>'; return; }
  $('#sumItems').innerHTML = t.items.map(({ p, qty }) => `<div class="line"><span>${p.name} × ${qty}</span><span>${money(p.price * qty)}</span></div>`).join('');
  $('#cartTotals').innerHTML = totalsHTML();
  const user = load('bts_user', null); if (user) { $('#fname').value = user.name; $('#email').value = user.email; }
  form.addEventListener('change', () => { $('#cardBox').hidden = form.pay.value !== 'Card'; });
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (form.pay.value === 'Card' && !/^[\d ]{13,19}$/.test($('#cardNo').value.trim())) return toast('Enter a valid card number', 'error');
    const no = 'BTS-' + Date.now().toString().slice(-8), orders = load('bts_orders', []);
    orders.push({ no, date: new Date().toISOString(), name: $('#fname').value, total: t.total, payment: form.pay.value, items: t.items.map(i => ({ id: i.id, qty: i.qty })) });
    save('bts_orders', orders); save('bts_cart', []); save('bts_coupon', ''); updateBadges();
    $('#sName').textContent = $('#fname').value; $('#sNo').textContent = no;
    $('#checkoutWrap').hidden = true; $('#success').hidden = false; scrollTo({ top: 0, behavior: 'smooth' }); toast('Order placed successfully 🎉');
  });
});
