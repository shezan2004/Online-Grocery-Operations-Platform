// js/profile.js — Customer profile page

const ORDERS_KEY_P = 'gp_orders';
let activeTab = 'account';

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  if (!requireLogin('/')) return;
  initStock();
  const session = getSession();
  switchTab(location.hash === '#orders' ? 'orders' :
            location.hash === '#wishlist' ? 'wishlist' :
            location.hash === '#settings' ? 'settings' : 'account');
  renderAccountInfo(session);
});

/* ── Tab switching ───────────────────────────────────────────────────────── */

function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === `tab-${tab}`));

  if (tab === 'account')  renderAccountInfo(getSession());
  if (tab === 'orders')   renderOrderHistory();
  if (tab === 'wishlist') renderWishlist();
  if (tab === 'settings') renderSettings();
}

/* ── Account Info ────────────────────────────────────────────────────────── */

function renderAccountInfo(session) {
  const el = document.getElementById('tab-account');
  if (!el) return;

  const users  = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user   = users.find(u => u.id === session.userId) || {};
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY_P) || '[]').filter(o => o.userId === session.userId);
  const spent  = orders.reduce((s, o) => s + (o.total || 0), 0);

  el.innerHTML = `
    <div class="account-card">
      <div class="account-avatar">${session.name.charAt(0).toUpperCase()}</div>
      <div class="account-info">
        <h2>${session.name}</h2>
        <p class="account-email">📧 ${session.email}</p>
        <p class="account-since">📅 Member since ${formatDate(user.createdAt || Date.now())}</p>
        <div class="account-stats">
          <div class="stat-card"><span class="stat-val">${orders.length}</span><span class="stat-label">Orders</span></div>
          <div class="stat-card"><span class="stat-val">${formatCurrency(spent)}</span><span class="stat-label">Total Spent</span></div>
          <div class="stat-card"><span class="stat-val">${loadWishlist().length}</span><span class="stat-label">Wishlist Items</span></div>
        </div>
      </div>
    </div>`;
}

/* ── Order History ───────────────────────────────────────────────────────── */

function renderOrderHistory() {
  const el = document.getElementById('tab-orders');
  if (!el) return;
  const session = getSession();
  const orders  = JSON.parse(localStorage.getItem(ORDERS_KEY_P) || '[]')
    .filter(o => o.userId === session.userId)
    .sort((a, b) => b.createdAt - a.createdAt);

  if (orders.length === 0) {
    el.innerHTML = `<div class="empty-state"><span>📦</span><p>No orders yet.</p><a href="/" class="btn-primary">Start Shopping</a></div>`;
    return;
  }

  const statusColors = { pending: '#f77f00', processing: '#0077b6', shipped: '#7209b7', delivered: '#2d6a4f', cancelled: '#d62828' };
  const methodLabels = { card: '💳 Card', wallet: '📱 Wallet', bank: '🏦 Bank Transfer', cod: '💵 COD' };

  el.innerHTML = orders.map(order => `
    <div class="order-card">
      <div class="order-header" onclick="toggleOrderItems('${order.id}')">
        <div class="order-meta">
          <span class="order-id">${order.id}</span>
          <span class="order-date">${formatDate(order.createdAt)}</span>
          <span class="order-method">${methodLabels[order.paymentMethod] || order.paymentMethod}</span>
        </div>
        <div class="order-right">
          <span class="status-badge" style="background:${(statusColors[order.status] || '#888')}20;color:${statusColors[order.status] || '#888'}">${order.status}</span>
          <span class="order-total">${formatCurrency(order.total)}</span>
          <span class="order-expand-icon">▼</span>
        </div>
      </div>
      <div class="order-items-panel" id="items-${order.id}" style="display:none">
        ${order.items.map(i => `
          <div class="order-item-row">
            <span>${i.icon || '🛍️'} ${i.name}</span>
            <span>× ${i.quantity}</span>
            <span>${formatCurrency(i.price * i.quantity)}</span>
          </div>`).join('')}
        <div class="order-pricing-mini">
          <span>Subtotal: ${formatCurrency(order.subtotal)}</span>
          ${order.discount > 0 ? `<span>Discount: −${formatCurrency(order.discount)}</span>` : ''}
          <span>VAT (8%): ${formatCurrency(order.vat)}</span>
          <strong>Total: ${formatCurrency(order.total)}</strong>
        </div>
      </div>
    </div>`).join('');
}

function toggleOrderItems(orderId) {
  const panel = document.getElementById(`items-${orderId}`);
  if (!panel) return;
  const icon = panel.previousElementSibling?.querySelector('.order-expand-icon');
  const isOpen = panel.style.display === 'block';
  panel.style.display = isOpen ? 'none' : 'block';
  if (icon) icon.textContent = isOpen ? '▼' : '▲';
}

/* ── Wishlist ────────────────────────────────────────────────────────────── */

