// js/admin.js — Admin dashboard logic

const ORDERS_KEY_A   = 'gp_orders';
const MESSAGES_KEY_A = 'gp_messages';
let adminSection     = 'analytics';

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  const session = getSession();
  if (!session || session.role !== 'admin') {
    showAdminLoginForm();
    return;
  }
  initStock();
  document.getElementById('admin-content').style.display = 'flex';
  document.getElementById('admin-login').style.display   = 'none';
  loadSection('analytics');
  document.getElementById('admin-username').textContent = session.name;
});

/* ── Login overlay ────────────────────────────────────────────────────────── */

function showAdminLoginForm() {
  document.getElementById('admin-content').style.display = 'none';
  document.getElementById('admin-login').style.display   = 'flex';
}

function handleAdminLogin(e) {
  e.preventDefault();
  const email = document.getElementById('adm-email').value;
  const pass  = document.getElementById('adm-pass').value;
  const result = signIn(email, pass);
  if (!result.ok) { document.getElementById('adm-err').textContent = result.msg; return; }
  if (result.session.role !== 'admin') {
    signOut();
    document.getElementById('adm-err').textContent = 'This account does not have admin access.';
    return;
  }
  initStock();
  document.getElementById('admin-login').style.display   = 'none';
  document.getElementById('admin-content').style.display = 'flex';
  document.getElementById('admin-username').textContent  = result.session.name;
  loadSection('analytics');
}

/* ── Section routing ──────────────────────────────────────────────────────── */

function loadSection(section) {
  adminSection = section;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.section === section));
  document.querySelectorAll('.admin-section').forEach(s => s.style.display = s.id === `sec-${section}` ? 'block' : 'none');
  if (section === 'analytics')  renderAnalytics();
  if (section === 'inventory')  renderInventory();
  if (section === 'orders')     renderOrders();
  if (section === 'users')      renderUsers();
}

/* ── Analytics ────────────────────────────────────────────────────────────── */

