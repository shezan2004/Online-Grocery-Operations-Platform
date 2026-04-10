// js/payment.js — Payment page logic

const ORDERS_KEY = 'gp_orders';
let paymentMethod = 'card';
let orderReceiptData = null;

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  if (!requireLogin('/')) return;
  initStock();
  renderOrderSummary();
  bindPaymentMethods();
  setupCardNumberFormatting();
});

/* ── Order Summary ────────────────────────────────────────────────────────── */

function renderOrderSummary() {
  const cart    = loadCart();
  const coupon  = getActiveCoupon();
  const pricing = calcPricing(cart.reduce((s, i) => s + i.price * i.quantity, 0), coupon);

  const itemsEl   = document.getElementById('summary-items');
  const pricingEl = document.getElementById('summary-pricing');

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="empty-cart-msg">Your cart is empty. <a href="/">Continue shopping</a></p>';
    return;
  }

  if (itemsEl) {
    itemsEl.innerHTML = cart.map(item => `
      <div class="summary-item">
        <span class="summary-icon">${item.icon || '🛍️'}</span>
        <div class="summary-item-info">
          <span class="summary-name">${item.name}</span>
          <span class="summary-qty">× ${item.quantity}</span>
        </div>
        <span class="summary-subtotal">${formatCurrency(item.price * item.quantity)}</span>
      </div>`
    ).join('');
  }

  if (pricingEl) {
    pricingEl.innerHTML = `
      <div class="pricing-row"><span>Subtotal</span><span>${formatCurrency(pricing.subtotal)}</span></div>
      ${coupon ? `<div class="pricing-row discount"><span>Coupon (${coupon.code})</span><span>−${formatCurrency(pricing.discount)}</span></div>` : ''}
      <div class="pricing-row"><span>Gross Total</span><span>${formatCurrency(pricing.gross)}</span></div>
      <div class="pricing-row"><span>VAT (8%)</span><span>${formatCurrency(pricing.vat)}</span></div>
      <div class="pricing-row total"><span>Order Total</span><span>${formatCurrency(pricing.total)}</span></div>`;
  }
}

/* ── Payment method tabs ──────────────────────────────────────────────────── */

function bindPaymentMethods() {
  document.querySelectorAll('.method-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      paymentMethod = tab.dataset.method;
      document.querySelectorAll('.method-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.method-form').forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`form-${paymentMethod}`)?.classList.add('active');
    });
  });
  // Auto-generate bank transfer reference
  const refEl = document.getElementById('transfer-ref');
  if (refEl) refEl.value = 'TRF-' + generateId();
}

/* ── Card number formatting ──────────────────────────────────────────────── */

function setupCardNumberFormatting() {
  const cardEl = document.getElementById('card-number');
  if (!cardEl) return;
  cardEl.addEventListener('input', () => {
    let v = cardEl.value.replace(/\D/g, '').slice(0, 16);
    cardEl.value = v.replace(/(.{4})/g, '$1 ').trim();
  });
  const expEl = document.getElementById('card-expiry');
  if (expEl) {
    expEl.addEventListener('input', () => {
      let v = expEl.value.replace(/\D/g, '').slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
      expEl.value = v;
    });
  }
}

/* ── Validation ───────────────────────────────────────────────────────────── */

function validateCard() {
  const num  = document.getElementById('card-number').value.replace(/\s/g, '');
  const name = document.getElementById('card-name').value.trim();
  const exp  = document.getElementById('card-expiry').value.trim();
  const cvv  = document.getElementById('card-cvv').value.trim();
  clearErrors('form-card');

  if (!name) return setError('card-name-err', 'Cardholder name is required.');
  if (!luhnCheck(num)) return setError('card-num-err', 'Invalid card number.');

  const [mm, yy] = exp.split('/');
  const mmInt = parseInt(mm, 10);
  const yyInt = parseInt(yy, 10);
  if (!mm || !yy || isNaN(mmInt) || isNaN(yyInt) || mmInt < 1 || mmInt > 12) {
    return setError('card-exp-err', 'Invalid expiry (MM/YY).');
  }
  const currentYear  = new Date().getFullYear();
  const centuryBase  = Math.floor(currentYear / 100) * 100;
  const fullYear     = centuryBase + yyInt;
  const now = new Date();
  const expDate = new Date(fullYear, mmInt - 1, 1);
  if (expDate <= now) return setError('card-exp-err', 'Card is expired.');

  if (!/^\d{3,4}$/.test(cvv)) return setError('card-cvv-err', 'CVV must be 3-4 digits.');
  return true;
}

