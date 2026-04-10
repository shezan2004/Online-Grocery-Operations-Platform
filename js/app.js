// js/app.js — Main storefront logic

/* ── State ────────────────────────────────────────────────────────────────── */
let activeCategories = new Set();
let searchQuery      = '';
let priceMin         = 0;
let priceMax         = Infinity;
let cartOpen         = false;

/* ── Init ─────────────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initStock();
  updateHeader();
  renderCategoryFilters();
  renderSidebarCategories();
  renderProducts();
  updateCartBadge();
  renderCart();
  bindSearch();
  bindPriceRange();
  bindCartToggle();
  bindAuthModals();
  bindMobileMenu();
});

/* ── Header ──────────────────────────────────────────────────────────────── */

function updateHeader() {
  const session  = getSession();
  const authArea = document.getElementById('auth-area');
  if (!authArea) return;

  if (session) {
    authArea.innerHTML = `
      <div class="user-menu">
        <span class="user-avatar">${session.name.charAt(0).toUpperCase()}</span>
        <span class="user-name">${session.name.split(' ')[0]}</span>
        <div class="user-dropdown">
          <a href="/profile.html">👤 My Profile</a>
          <a href="/profile.html#orders">📦 My Orders</a>
          ${session.role === 'admin' ? '<a href="/admin/index.html">⚙️ Admin Panel</a>' : ''}
          <button onclick="signOut()" class="logout-btn">🚪 Sign Out</button>
        </div>
      </div>`;
  } else {
    authArea.innerHTML = `<button class="btn-signin" onclick="openModal('signin-modal')">Sign In</button>`;
  }
}

/* ── Category filter bar ─────────────────────────────────────────────────── */

function renderCategoryFilters() {
  const bar = document.getElementById('category-bar');
  if (!bar) return;
  const all = `<button class="cat-btn active" data-cat="all" onclick="filterCategory('all', this)">All</button>`;
  const cats = CATEGORIES.map(c =>
    `<button class="cat-btn" data-cat="${c}" onclick="filterCategory('${c}', this)">${c}</button>`
  ).join('');
  bar.innerHTML = all + cats;
}

function filterCategory(cat, btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (cat === 'all') {
    activeCategories.clear();
  } else {
    activeCategories = new Set([cat]);
    // Sync sidebar checkbox
    document.querySelectorAll('.sidebar-cat-cb').forEach(cb => {
      cb.checked = cb.value === cat;
    });
  }
  renderProducts();
}

/* ── Sidebar category checkboxes ─────────────────────────────────────────── */

function renderSidebarCategories() {
  const list = document.getElementById('sidebar-cats');
  if (!list) return;
  list.innerHTML = CATEGORIES.map(c => `
    <label class="sidebar-cat-label">
      <input type="checkbox" class="sidebar-cat-cb" value="${c}" onchange="sidebarCatChange()"> ${c}
    </label>`
  ).join('');
}

function sidebarCatChange() {
  const checked = [...document.querySelectorAll('.sidebar-cat-cb:checked')].map(c => c.value);
  activeCategories = new Set(checked);
  // Reset top bar
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  if (checked.length === 0) {
    document.querySelector('.cat-btn[data-cat="all"]')?.classList.add('active');
  }
  renderProducts();
}

/* ── Price range ─────────────────────────────────────────────────────────── */

function bindPriceRange() {
  const minEl = document.getElementById('price-min');
  const maxEl = document.getElementById('price-max');
  const minVal = document.getElementById('price-min-val');
  const maxVal = document.getElementById('price-max-val');
  if (!minEl || !maxEl) return;

  const allPrices = PRODUCTS.map(p => p.price);
  const globalMin = Math.floor(Math.min(...allPrices));
  const globalMax = Math.ceil(Math.max(...allPrices));

  minEl.min = globalMin; minEl.max = globalMax; minEl.value = globalMin;
  maxEl.min = globalMin; maxEl.max = globalMax; maxEl.value = globalMax;
  if (minVal) minVal.textContent = formatCurrency(globalMin);
  if (maxVal) maxVal.textContent = formatCurrency(globalMax);
  priceMin = globalMin; priceMax = globalMax;

  minEl.addEventListener('input', () => {
    priceMin = parseFloat(minEl.value);
    if (priceMin > priceMax) { priceMin = priceMax; minEl.value = priceMin; }
    if (minVal) minVal.textContent = formatCurrency(priceMin);
    renderProducts();
  });
  maxEl.addEventListener('input', () => {
    priceMax = parseFloat(maxEl.value);
    if (priceMax < priceMin) { priceMax = priceMin; maxEl.value = priceMax; }
    if (maxVal) maxVal.textContent = formatCurrency(priceMax);
    renderProducts();
  });
}

