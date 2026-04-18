// --- 1. ENHANCED PRODUCT DATABASE WITH RATINGS & STOCK ---
const products = [
    // FRUITS & VEGETABLES
    { id: 1, name: 'Organic Bananas', price: 0.99, category: 'fruit', img: '🍌', rating: 4.5, reviews: 128, stock: 45 },
    { id: 2, name: 'Red Bell Pepper', price: 1.50, category: 'veggie', img: '🫑', rating: 4.3, reviews: 89, stock: 32 },
    { id: 3, name: 'Fresh Strawberries', price: 2.99, category: 'fruit', img: '🍓', rating: 4.8, reviews: 156, stock: 28 },
    { id: 4, name: 'Organic Kale', price: 2.20, category: 'veggie', img: '🥬', rating: 4.2, reviews: 67, stock: 22 },
    { id: 5, name: 'Green Apples', price: 1.75, category: 'fruit', img: '🍏', rating: 4.4, reviews: 95, stock: 50 },
    { id: 6, name: 'Carrots (1lb)', price: 0.85, category: 'veggie', img: '🥕', rating: 4.6, reviews: 112, stock: 60 },
    { id: 7, name: 'Orange Juice', price: 3.99, category: 'fruit', img: '🍊', rating: 4.1, reviews: 73, stock: 35 },
    { id: 8, name: 'Broccoli', price: 2.50, category: 'veggie', img: '🥦', rating: 4.3, reviews: 81, stock: 19 },

    // DAIRY & EGGS
    { id: 9, name: 'Whole Milk', price: 3.49, category: 'dairy', img: '🥛', rating: 4.7, reviews: 145, stock: 55 },
    { id: 10, name: 'Large Eggs (12pk)', price: 4.50, category: 'dairy', img: '🥚', rating: 4.8, reviews: 167, stock: 42 },
    { id: 11, name: 'Cheddar Cheese', price: 4.99, category: 'dairy', img: '🧀', rating: 4.5, reviews: 103, stock: 31 },
    { id: 12, name: 'Greek Yogurt', price: 5.50, category: 'dairy', img: '🥑', rating: 4.6, reviews: 129, stock: 38 },
    { id: 13, name: 'Butter (1lb)', price: 3.75, category: 'dairy', img: '🧈', rating: 4.4, reviews: 87, stock: 26 },
    { id: 14, name: 'Mozzarella', price: 4.25, category: 'dairy', img: '🧀', rating: 4.5, reviews: 98, stock: 24 },

    // BAKERY
    { id: 15, name: 'Sourdough Bread', price: 4.00, category: 'bakery', img: '🍞', rating: 4.7, reviews: 134, stock: 20 },
    { id: 16, name: 'Blueberry Muffin', price: 2.50, category: 'bakery', img: '🧁', rating: 4.3, reviews: 76, stock: 15 },
    { id: 17, name: 'Croissant', price: 2.99, category: 'bakery', img: '🥐', rating: 4.4, reviews: 92, stock: 18 },
    { id: 18, name: 'Whole Wheat Bread', price: 3.50, category: 'bakery', img: '🍞', rating: 4.2, reviews: 69, stock: 25 },
    { id: 19, name: 'Chocolate Donut', price: 1.99, category: 'bakery', img: '🍩', rating: 4.6, reviews: 118, stock: 30 },

    // BABY FOOD & CARE
    { id: 20, name: 'Baby Formula', price: 12.99, category: 'baby', img: '🍼', rating: 4.8, reviews: 142, stock: 40 },
    { id: 21, name: 'Infant Cereal', price: 4.50, category: 'baby', img: '🥣', rating: 4.5, reviews: 75, stock: 22 },
    { id: 22, name: 'Diapers XL Pack', price: 24.99, category: 'baby', img: '👶', rating: 4.7, reviews: 189, stock: 50 },
    { id: 23, name: 'Baby Wipes', price: 8.99, category: 'baby', img: '🧻', rating: 4.6, reviews: 108, stock: 35 },
    { id: 24, name: 'Baby Shampoo', price: 6.99, category: 'baby', img: '🧴', rating: 4.4, reviews: 82, stock: 28 },
    { id: 25, name: 'Pacifiers (3pk)', price: 5.99, category: 'baby', img: '🍭', rating: 4.3, reviews: 64, stock: 20 },

    // HOME CLEANING
    { id: 26, name: 'All-Purpose Cleaner', price: 3.99, category: 'cleaning', img: '🧹', rating: 4.2, reviews: 71, stock: 45 },
    { id: 27, name: 'Laundry Detergent', price: 7.99, category: 'cleaning', img: '🧺', rating: 4.5, reviews: 124, stock: 38 },
    { id: 28, name: 'Dish Soap', price: 2.49, category: 'cleaning', img: '🍽️', rating: 4.3, reviews: 85, stock: 50 },
    { id: 29, name: 'Bleach', price: 4.50, category: 'cleaning', img: '💧', rating: 4.1, reviews: 56, stock: 32 },
    { id: 30, name: 'Floor Cleaner', price: 5.99, category: 'cleaning', img: '🧹', rating: 4.4, reviews: 79, stock: 27 },
    { id: 31, name: 'Toilet Brush Set', price: 6.99, category: 'cleaning', img: '🚽', rating: 4.2, reviews: 61, stock: 21 },
    { id: 32, name: 'Sponges (12pk)', price: 3.49, category: 'cleaning', img: '🧽', rating: 4.6, reviews: 103, stock: 55 },

    // PET CARE
    { id: 33, name: 'Dog Food Premium', price: 14.99, category: 'pet', img: '🐕', rating: 4.7, reviews: 138, stock: 36 },
    { id: 34, name: 'Cat Food', price: 8.99, category: 'pet', img: '🐈', rating: 4.5, reviews: 97, stock: 44 },
    { id: 35, name: 'Dog Treats', price: 5.99, category: 'pet', img: '🦴', rating: 4.4, reviews: 88, stock: 52 },
    { id: 36, name: 'Cat Litter', price: 12.99, category: 'pet', img: '🐱', rating: 4.3, reviews: 101, stock: 28 },
    { id: 37, name: 'Pet Shampoo', price: 7.99, category: 'pet', img: '🧴', rating: 4.2, reviews: 68, stock: 33 },
    { id: 38, name: 'Dog Bed', price: 24.99, category: 'pet', img: '🛏️', rating: 4.6, reviews: 115, stock: 18 },
    { id: 39, name: 'Cat Scratching Post', price: 19.99, category: 'pet', img: '📦', rating: 4.4, reviews: 83, stock: 14 },

    // BEAUTY & HEALTH
    { id: 40, name: 'Face Wash', price: 8.99, category: 'beauty', img: '🧴', rating: 4.6, reviews: 127, stock: 41 },
    { id: 41, name: 'Moisturizer', price: 12.99, category: 'beauty', img: '💧', rating: 4.7, reviews: 144, stock: 35 },
    { id: 42, name: 'Sunscreen SPF 50', price: 9.99, category: 'beauty', img: '☀️', rating: 4.5, reviews: 102, stock: 48 },
    { id: 43, name: 'Shampoo & Conditioner', price: 7.99, category: 'beauty', img: '🧴', rating: 4.4, reviews: 119, stock: 52 },
    { id: 44, name: 'Toothpaste', price: 3.99, category: 'beauty', img: '🪥', rating: 4.8, reviews: 156, stock: 60 },
    { id: 45, name: 'Multivitamins', price: 14.99, category: 'beauty', img: '💊', rating: 4.6, reviews: 110, stock: 37 },
    { id: 46, name: 'Vitamin C Serum', price: 16.99, category: 'beauty', img: '💧', rating: 4.7, reviews: 135, stock: 26 },
    { id: 47, name: 'Face Mask', price: 6.99, category: 'beauty', img: '😷', rating: 4.3, reviews: 74, stock: 39 },

    // FASHION & LIFESTYLE
    { id: 48, name: 'Cotton T-Shirt', price: 12.99, category: 'fashion', img: '👕', rating: 4.5, reviews: 96, stock: 47 },
    { id: 49, name: 'Denim Jeans', price: 39.99, category: 'fashion', img: '👖', rating: 4.6, reviews: 122, stock: 29 },
    { id: 50, name: 'Sports Socks (6pk)', price: 8.99, category: 'fashion', img: '🧦', rating: 4.4, reviews: 87, stock: 54 },
    { id: 51, name: 'Winter Jacket', price: 59.99, category: 'fashion', img: '🧥', rating: 4.7, reviews: 98, stock: 15 },
    { id: 52, name: 'Casual Sneakers', price: 45.99, category: 'fashion', img: '👟', rating: 4.6, reviews: 111, stock: 23 },
    { id: 53, name: 'Baseball Cap', price: 14.99, category: 'fashion', img: '🧢', rating: 4.3, reviews: 72, stock: 38 },
    { id: 54, name: 'Scarf', price: 16.99, category: 'fashion', img: '🧣', rating: 4.4, reviews: 81, stock: 25 },

    // HOME & KITCHEN
    { id: 55, name: 'Stainless Steel Pan', price: 24.99, category: 'home', img: '🍳', rating: 4.7, reviews: 113, stock: 32 },
    { id: 56, name: 'Ceramic Plates (6)', price: 19.99, category: 'home', img: '🍽️', rating: 4.5, reviews: 94, stock: 27 },
    { id: 57, name: 'Kitchen Knife Set', price: 29.99, category: 'home', img: '🔪', rating: 4.8, reviews: 148, stock: 21 },
    { id: 58, name: 'Blender', price: 34.99, category: 'home', img: '🥤', rating: 4.6, reviews: 105, stock: 18 },
    { id: 59, name: 'Coffee Maker', price: 39.99, category: 'home', img: '☕', rating: 4.7, reviews: 126, stock: 16 },
    { id: 60, name: 'Cutting Board', price: 12.99, category: 'home', img: '🪵', rating: 4.4, reviews: 77, stock: 43 },
    { id: 61, name: 'Microwave Safe Containers', price: 9.99, category: 'home', img: '📦', rating: 4.5, reviews: 89, stock: 51 },
    { id: 62, name: 'Bed Sheets Set', price: 34.99, category: 'home', img: '🛏️', rating: 4.6, reviews: 117, stock: 25 },

    // STATIONERIES
    { id: 63, name: 'Notebook (100 pages)', price: 2.99, category: 'stationary', img: '📓', rating: 4.3, reviews: 59, stock: 70 },
    { id: 64, name: 'Ballpoint Pens (12pk)', price: 4.99, category: 'stationary', img: '🖊️', rating: 4.4, reviews: 91, stock: 65 },
    { id: 65, name: 'Colored Pencils Set', price: 8.99, category: 'stationary', img: '✏️', rating: 4.5, reviews: 106, stock: 42 },
    { id: 66, name: 'A4 Copy Paper (500)', price: 5.99, category: 'stationary', img: '📄', rating: 4.2, reviews: 52, stock: 58 },
    { id: 67, name: 'Desk Organizer', price: 12.99, category: 'stationary', img: '📦', rating: 4.5, reviews: 84, stock: 34 },
    { id: 68, name: 'Sticky Notes Pack', price: 3.49, category: 'stationary', img: '📝', rating: 4.6, reviews: 98, stock: 62 },
    { id: 69, name: 'Highlighters (6pk)', price: 4.49, category: 'stationary', img: '🖍️', rating: 4.3, reviews: 67, stock: 48 },
    { id: 70, name: 'Folder Set', price: 6.99, category: 'stationary', img: '📁', rating: 4.4, reviews: 75, stock: 40 },

    // TOYS & SPORTS
    { id: 71, name: 'Lego Set (500 pieces)', price: 34.99, category: 'toys', img: '🧱', rating: 4.8, reviews: 158, stock: 22 },
    { id: 72, name: 'Board Game', price: 24.99, category: 'toys', img: '🎲', rating: 4.5, reviews: 93, stock: 28 },
    { id: 73, name: 'Bicycle Helmet', price: 29.99, category: 'toys', img: '🚴', rating: 4.6, reviews: 109, stock: 19 },
    { id: 74, name: 'Soccer Ball', price: 14.99, category: 'toys', img: '⚽', rating: 4.4, reviews: 86, stock: 36 },
    { id: 75, name: 'Basketball', price: 19.99, category: 'toys', img: '🏀', rating: 4.5, reviews: 104, stock: 30 },
    { id: 76, name: 'Skateboard', price: 49.99, category: 'toys', img: '🛹', rating: 4.7, reviews: 120, stock: 12 },
    { id: 77, name: 'Roller Skates', price: 44.99, category: 'toys', img: '🛼', rating: 4.6, reviews: 101, stock: 14 },
    { id: 78, name: 'Action Figure', price: 9.99, category: 'toys', img: '🦸', rating: 4.3, reviews: 66, stock: 48 },

    // GADGETS & ELECTRONICS
    { id: 79, name: 'USB-C Cable', price: 8.99, category: 'gadgets', img: '🔌', rating: 4.5, reviews: 137, stock: 75 },
    { id: 80, name: 'Wireless Charger', price: 19.99, category: 'gadgets', img: '🔌', rating: 4.7, reviews: 147, stock: 32 },
    { id: 81, name: 'Bluetooth Speaker', price: 34.99, category: 'gadgets', img: '🔊', rating: 4.6, reviews: 131, stock: 24 },
    { id: 82, name: 'Phone Screen Protector', price: 4.99, category: 'gadgets', img: '📱', rating: 4.3, reviews: 71, stock: 68 },
    { id: 83, name: 'Wireless Earbuds', price: 49.99, category: 'gadgets', img: '🎧', rating: 4.8, reviews: 165, stock: 19 },
    { id: 84, name: 'Power Bank', price: 24.99, category: 'gadgets', img: '🔋', rating: 4.7, reviews: 142, stock: 28 },
    { id: 85, name: 'LED Desk Lamp', price: 19.99, category: 'gadgets', img: '💡', rating: 4.5, reviews: 95, stock: 36 },
    { id: 86, name: 'Smart Watch', price: 99.99, category: 'gadgets', img: '⌚', rating: 4.8, reviews: 178, stock: 11 },
];

