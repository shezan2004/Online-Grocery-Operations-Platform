// js/cart.js — Cart state, coupon engine, pricing

const CART_KEY     = 'gp_cart';
const WISHLIST_KEY = 'gp_wishlist';
const STOCK_KEY    = 'gp_stock';
const VAT_RATE     = 0.08;

/* ── Stock helpers ──────────────────────────────────────────────────────── */

function getStock() {
  try { return JSON.parse(localStorage.getItem(STOCK_KEY)) || {}; }
  catch { return {}; }
}

function saveStock(stock) {
  localStorage.setItem(STOCK_KEY, JSON.stringify(stock));
}

function initStock() {
  const stock = getStock();
  let changed = false;
  PRODUCTS.forEach(p => {
    if (!(p.id in stock)) { stock[p.id] = p.stock; changed = true; }
  });
  if (changed) saveStock(stock);
  return stock;
}

function getProductStock(productId) {
  const stock = getStock();
  const product = PRODUCTS.find(p => p.id === productId);
  return stock[productId] ?? (product ? product.stock : 0);
}

/* ── Cart load / save ───────────────────────────────────────────────────── */

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ── Cart operations ────────────────────────────────────────────────────── */

function addToCart(product, qty = 1) {
  const cart = loadCart();
  const avail = getProductStock(product.id);
  const existing = cart.find(i => i.productId === product.id);
  const currentQty = existing ? existing.quantity : 0;

  if (currentQty + qty > avail) {
    showToast(`Only ${avail} units available for ${product.name}.`, 'warning');
    return false;
  }

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ productId: product.id, name: product.name, price: product.price, quantity: qty, maxStock: avail, icon: product.icon });
  }
  saveCart(cart);
  renderCart();
  updateCartBadge();
  showToast(`${product.name} added to cart!`, 'success');
  return true;
}

function removeFromCart(productId) {
  const cart = loadCart().filter(i => i.productId !== productId);
  saveCart(cart);
  renderCart();
  updateCartBadge();
}

function updateQty(productId, delta) {
  const cart = loadCart();
  const item = cart.find(i => i.productId === productId);
  if (!item) return;

  const avail = getProductStock(productId);
  const newQty = item.quantity + delta;
  if (newQty < 1) { removeFromCart(productId); return; }
  if (newQty > avail) { showToast(`Only ${avail} in stock.`, 'warning'); return; }

  item.quantity = newQty;
  item.maxStock = avail;
  saveCart(cart);
  renderCart();
  updateCartBadge();
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
}

/* ── Coupon state ───────────────────────────────────────────────────────── */

let activeCoupon = null;

function applyCoupon(code) {
  if (!code) return { ok: false, msg: 'Please enter a coupon code.' };
  const coupons = JSON.parse(localStorage.getItem(COUPONS_KEY) || '[]');
  const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
  if (!coupon) return { ok: false, msg: 'Coupon not found.' };

  const cart = loadCart();
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  if (subtotal < coupon.minOrder) {
    return { ok: false, msg: `Minimum order of ${formatCurrency(coupon.minOrder)} required.` };
  }

  activeCoupon = coupon;
  renderCart();
  return { ok: true, msg: `Coupon "${coupon.code}" applied — ${coupon.description}` };
}

function removeCoupon() {
  activeCoupon = null;
  renderCart();
}

function getActiveCoupon() { return activeCoupon; }

/* ── Pricing calculation ────────────────────────────────────────────────── */

function calcPricing(subtotal, coupon) {
  let discount = 0;
  if (coupon) {
    discount = coupon.type === 'percent'
      ? subtotal * (coupon.value / 100)
      : Math.min(coupon.value, subtotal);
  }
  const gross = Math.max(subtotal - discount, 0);
  const vat   = gross * VAT_RATE;
  const total = gross + vat;
  return { subtotal, discount, gross, vat, total };
}

function getCartTotal() {
  const cart = loadCart();
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  return calcPricing(subtotal, activeCoupon);
}

/* ── Cart badge ─────────────────────────────────────────────────────────── */

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const total = loadCart().reduce((s, i) => s + i.quantity, 0);
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

/* ── Render cart sidebar ─────────────────────────────────────────────────── */

function renderCart() {
  const panel = document.getElementById('cart-panel');
  if (!panel) return;

  const cart = loadCart();
  const itemsEl = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');
  const footerEl = document.getElementById('cart-footer');

  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'flex';
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';
  if (footerEl) footerEl.style.display = 'block';

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.productId}">
      <span class="cart-item-icon">${item.icon || '🛍️'}</span>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${formatCurrency(item.price)} each</p>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="updateQty('${item.productId}', -1)">−</button>
        <span class="qty-val">${item.quantity}</span>
        <button class="qty-btn" onclick="updateQty('${item.productId}', 1)">+</button>
      </div>
      <div class="cart-item-right">
        <span class="cart-item-sub">${formatCurrency(item.price * item.quantity)}</span>
        <button class="cart-remove" onclick="removeFromCart('${item.productId}')" title="Remove">✕</button>
      </div>
    </div>
  `).join('');

  // Coupon section
  const couponSection = document.getElementById('coupon-section');
  if (couponSection) {
    const ac = activeCoupon;
    couponSection.innerHTML = ac
      ? `<div class="coupon-applied">
           <span>🎉 <strong>${ac.code}</strong> — ${ac.description}</span>
           <button onclick="removeCoupon()" class="coupon-remove">Remove</button>
         </div>`
      : `<div class="coupon-row">
           <input id="coupon-input" type="text" placeholder="Enter coupon code" />
           <button onclick="handleApplyCoupon()">Apply</button>
         </div>`;
  }

  // Pricing breakdown
  const pricing = getCartTotal();
  const pricingEl = document.getElementById('cart-pricing');
  if (pricingEl) {
    pricingEl.innerHTML = `
      <div class="pricing-row"><span>Subtotal</span><span>${formatCurrency(pricing.subtotal)}</span></div>
      ${pricing.discount > 0 ? `<div class="pricing-row discount"><span>Discount</span><span>−${formatCurrency(pricing.discount)}</span></div>` : ''}
      <div class="pricing-row"><span>Gross Total</span><span>${formatCurrency(pricing.gross)}</span></div>
      <div class="pricing-row"><span>VAT (8%)</span><span>${formatCurrency(pricing.vat)}</span></div>
      <div class="pricing-row total"><span>Total</span><span>${formatCurrency(pricing.total)}</span></div>
    `;
  }
}

function handleApplyCoupon() {
  const input = document.getElementById('coupon-input');
  if (!input) return;
  const result = applyCoupon(input.value);
  showToast(result.msg, result.ok ? 'success' : 'error');
}

/* ── Wishlist ────────────────────────────────────────────────────────────── */

function loadWishlist() {
  try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
  catch { return []; }
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

function toggleWishlist(productId) {
  let list = loadWishlist();
  if (list.includes(productId)) {
    list = list.filter(id => id !== productId);
    showToast('Removed from wishlist.', 'info');
  } else {
    list.push(productId);
    showToast('Added to wishlist! ❤️', 'success');
  }
  saveWishlist(list);
  return list.includes(productId);
}

function isInWishlist(productId) {
  return loadWishlist().includes(productId);
}