/* ── Search ──────────────────────────────────────────────────────────────── */

function bindSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  input.addEventListener('input', debounce(() => {
    searchQuery = input.value.trim().toLowerCase();
    renderProducts();
  }, 250));
}

/* ── Product render ──────────────────────────────────────────────────────── */

function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const inCat  = activeCategories.size === 0 || activeCategories.has(p.category);
    const inSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery);
    const stock  = getProductStock(p.id);
    const inPrice = p.price >= priceMin && p.price <= priceMax;
    return inCat && inSearch && inPrice;
  });
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  const countEl = document.getElementById('product-count');
  if (!grid) return;

  const products = getFilteredProducts();
  if (countEl) countEl.textContent = `${products.length} product${products.length !== 1 ? 's' : ''} found`;

  if (products.length === 0) {
    grid.innerHTML = `<div class="no-results"><span>😔</span><p>No products match your filters.</p><button onclick="clearFilters()">Clear Filters</button></div>`;
    return;
  }

  grid.innerHTML = products.map(p => {
    const stock    = getProductStock(p.id);
    const inWish   = isInWishlist(p.id);
    const stockClass = stock === 0 ? 'out-of-stock' : stock <= 5 ? 'low-stock' : 'in-stock';
    const stockLabel = stock === 0 ? 'Out of Stock' : stock <= 5 ? `Only ${stock} left!` : `In Stock (${stock})`;
    const stars    = renderStars(p.rating);

    return `
    <div class="product-card ${stock === 0 ? 'disabled' : ''}" data-id="${p.id}">
      <button class="wishlist-btn ${inWish ? 'active' : ''}" onclick="handleWishlist('${p.id}', this)" title="Wishlist">
        ${inWish ? '❤️' : '🤍'}
      </button>
      <div class="product-icon">${p.icon}</div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3 class="product-name" title="${p.name}">${truncate(p.name, 30)}</h3>
        <div class="product-rating">${stars} <span class="review-count">(${p.reviews})</span></div>
        <p class="product-price">${formatCurrency(p.price)}</p>
        <span class="stock-badge ${stockClass}">${stockLabel}</span>
      </div>
      <div class="product-actions">
        <div class="qty-selector">
          <button class="qty-btn" onclick="changeQtySel('${p.id}', -1)">−</button>
          <span class="qty-display" id="qty-${p.id}">1</span>
          <button class="qty-btn" onclick="changeQtySel('${p.id}', 1, ${stock})">+</button>
        </div>
        <button class="btn-add-cart" onclick="handleAddToCart('${p.id}')" ${stock === 0 ? 'disabled' : ''}>
          🛒 Add to Cart
        </button>
      </div>
    </div>`;
  }).join('');
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

/* ── Product qty selectors ───────────────────────────────────────────────── */

const qtySelMap = {};

function changeQtySel(productId, delta, maxStock) {
  if (!(productId in qtySelMap)) qtySelMap[productId] = 1;
  const avail = maxStock !== undefined ? maxStock : getProductStock(productId);
  qtySelMap[productId] = Math.min(Math.max(1, qtySelMap[productId] + delta), avail);
  const el = document.getElementById(`qty-${productId}`);
  if (el) el.textContent = qtySelMap[productId];
}

function handleAddToCart(productId) {
  const session = getSession();
  if (!session) { openModal('signin-modal'); showToast('Please sign in to add items to cart.', 'info'); return; }
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const qty = qtySelMap[productId] || 1;
  const added = addToCart(product, qty);
  if (added) {
    qtySelMap[productId] = 1;
    const el = document.getElementById(`qty-${productId}`);
    if (el) el.textContent = 1;
    renderProducts(); // refresh stock display
    if (!cartOpen) openCart();
  }
}

/* ── Wishlist ────────────────────────────────────────────────────────────── */

function handleWishlist(productId, btn) {
  const session = getSession();
  if (!session) { openModal('signin-modal'); showToast('Please sign in to use wishlist.', 'info'); return; }
  const inWish = toggleWishlist(productId);
  btn.textContent = inWish ? '❤️' : '🤍';
  btn.classList.toggle('active', inWish);
}