// Global Variables
let cart = [];
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
let appliedCoupon = null;

const APP_CONFIG = {
    STORE_NAME: 'SuperMart',
    VAT_RATE: 0.05,
    ORDER_STATUSES: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Paid']
};

function loadPersistedStock() {
    const savedStock = JSON.parse(localStorage.getItem('product_stock') || '{}');
    products.forEach(product => {
        if (typeof savedStock[product.id] === 'number' && savedStock[product.id] >= 0) {
            product.stock = savedStock[product.id];
        }
    });
}

function persistStock() {
    const stockMap = products.reduce((acc, product) => {
        acc[product.id] = product.stock;
        return acc;
    }, {});

    localStorage.setItem('product_stock', JSON.stringify(stockMap));
}

// Initialize default admin if none exists
function initializeDefaultAdmin() {
    const users = JSON.parse(localStorage.getItem('grocery_users') || '[]');
    const adminExists = users.some(u => u.role === 'admin');
    if (!adminExists) {
        users.push({ 
            name: 'Admin', 
            email: 'admin@supermart.com', 
            pass: 'admin123', 
            role: 'admin',
            createdDate: new Date().toISOString()
        });
        localStorage.setItem('grocery_users', JSON.stringify(users));
    }
}

// Promotional Coupons
const coupons = {
    'SAVE10': { discount: 10, type: 'percentage', minAmount: 50 },
    'SAVE20': { discount: 20, type: 'percentage', minAmount: 100 },
    'SUMMER': { discount: 15, type: 'percentage', minAmount: 75 },
    'WELCOME': { discount: 5, type: 'percentage', minAmount: 30 },
    'SAVE5': { discount: 5, type: 'fixed', minAmount: 0 }
};