function renderAnalytics() {
  const orders    = JSON.parse(localStorage.getItem(ORDERS_KEY_A) || '[]');
  const users     = JSON.parse(localStorage.getItem(USERS_KEY)    || '[]').filter(u => u.role !== 'admin');
  const revenue   = orders.reduce((s, o) => s + (o.total || 0), 0);

  document.getElementById('an-total-orders').textContent    = orders.length;
  document.getElementById('an-total-revenue').textContent   = formatCurrency(revenue);
  document.getElementById('an-total-customers').textContent = users.length;
  document.getElementById('an-avg-order').textContent       = orders.length
    ? formatCurrency(revenue / orders.length) : formatCurrency(0);

  // Top products by quantity sold
  const soldMap = {};
  orders.forEach(o => o.items?.forEach(i => {
    soldMap[i.productId] = (soldMap[i.productId] || 0) + i.quantity;
  }));
  const topProducts = Object.entries(soldMap)
    .sort((a, b) => b[1] - a[1]).slice(0, 10)
    .map(([id, qty]) => ({ product: PRODUCTS.find(p => p.id === id), qty }))
    .filter(r => r.product);

  const tbody = document.getElementById('top-products-body');
  if (tbody) {
    tbody.innerHTML = topProducts.length === 0
      ? '<tr><td colspan="4" class="empty-row">No orders yet.</td></tr>'
      : topProducts.map((r, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${r.product.icon} ${r.product.name}</td>
            <td>${r.product.category}</td>
            <td><strong>${r.qty}</strong> sold</td>
          </tr>`).join('');
  }

  // Status breakdown
  const statusCounts = { pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0 };
  orders.forEach(o => { if (o.status in statusCounts) statusCounts[o.status]++; });
  const statusEl = document.getElementById('status-breakdown');
  if (statusEl) {
    const colors = { pending: '#f77f00', processing: '#0077b6', shipped: '#7209b7', delivered: '#2d6a4f', cancelled: '#d62828' };
    statusEl.innerHTML = Object.entries(statusCounts).map(([s, c]) => `
      <div class="status-stat">
        <span class="status-badge" style="background:${colors[s]}20;color:${colors[s]}">${s}</span>
        <span class="status-count">${c}</span>
      </div>`).join('');
  }
}

/* ── Inventory ────────────────────────────────────────────────────────────── */

let inventorySearch = '';

function renderInventory(search = inventorySearch) {
  inventorySearch = search;
  const stock    = getStock();
  const filtered = PRODUCTS.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  const tbody = document.getElementById('inventory-body');
  if (!tbody) return;

  tbody.innerHTML = filtered.length === 0
    ? '<tr><td colspan="5" class="empty-row">No products found.</td></tr>'
    : filtered.map(p => {
        const s = stock[p.id] ?? p.stock;
        const cls = s === 0 ? 'out-of-stock' : s <= 5 ? 'low-stock' : 'in-stock';
        return `<tr>
          <td class="mono">${p.id}</td>
          <td>${p.icon} ${p.name}</td>
          <td>${p.category}</td>
          <td>${formatCurrency(p.price)}</td>
          <td><span class="stock-badge ${cls}">${s}</span></td>
          <td>
            <button class="btn-edit" onclick="openEditStock('${p.id}','${p.name}',${s})">✏️ Edit Stock</button>
          </td>
        </tr>`;
      }).join('');
}

function openEditStock(id, name, currentStock) {
  document.getElementById('edit-product-id').value    = id;
  document.getElementById('edit-product-name').textContent = name;
  document.getElementById('edit-stock-val').value     = currentStock;
  document.getElementById('edit-stock-modal').style.display = 'flex';
}

function closeEditStock() {
  document.getElementById('edit-stock-modal').style.display = 'none';
}

function saveStock_admin() {
  const id    = document.getElementById('edit-product-id').value;
  const val   = parseInt(document.getElementById('edit-stock-val').value, 10);
  if (isNaN(val) || val < 0) { showToast('Enter a valid non-negative stock value.', 'error'); return; }
  const stock = getStock();
  stock[id] = val;
  saveStock(stock);
  closeEditStock();
  renderInventory();
  showToast('Stock updated!', 'success');
}

/* ── Orders ────────────────────────────────────────────────────────────────── */

let orderSearch = '';

function renderOrders(search = orderSearch) {
  orderSearch = search;
  const orders   = JSON.parse(localStorage.getItem(ORDERS_KEY_A) || '[]')
    .sort((a, b) => b.createdAt - a.createdAt);
  const filtered = orders.filter(o =>
    !search || o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
    o.customerEmail?.toLowerCase().includes(search.toLowerCase())
  );

  const colors = { pending: '#f77f00', processing: '#0077b6', shipped: '#7209b7', delivered: '#2d6a4f', cancelled: '#d62828' };
  const tbody  = document.getElementById('orders-body');
  if (!tbody) return;

  tbody.innerHTML = filtered.length === 0
    ? '<tr><td colspan="6" class="empty-row">No orders found.</td></tr>'
    : filtered.map(o => `
        <tr>
          <td class="mono">${o.id}</td>
          <td>${o.customerName || '—'}</td>
          <td>${o.customerEmail || '—'}</td>
          <td>${formatCurrency(o.total)}</td>
          <td><span class="status-badge" style="background:${(colors[o.status]||'#888')}20;color:${colors[o.status]||'#888'}">${o.status}</span></td>
          <td>${formatDate(o.createdAt)}</td>
          <td>
            <button class="btn-edit" onclick="openUpdateStatus('${o.id}','${o.status}')">🔄 Update</button>
          </td>
        </tr>`).join('');
}

function openUpdateStatus(orderId, currentStatus) {
  document.getElementById('us-order-id').value   = orderId;
  document.getElementById('us-order-label').textContent = orderId;
  document.getElementById('us-status').value     = currentStatus;
  document.getElementById('update-status-modal').style.display = 'flex';
}

function closeUpdateStatus() {
  document.getElementById('update-status-modal').style.display = 'none';
}

function saveOrderStatus() {
  const id     = document.getElementById('us-order-id').value;
  const status = document.getElementById('us-status').value;
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY_A) || '[]');
  const order  = orders.find(o => o.id === id);
  if (!order) return;
  order.status = status;
  localStorage.setItem(ORDERS_KEY_A, JSON.stringify(orders));
  closeUpdateStatus();
  renderOrders();
  showToast(`Order ${id} status updated to "${status}".`, 'success');
}

/* ── Users ─────────────────────────────────────────────────────────────────── */

let userSearch = '';

function renderUsers(search = userSearch) {
  userSearch = search;
  const users    = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const filtered = users.filter(u =>
    !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );
  const tbody = document.getElementById('users-body');
  if (!tbody) return;

  tbody.innerHTML = filtered.length === 0
    ? '<tr><td colspan="5" class="empty-row">No users found.</td></tr>'
    : filtered.map(u => `
        <tr>
          <td class="mono">${u.id}</td>
          <td>${u.name}</td>
          <td>${u.email}</td>
          <td><span class="role-badge role-${u.role}">${u.role}</span></td>
          <td>${formatDate(u.createdAt)}</td>
        </tr>`).join('');
}

/* ── Close modals on overlay click ──────────────────────────────────────────── */

document.addEventListener('click', e => {
  const editModal   = document.getElementById('edit-stock-modal');
  const statusModal = document.getElementById('update-status-modal');
  if (editModal   && e.target === editModal)   closeEditStock();
  if (statusModal && e.target === statusModal) closeUpdateStatus();
});

/* ── Admin logout ────────────────────────────────────────────────────────────── */

function adminLogout() {
  clearSession();
  localStorage.removeItem('gp_cart');
  localStorage.removeItem('gp_wishlist');
  window.location.href = '/admin/index.html';
}
