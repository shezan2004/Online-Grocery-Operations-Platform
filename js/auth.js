// js/auth.js — Authentication & session management

const USERS_KEY    = 'gp_users';
const SESSION_KEY  = 'gp_session';
const COUPONS_KEY  = 'gp_coupons';

/* ── Bootstrap ─────────────────────────────────────────────────────────── */

function bootstrapAdmin() {
  let users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  if (!users.find(u => u.role === 'admin')) {
    users.push({
      id: 'admin-001',
      name: 'Admin',
      email: 'admin@grocery.com',
      password: 'admin123',
      role: 'admin',
      createdAt: Date.now()
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  // Bootstrap default coupons if absent
  if (!localStorage.getItem(COUPONS_KEY)) {
    localStorage.setItem(COUPONS_KEY, JSON.stringify(DEFAULT_COUPONS));
  }
}

/* ── Session helpers ────────────────────────────────────────────────────── */

function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
  catch { return null; }
}

function setSession(user) {
  const session = { userId: user.id, name: user.name, email: user.email, role: user.role };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

/* ── Sign Up ────────────────────────────────────────────────────────────── */

function signUp(name, email, password) {
  if (!name || !email || !password) return { ok: false, msg: 'All fields are required.' };
  if (!validateEmail(email)) return { ok: false, msg: 'Invalid email address.' };
  if (password.length < 6) return { ok: false, msg: 'Password must be at least 6 characters.' };

  let users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, msg: 'An account with this email already exists.' };
  }

  const user = {
    id: generateId(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    role: 'customer',
    createdAt: Date.now()
  };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { ok: true, session: setSession(user) };
}

/* ── Sign In ────────────────────────────────────────────────────────────── */

function signIn(email, password) {
  if (!email || !password) return { ok: false, msg: 'Email and password are required.' };
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(
    u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
  );
  if (!user) return { ok: false, msg: 'Invalid email or password.' };
  return { ok: true, session: setSession(user) };
}

/* ── Sign Out ───────────────────────────────────────────────────────────── */

function signOut() {
  clearSession();
  // Clear cart/wishlist on logout
  localStorage.removeItem('gp_cart');
  localStorage.removeItem('gp_wishlist');
  window.location.href = '/';
}

/* ── Forgot Password ────────────────────────────────────────────────────── */

function forgotPassword(email) {
  if (!validateEmail(email)) return { ok: false, msg: 'Please enter a valid email address.' };
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user) return { ok: false, msg: 'No account found with that email address.' };
  // In a real app this would send an email; here we simulate success
  return { ok: true, msg: 'Password reset link sent! (simulated — check console)', tempPassword: user.password };
}

/* ── initAuth ───────────────────────────────────────────────────────────── */

function initAuth() {
  bootstrapAdmin();
}

/* ── Role-guard helpers ─────────────────────────────────────────────────── */

function requireLogin(redirectTo = '/') {
  if (!getSession()) {
    window.location.href = redirectTo;
    return false;
  }
  return true;
}

function requireAdmin(redirectTo = '/') {
  const s = getSession();
  if (!s || s.role !== 'admin') {
    window.location.href = redirectTo;
    return false;
  }
  return true;
}