function formatCurrency(value) {
    return `$${Number(value || 0).toFixed(2)}`;
}

function calculateOrderPricing(items = [], couponCode = null) {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;

    if (couponCode && coupons[couponCode]) {
        const coupon = coupons[couponCode];
        if (subtotal >= coupon.minAmount) {
            discount = coupon.type === 'percentage'
                ? subtotal * coupon.discount / 100
                : coupon.discount;
        }
    }

    const grossTotal = Math.max(0, subtotal - discount);
    const vat = grossTotal * APP_CONFIG.VAT_RATE;
    const total = grossTotal + vat;

    return {
        subtotal,
        discount,
        grossTotal,
        vat,
        total
    };
}

function normalizeOrderStatus(status) {
    if (!status) return 'Pending';
    const normalized = String(status).trim().toLowerCase();
    const matched = APP_CONFIG.ORDER_STATUSES.find(s => s.toLowerCase() === normalized);
    return matched || 'Pending';
}

function normalizeOrder(order = {}) {
    const items = Array.isArray(order.items)
        ? order.items
        : (Array.isArray(order.cart) ? order.cart : []);

    const createdDate = order.createdDate || order.date || new Date().toISOString();
    const paymentMethod = order.paymentMethod || order.method || 'unknown';
    const couponCode = order.couponCode || null;

    let pricing = order.pricing;
    if (!pricing) {
        pricing = calculateOrderPricing(items, couponCode);
        if (typeof order.total === 'number' && (!order.vat || !order.grossTotal)) {
            // Legacy records may only store a final total.
            pricing.total = order.total;
            pricing.grossTotal = typeof order.grossTotal === 'number' ? order.grossTotal : order.total / (1 + APP_CONFIG.VAT_RATE);
            pricing.vat = typeof order.vat === 'number' ? order.vat : (pricing.total - pricing.grossTotal);
        }
    }

    return {
        id: order.id || ('ORD' + Date.now()),
        customerName: order.customerName || 'Unknown Customer',
        customerEmail: order.customerEmail || 'unknown@customer.local',
        paymentMethod,
        paymentLabel: order.paymentLabel || paymentMethod,
        paymentReference: order.paymentReference || '',
        items,
        address: order.address || 'N/A',
        phone: order.phone || '',
        couponCode,
        pricing,
        subtotal: pricing.subtotal,
        discount: pricing.discount,
        grossTotal: pricing.grossTotal,
        vat: pricing.vat,
        total: pricing.total,
        createdDate,
        status: normalizeOrderStatus(order.status),
        receipt: order.receipt || null
    };
}

