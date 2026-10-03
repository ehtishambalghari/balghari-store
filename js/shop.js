/* Shop page: search, category, price, rating filters and sorting */
document.addEventListener('DOMContentLoaded', () => {
  const q = $('#q'), cat = $('#cat'), price = $('#price'), rate = $('#rate'), sort = $('#sort'), params = new URLSearchParams(location.search);
  cat.innerHTML = '<option value="all">All categories</option>' + CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  q.value = params.get('q') || ''; cat.value = params.get('cat') || 'all'; sort.value = params.get('sort') || 'featured';
  const sorters = { low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating, discount: (a, b) => discount(b) - discount(a), name: (a, b) => a.name.localeCompare(b.name), featured: () => 0 };
  function apply() {
    $('#priceOut').textContent = money(+price.value);
    const term = q.value.trim().toLowerCase();
    const list = PRODUCTS.filter(p => (cat.value === 'all' || p.category === cat.value) && p.price <= +price.value && p.rating >= +rate.value
      && (!term || (p.name + p.desc + catName(p.category)).toLowerCase().includes(term))).sort(sorters[sort.value]);
    $('#resultCount').textContent = `${list.length} product${list.length !== 1 ? 's' : ''} found`; renderGrid($('#shopGrid'), list);
  }
  [q, cat, price, rate, sort].forEach(el => el.addEventListener('input', apply));
  $('#reset').addEventListener('click', () => { q.value = ''; cat.value = 'all'; price.value = 150; rate.value = 0; sort.value = 'featured'; apply(); });
  apply();
});