function validateWallet() {
  const provider = document.getElementById('wallet-provider').value;
  const email    = document.getElementById('wallet-email').value.trim();
  clearErrors('form-wallet');
  if (!provider) return setError('wallet-provider-err', 'Select a wallet provider.');
  if (!validateEmail(email)) return setError('wallet-email-err', 'Enter a valid wallet email.');
  return true;
}

function validateBank() {
  const bank    = document.getElementById('bank-name').value.trim();
  const acct    = document.getElementById('bank-account').value.trim();
  const routing = document.getElementById('bank-routing').value.trim();
  clearErrors('form-bank');
  if (!bank) return setError('bank-name-err', 'Bank name is required.');
  if (!/^\d{8,17}$/.test(acct)) return setError('bank-acct-err', 'Account number must be 8-17 digits.');
  if (!/^\d{9}$/.test(routing)) return setError('bank-routing-err', 'Routing number must be 9 digits.');
  return true;
}

function validateCOD() {
  const addr    = document.getElementById('cod-address').value.trim();
  const contact = document.getElementById('cod-contact').value.trim();
  clearErrors('form-cod');
  if (!addr) return setError('cod-addr-err', 'Delivery address is required.');
  if (!/^\d{10}$/.test(contact.replace(/\D/g, ''))) return setError('cod-contact-err', 'Enter a valid 10-digit contact number.');
  return true;
}

function setError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.style.display = 'block'; }
  return false;
}

function clearErrors(formId) {
  document.querySelectorAll(`#${formId} .field-error`).forEach(el => {
    el.textContent = ''; el.style.display = 'none';
  });
}

/* ── Stock re-validation ──────────────────────────────────────────────────── */

function revalidateStock() {
  const cart  = loadCart();
  const stock = getStock();
  const issues = [];
  cart.forEach(item => {
    const avail = stock[item.productId] ?? 0;
    if (avail < item.quantity) {
      issues.push(`"${item.name}" only has ${avail} in stock (you have ${item.quantity} in cart).`);
    }
  });
  return issues;
}

/* ── Place Order ──────────────────────────────────────────────────────────── */

function finalizePayment() {
  let valid = false;
  if (paymentMethod === 'card')   valid = validateCard();
  if (paymentMethod === 'wallet') valid = validateWallet();
  if (paymentMethod === 'bank')   valid = validateBank();
  if (paymentMethod === 'cod')    valid = validateCOD();
  if (!valid) return;

  const stockIssues = revalidateStock();
  if (stockIssues.length > 0) {
    showToast('Stock issue: ' + stockIssues[0], 'error');
    return;
  }

  const session = getSession();
  const cart    = loadCart();
  const coupon  = getActiveCoupon();
  const pricing = calcPricing(cart.reduce((s, i) => s + i.price * i.quantity, 0), coupon);

  // Deduct stock
  const stock = getStock();
  cart.forEach(item => { stock[item.productId] = (stock[item.productId] || 0) - item.quantity; });
  saveStock(stock);

  // Build payment details
  let paymentDetails = {};
  if (paymentMethod === 'card') {
    const num = document.getElementById('card-number').value.replace(/\s/g, '');
    paymentDetails = { last4: num.slice(-4), cardName: document.getElementById('card-name').value };
  } else if (paymentMethod === 'wallet') {
    paymentDetails = { provider: document.getElementById('wallet-provider').value, walletEmail: document.getElementById('wallet-email').value };
  } else if (paymentMethod === 'bank') {
    paymentDetails = { bankName: document.getElementById('bank-name').value, ref: document.getElementById('transfer-ref').value };
  } else if (paymentMethod === 'cod') {
    paymentDetails = { address: document.getElementById('cod-address').value, contact: document.getElementById('cod-contact').value, notes: document.getElementById('cod-notes')?.value };
  }

  const order = generateOrder(session, cart, coupon, pricing, paymentMethod, paymentDetails);

  // Save order
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

  clearCart();
  removeCoupon();
  orderReceiptData = order;
  renderReceipt(order);
}