// Initialize on page load
window.addEventListener('load', () => {
    initializeDefaultAdmin();
    loadPersistedStock();
});

// --- 2. AUTHENTICATION LOGIC ---

function toggleAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.toggle('show');
}

// --- AUTHENTICATION LOGIC ---

function switchAuth(type) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabLogin = document.getElementById('tabLogin');
    const tabSignup = document.getElementById('tabSignup');

    if (type === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        tabLogin.classList.add('active');
        tabSignup.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        tabLogin.classList.remove('active');
        tabSignup.classList.add('active');
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const pass = document.getElementById('signupPass').value;

    const users = JSON.parse(localStorage.getItem('grocery_users') || '[]');
    if (users.find(u => u.email === email)) {
        return alert("User already exists!");
    }

    users.push({ 
        name, 
        email, 
        pass,
        role: 'customer',
        createdDate: new Date().toISOString()
    });
    localStorage.setItem('grocery_users', JSON.stringify(users));
    alert("Signup successful! Now please login.");
    switchAuth('login');
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;

    const users = JSON.parse(localStorage.getItem('grocery_users') || '[]');
    const user = users.find(u => u.email === email && u.pass === pass);

    if (user) {
        const sessionUser = {
            name: user.name,
            email: user.email,
            role: user.role,
            createdDate: user.createdDate
        };
        localStorage.setItem('currentUser', JSON.stringify(sessionUser));
        
        // Redirect to admin dashboard if admin
        if (user.role === 'admin') {
            window.location.href = "admin.html";
        } else {
            window.location.href = "index.html";
        }
    } else {
        alert("Invalid credentials.");
    }
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
}