function renderWishlist() {
  const el = document.getElementById('tab-wishlist');
  if (!el) return;
  const wishlist = loadWishlist();
  const products = wishlist.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  if (products.length === 0) {
    el.innerHTML = `<div class="empty-state"><span>🤍</span><p>Your wishlist is empty.</p><a href="/" class="btn-primary">Browse Products</a></div>`;
    return;
  }

  el.innerHTML = `<div class="wishlist-grid">${products.map(p => {
    const stock = getProductStock(p.id);
    return `
      <div class="wishlist-card">
        <div class="wishlist-icon">${p.icon}</div>
        <div class="wishlist-info">
          <span class="product-category">${p.category}</span>
          <h4>${p.name}</h4>
          <p class="product-price">${formatCurrency(p.price)}</p>
          <p class="stock-info ${stock === 0 ? 'out-of-stock' : 'in-stock'}">${stock === 0 ? 'Out of Stock' : `In Stock (${stock})`}</p>
        </div>
        <div class="wishlist-actions">
          <button class="btn-add-cart" onclick="addToCartFromWishlist('${p.id}')" ${stock === 0 ? 'disabled' : ''}>🛒 Add to Cart</button>
          <button class="btn-remove-wish" onclick="removeFromWishlistAndRefresh('${p.id}')">🗑️ Remove</button>
        </div>
      </div>`;
  }).join('')}</div>`;
}

function addToCartFromWishlist(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  addToCart(product, 1);
  renderWishlist();
}

function removeFromWishlistAndRefresh(productId) {
  const list = loadWishlist().filter(id => id !== productId);
  saveWishlist(list);
  showToast('Removed from wishlist.', 'info');
  renderWishlist();
  renderAccountInfo(getSession());
}

/* ── Settings ────────────────────────────────────────────────────────────── */

function renderSettings() {
  const el = document.getElementById('tab-settings');
  if (!el) return;

  el.innerHTML = `
    <div class="settings-section">
      <h3>Notification Preferences</h3>
      <div class="toggle-row">
        <label>Order Updates</label>
        <label class="switch"><input type="checkbox" checked onchange="saveToggle('notif_orders', this.checked)"><span class="slider"></span></label>
      </div>
      <div class="toggle-row">
        <label>Promotions & Offers</label>
        <label class="switch"><input type="checkbox" onchange="saveToggle('notif_promos', this.checked)"><span class="slider"></span></label>
      </div>
      <div class="toggle-row">
        <label>Wishlist Reminders</label>
        <label class="switch"><input type="checkbox" checked onchange="saveToggle('notif_wishlist', this.checked)"><span class="slider"></span></label>
      </div>
    </div>
    <div class="settings-section">
      <h3>Change Password</h3>
      <form onsubmit="handleChangePassword(event)" class="settings-form">
        <div class="form-group">
          <label>Current Password</label>
          <input type="password" id="cp-current" placeholder="Enter current password" />
          <span class="field-error" id="cp-current-err"></span>
        </div>
        <div class="form-group">
          <label>New Password</label>
          <input type="password" id="cp-new" placeholder="At least 6 characters" />
          <span class="field-error" id="cp-new-err"></span>
        </div>
        <div class="form-group">
          <label>Confirm New Password</label>
          <input type="password" id="cp-confirm" placeholder="Repeat new password" />
          <span class="field-error" id="cp-confirm-err"></span>
        </div>
        <div class="field-success" id="cp-success" style="display:none">Password changed successfully!</div>
        <button type="submit" class="btn-primary">Update Password</button>
      </form>
    </div>`;

  // Restore toggles
  ['notif_orders', 'notif_promos', 'notif_wishlist'].forEach(key => {
    const val = localStorage.getItem(key);
    const inputs = el.querySelectorAll(`input[onchange*="${key}"]`);
    inputs.forEach(inp => { if (val !== null) inp.checked = val === 'true'; });
  });
}

function saveToggle(key, value) {
  localStorage.setItem(key, value);
  showToast('Preference saved.', 'success');
}

function handleChangePassword(e) {
  e.preventDefault();
  const session  = getSession();
  const current  = document.getElementById('cp-current').value;
  const newPass  = document.getElementById('cp-new').value;
  const confirm  = document.getElementById('cp-confirm').value;

  ['cp-current-err', 'cp-new-err', 'cp-confirm-err'].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = '';
  });

  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user  = users.find(u => u.id === session.userId);
  if (!user || user.password !== current) {
    document.getElementById('cp-current-err').textContent = 'Current password is incorrect.'; return;
  }
  if (newPass.length < 6) { document.getElementById('cp-new-err').textContent = 'Password must be at least 6 characters.'; return; }
  if (newPass !== confirm) { document.getElementById('cp-confirm-err').textContent = 'Passwords do not match.'; return; }

  user.password = newPass;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  document.getElementById('cp-success').style.display = 'block';
  showToast('Password updated successfully! 🔒', 'success');
  document.getElementById('cp-current').value = '';
  document.getElementById('cp-new').value = '';
  document.getElementById('cp-confirm').value = '';
}