function generateOrder(session, cart, coupon, pricing, method, details) {
  return {
    id: 'ORD-' + generateId(),
    userId: session.userId,
    customerName: session.name,
    customerEmail: session.email,
    createdAt: Date.now(),
    status: method === 'cod' ? 'pending' : 'processing',
    paymentMethod: method,
    paymentDetails: details,
    couponCode: coupon ? coupon.code : null,
    items: cart.map(i => ({ productId: i.productId, name: i.name, icon: i.icon, price: i.price, quantity: i.quantity })),
    subtotal: pricing.subtotal,
    discount: pricing.discount,
    gross: pricing.gross,
    vat: pricing.vat,
    total: pricing.total
  };
}

/* ── Receipt ──────────────────────────────────────────────────────────────── */

function renderReceipt(order) {
  document.getElementById('payment-section').style.display = 'none';
  const receipt = document.getElementById('receipt-section');
  receipt.style.display = 'block';

  const methodLabels = { card: '💳 Credit/Debit Card', wallet: '📱 Digital Wallet', bank: '🏦 Bank Transfer', cod: '💵 Cash on Delivery' };
  const statusColor  = { pending: '#f77f00', processing: '#0077b6', shipped: '#7209b7', delivered: '#2d6a4f', cancelled: '#d62828' };

  receipt.innerHTML = `
    <div class="receipt-card">
      <div class="receipt-header">
        <div class="receipt-success-icon">✅</div>
        <h2>Order Confirmed!</h2>
        <p class="receipt-sub">Thank you for shopping with FreshMart</p>
      </div>
      <div class="receipt-meta">
        <div><strong>Order ID:</strong> ${order.id}</div>
        <div><strong>Date:</strong> ${formatDate(order.createdAt)}</div>
        <div><strong>Customer:</strong> ${order.customerName}</div>
        <div><strong>Email:</strong> ${order.customerEmail}</div>
        <div><strong>Payment:</strong> ${methodLabels[order.paymentMethod] || order.paymentMethod}</div>
        <div><strong>Status:</strong> <span class="status-badge" style="background:${statusColor[order.status]}20;color:${statusColor[order.status]}">${order.status}</span></div>
      </div>
      <div class="receipt-items">
        <h3>Items Ordered</h3>
        ${order.items.map(item => `
          <div class="receipt-item">
            <span>${item.icon || '🛍️'} ${item.name} × ${item.quantity}</span>
            <span>${formatCurrency(item.price * item.quantity)}</span>
          </div>`).join('')}
      </div>
      <div class="receipt-pricing">
        <div class="pricing-row"><span>Subtotal</span><span>${formatCurrency(order.subtotal)}</span></div>
        ${order.discount > 0 ? `<div class="pricing-row discount"><span>Discount (${order.couponCode})</span><span>−${formatCurrency(order.discount)}</span></div>` : ''}
        <div class="pricing-row"><span>Gross Total</span><span>${formatCurrency(order.gross)}</span></div>
        <div class="pricing-row"><span>VAT (8%)</span><span>${formatCurrency(order.vat)}</span></div>
        <div class="pricing-row total"><span>Total Paid</span><span>${formatCurrency(order.total)}</span></div>
      </div>
      <div class="receipt-actions">
        <button onclick="window.print()" class="btn-print">🖨️ Print Receipt</button>
        <a href="/" class="btn-continue">🛒 Continue Shopping</a>
        <a href="/profile.html#orders" class="btn-orders">📦 View My Orders</a>
      </div>
    </div>`;
}