function handleForgotPassword() {
    const email = document.getElementById('loginEmail').value;
    
    if (!email) {
        alert('Please enter your email address first!');
        document.getElementById('loginEmail').focus();
        return;
    }

    const users = JSON.parse(localStorage.getItem('grocery_users') || '[]');
    const user = users.find(u => u.email === email);

    if (user) {
        // In a real application, you would send a password reset email
        // For now, we'll show a temporary password option
        localStorage.setItem('passwordResetEmail', email);
        
        const resetToken = Math.random().toString(36).substr(2, 9);
        localStorage.setItem('resetToken_' + email, resetToken);
        
        // Show reset password dialog
        const newPassword = prompt('Enter your new password:', '');
        
        if (newPassword && newPassword.trim()) {
            if (newPassword.length < 6) {
                alert('Password must be at least 6 characters long!');
                return;
            }
            
            user.pass = newPassword;
            const updatedUsers = users.map(u => u.email === email ? user : u);
            localStorage.setItem('grocery_users', JSON.stringify(updatedUsers));
            alert('✓ Password reset successfully! You can now login with your new password.');
        }
    } else {
        alert('⚠ No account found with this email address!');
    }
}

function updateUserUI(userName) {
    const navActions = document.querySelector('.nav-actions');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (navActions) {
        let adminBtn = '';
        if (currentUser && currentUser.role === 'admin') {
            adminBtn = '<button onclick="window.location.href=\'admin.html\'" class="login-btn" style="background:#10b981">Admin Panel</button>';
        }
        
        navActions.innerHTML = `
            <div class="user-info" style="display:flex; align-items:center; gap:15px;">
                <span style="font-weight:600">Hi, ${userName.split(' ')[0]}!</span>
                ${adminBtn}
                <button onclick="window.location.href='profile.html'" class="login-btn" style="background:#3498db">My Profile</button>
                <button onclick="handleLogout()" class="login-btn" style="background:#e74c3c">Logout</button>
            </div>
            <div class="cart-container" onclick="toggleCart()">
                <span class="icon">🛒</span>
                <span id="cartCount" class="badge">0</span>
            </div>
        `;
        updateCartUI();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    const navActions = document.querySelector('.nav-actions');

    if (loggedUser && navActions) {
        updateUserUI(loggedUser.name);
    }

    if (document.getElementById('productGrid')) {
        displayProducts(products);
    }
});

