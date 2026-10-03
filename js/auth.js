/* Demo authentication (localStorage only; NOT secure, replace with a real backend) */
document.addEventListener('DOMContentLoaded', () => {
  $$('.tab').forEach(b => b.addEventListener('click', () => {
    $$('.tab').forEach(x => x.classList.toggle('active', x === b));
    $('#loginForm').hidden = b.dataset.tab !== 'login'; $('#registerForm').hidden = b.dataset.tab !== 'register';
  }));
  $('#registerForm').addEventListener('submit', e => {
    e.preventDefault(); const users = load('bts_users', []), email = $('#remail').value.trim().toLowerCase();
    if (users.some(u => u.email === email)) return toast('Email already registered', 'error');
    const u = { name: $('#rname').value.trim(), email, pass: $('#rpass').value }; users.push(u); save('bts_users', users);
    save('bts_user', { name: u.name, email }); toast('Account created!'); setTimeout(() => location.href = 'index.html', 800);
  });
  $('#loginForm').addEventListener('submit', e => {
    e.preventDefault(); const u = load('bts_users', []).find(x => x.email === $('#lemail').value.trim().toLowerCase() && x.pass === $('#lpass').value);
    if (!u) return toast('Invalid email or password', 'error');
    save('bts_user', { name: u.name, email: u.email }); toast('Welcome back, ' + u.name); setTimeout(() => location.href = 'index.html', 800);
  });
});