/* ── Clear filters ───────────────────────────────────────────────────────── */

function clearFilters() {
  activeCategories.clear();
  searchQuery = '';
  priceMin = 0;
  priceMax = Infinity;
  const inp = document.getElementById('search-input');
  if (inp) inp.value = '';
  document.querySelectorAll('.sidebar-cat-cb').forEach(cb => cb.checked = false);
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.cat-btn[data-cat="all"]')?.classList.add('active');
  // Reset price sliders
  const minEl   = document.getElementById('price-min');
  const maxEl   = document.getElementById('price-max');
  const minVal  = document.getElementById('price-min-val');
  const maxVal  = document.getElementById('price-max-val');
  if (minEl) { priceMin = parseFloat(minEl.min); minEl.value = minEl.min; if (minVal) minVal.textContent = formatCurrency(priceMin); }
  if (maxEl) { priceMax = parseFloat(maxEl.max); maxEl.value = maxEl.max; if (maxVal) maxVal.textContent = formatCurrency(priceMax); }
  renderProducts();
}

/* ── Cart sidebar ────────────────────────────────────────────────────────── */

function bindCartToggle() {
  const overlay = document.getElementById('cart-overlay');
  if (overlay) overlay.addEventListener('click', closeCart);
}

function openCart() {
  cartOpen = true;
  document.getElementById('cart-panel')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('show');
}

function closeCart() {
  cartOpen = false;
  document.getElementById('cart-panel')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('show');
}

function handleCartCheckout() {
  const session = getSession();
  if (!session) { closeCart(); openModal('signin-modal'); showToast('Please sign in to checkout.', 'info'); return; }
  const cart = loadCart();
  if (cart.length === 0) { showToast('Your cart is empty.', 'warning'); return; }
  window.location.href = '/payment.html';
}

/* ── Auth modals ─────────────────────────────────────────────────────────── */

function bindAuthModals() {
  document.querySelectorAll('.modal-overlay').forEach(el => {
    el.addEventListener('click', e => { if (e.target === el) closeAllModals(); });
  });
}

function openModal(id) {
  closeAllModals();
  const m = document.getElementById(id);
  if (m) { m.classList.add('open'); document.body.classList.add('modal-open'); }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  document.body.classList.remove('modal-open');
}

/* Sign In */
function handleSignIn(e) {
  e.preventDefault();
  const email = document.getElementById('si-email').value;
  const pass  = document.getElementById('si-pass').value;
  const result = signIn(email, pass);
  if (result.ok) {
    closeAllModals();
    updateHeader();
    renderProducts();
    renderCart();
    showToast(`Welcome back, ${result.session.name.split(' ')[0]}! 👋`, 'success');
  } else {
    document.getElementById('si-error').textContent = result.msg;
  }
}

/* Sign Up */
function handleSignUp(e) {
  e.preventDefault();
  const name  = document.getElementById('su-name').value;
  const email = document.getElementById('su-email').value;
  const pass  = document.getElementById('su-pass').value;
  const pass2 = document.getElementById('su-pass2').value;
  const errEl = document.getElementById('su-error');
  if (pass !== pass2) { errEl.textContent = 'Passwords do not match.'; return; }
  const result = signUp(name, email, pass);
  if (result.ok) {
    closeAllModals();
    updateHeader();
    showToast(`Account created! Welcome, ${result.session.name.split(' ')[0]}! 🎉`, 'success');
  } else {
    errEl.textContent = result.msg;
  }
}

/* Forgot Password */
function handleForgotPassword(e) {
  e.preventDefault();
  const email = document.getElementById('fp-email').value;
  const result = forgotPassword(email);
  const msgEl  = document.getElementById('fp-msg');
  const errEl  = document.getElementById('fp-error');
  if (result.ok) {
    msgEl.textContent  = result.msg;
    errEl.textContent  = '';
    msgEl.style.display = 'block';
  } else {
    errEl.textContent  = result.msg;
    msgEl.style.display = 'none';
  }
}

/* ── Mobile sidebar toggle ───────────────────────────────────────────────── */

function bindMobileMenu() {
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar   = document.getElementById('filter-sidebar');
  const sideOverlay = document.getElementById('sidebar-overlay');
  if (!toggleBtn || !sidebar) return;
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    sideOverlay?.classList.toggle('show');
  });
  sideOverlay?.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sideOverlay?.classList.remove('show');
  });
}