// --- 3. SHOP & PRODUCT LOGIC ---

function displayProducts(items) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    
    grid.innerHTML = items.map(product => `
        <div class="product-card">
            <div class="img">${product.img}</div>
            <h3>${product.name}</h3>
            <div class="rating">
                <span class="stars">★ ${product.rating}</span>
                <span class="reviews">(${product.reviews})</span>
            </div>
            <div class="stock-status ${product.stock > 20 ? 'in-stock' : 'low-stock'}">
                ${product.stock > 20 ? '✓ In Stock' : '⚠ Low Stock (' + product.stock + ')'}
            </div>
            <p class="price">$${product.price.toFixed(2)}</p>
            <div class="quantity-selector">
                <button class="qty-btn" onclick="decreaseQuantity(${product.id})">−</button>
                <input type="number" id="qty-${product.id}" class="qty-input" value="1" min="1" max="${product.stock}" readonly>
                <button class="qty-btn" onclick="increaseQuantity(${product.id}, ${product.stock})">+</button>
            </div>
            <div class="product-actions">
                <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="wishlist-btn" onclick="toggleWishlist(${product.id})">♡</button>
            </div>
        </div>
    `).join('');
}

const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(term));
        displayProducts(filtered);
    });
}

function filterProducts(cat, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (cat === 'all') return displayProducts(products);
    const filtered = products.filter(p => p.category === cat);
    displayProducts(filtered);
}

// --- 4. CART OPERATIONS ---

function increaseQuantity(productId, maxStock) {
    const input = document.getElementById(`qty-${productId}`);
    if (input) {
        const current = parseInt(input.value);
        if (current < maxStock) {
            input.value = current + 1;
        }
    }
}

function decreaseQuantity(productId) {
    const input = document.getElementById(`qty-${productId}`);
    if (input) {
        const current = parseInt(input.value);
        if (current > 1) {
            input.value = current - 1;
        }
    }
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const qtyInput = document.getElementById(`qty-${id}`);
    const quantity = qtyInput ? parseInt(qtyInput.value) : 1;
    if (!product || product.stock <= 0) {
        showToast('This item is out of stock');
        return;
    }
    
    const existing = cart.find(item => item.id === id);

    const currentInCart = existing ? existing.quantity : 0;
    if (currentInCart + quantity > product.stock) {
        showToast(`Only ${product.stock} available in stock`);
        return;
    }

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ ...product, quantity: quantity });
    }
    
    // Reset quantity selector
    if (qtyInput) qtyInput.value = 1;
    
    updateCartUI();
    showToast(`${product.name} (x${quantity}) added to basket!`);
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    if (cartCount) cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    if (cartItems) {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                <div>
                    <strong>${item.name}</strong><br>
                    ${item.quantity} x $${item.price.toFixed(2)}
                </div>
                <button onclick="removeFromCart(${item.id})" style="border:none; color:#e74c3c; cursor:pointer; background:none; font-weight:bold;">Remove</button>
            </div>
        `).join('');
    }

    const pricing = calculateOrderPricing(cart, appliedCoupon);
    if (cartTotal) cartTotal.innerText = formatCurrency(pricing.total);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar) sidebar.classList.toggle('open');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please login first!');
        toggleAuthModal();
        return;
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'payment.html';
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
}

// --- 5. WISHLIST ---

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Removed from wishlist');
    } else {
        wishlist.push(productId);
        showToast('Added to wishlist!');
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistButton(productId);
}

function updateWishlistButton(productId) {
    const btn = document.querySelector(`button[onclick="toggleWishlist(${productId})"]`);
    if (btn) {
        btn.style.color = wishlist.includes(productId) ? '#e74c3c' : '#ddd';
    }
}

// --- 6. COUPON SYSTEM ---

function applyCoupon(code) {
    code = code.toUpperCase();
    if (coupons[code]) {
        appliedCoupon = code;
        updateCartUI();
        showToast(`Coupon ${code} applied! Save ${formatCurrency(getCouponDiscount())}`);
        localStorage.setItem('appliedCoupon', code);
    } else {
        showToast('Invalid coupon code!');
    }
}

function getCouponDiscount() {
    if (!appliedCoupon) return 0;
    return calculateOrderPricing(cart, appliedCoupon).discount;
}

// --- 7. SIDEBAR FILTER LOGIC ---

function toggleSidebar() {
    const sidebar = document.getElementById('filterSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
    if (hamburgerBtn) hamburgerBtn.classList.toggle('active');
}

function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('.category-item input[type="checkbox"]:checked')).map(c => c.value);
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || 500;

    let filtered = products;

    // Filter by categories
    if (selectedCategories.length > 0) {
        filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Filter by price
    filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);

    displayProducts(filtered);
}

function updateMaxPrice(value) {
    document.getElementById('priceMax').innerText = '$' + value;
    document.getElementById('maxPrice').value = value;
    applyFilters();
}

function resetFilters() {
    // Clear category checkboxes
    document.querySelectorAll('.category-item input[type="checkbox"]').forEach(c => c.checked = false);
    
    // Reset price inputs
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '500';
    document.getElementById('priceSlider').value = '500';
    document.getElementById('priceMin').innerText = '$0';
    document.getElementById('priceMax').innerText = '$500';
    
    // Display all products
    displayProducts(products);
}

// Load coupon from localStorage
window.addEventListener('DOMContentLoaded', () => {
    appliedCoupon = localStorage.getItem('appliedCoupon');
    wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
});

// ============ ADMIN FUNCTIONS ============

// Save order to localStorage
function saveOrder(orderData) {
    const orders = getOrders();
    const order = normalizeOrder({
        id: 'ORD' + Date.now(),
        ...orderData,
        createdDate: new Date().toISOString(),
        status: orderData.status || 'Pending'
    });
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    return order;
}

// Get all orders
function getOrders() {
    const rawOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const normalized = rawOrders.map(normalizeOrder);

    // Keep storage consistent as legacy orders are read.
    localStorage.setItem('orders', JSON.stringify(normalized));
    return normalized;
}

function getOrdersByCustomer(email) {
    if (!email) return [];
    return getOrders().filter(order => String(order.customerEmail).toLowerCase() === String(email).toLowerCase());
}

// Update order status
function updateOrderStatus(orderId, status) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = normalizeOrderStatus(status);
        localStorage.setItem('orders', JSON.stringify(orders));
        return true;
    }
    return false;
}

// Update product stock
function updateProductStock(productId, newStock) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.stock = newStock;
        persistStock();
        return true;
    }
    return false;
}

// Get all users (without passwords)
function getAllUsers() {
    const users = JSON.parse(localStorage.getItem('grocery_users') || '[]');
    return users.map(u => ({
        name: u.name,
        email: u.email,
        role: u.role || 'customer',
        createdDate: u.createdDate || 'N/A'
    }));
}

// Get analytics data
function getAnalytics() {
    const orders = getOrders();
    const users = JSON.parse(localStorage.getItem('grocery_users') || '[]');
    
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const totalUsers = users.filter(u => u.role !== 'admin').length;
    
    // Most popular products
    const productSales = {};
    orders.forEach(order => {
        order.items?.forEach(item => {
            if (!productSales[item.id]) {
                productSales[item.id] = { name: item.name, quantity: 0 };
            }
            productSales[item.id].quantity += item.quantity;
        });
    });
    
    const topProducts = Object.values(productSales)
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);
    
    return {
        totalOrders,
        totalRevenue: totalRevenue.toFixed(2),
        totalUsers,
        topProducts
    };
}

// Check if user is admin
function isAdmin() {
    const current = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return current && current.role === 'admin';
}
