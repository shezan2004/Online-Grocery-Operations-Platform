// js/data.js — Product catalog (50+ products across 17 categories)

const PRODUCTS = [
  // ── Fruits ──────────────────────────────────────────────────────────────
  { id: 'p001', name: 'Organic Bananas', category: 'Fruits', price: 1.49, icon: '🍌', rating: 4.8, reviews: 312, stock: 80, description: 'Sweet, ripe organic bananas. Perfect for snacking or smoothies.' },
  { id: 'p002', name: 'Red Apples (1 lb)', category: 'Fruits', price: 2.99, icon: '🍎', rating: 4.7, reviews: 245, stock: 60, description: 'Crisp, juicy red apples freshly sourced from local orchards.' },
  { id: 'p003', name: 'Strawberries (16 oz)', category: 'Fruits', price: 3.99, icon: '🍓', rating: 4.9, reviews: 198, stock: 40, description: 'Fresh, hand-picked strawberries bursting with flavor.' },
  { id: 'p004', name: 'Watermelon (whole)', category: 'Fruits', price: 7.49, icon: '🍉', rating: 4.6, reviews: 154, stock: 20, description: 'Sweet seedless watermelon, perfect for summer gatherings.' },
  { id: 'p005', name: 'Mango (2-pack)', category: 'Fruits', price: 3.49, icon: '🥭', rating: 4.7, reviews: 176, stock: 50, description: 'Tropical Ataulfo mangoes — honey-sweet and buttery.' },

  // ── Vegetables ──────────────────────────────────────────────────────────
  { id: 'p006', name: 'Baby Spinach (5 oz)', category: 'Vegetables', price: 2.49, icon: '🥬', rating: 4.6, reviews: 203, stock: 55, description: 'Tender baby spinach, triple-washed and ready to eat.' },
  { id: 'p007', name: 'Broccoli Crown', category: 'Vegetables', price: 1.99, icon: '🥦', rating: 4.5, reviews: 187, stock: 65, description: 'Vibrant green broccoli crowns, packed with vitamins.' },
  { id: 'p008', name: 'Cherry Tomatoes (10 oz)', category: 'Vegetables', price: 2.79, icon: '🍅', rating: 4.8, reviews: 221, stock: 70, description: 'Sweet and tangy cherry tomatoes on-the-vine.' },
  { id: 'p009', name: 'Carrots (2 lb bag)', category: 'Vegetables', price: 1.79, icon: '🥕', rating: 4.4, reviews: 163, stock: 90, description: 'Crunchy, fresh carrots — great for snacking and cooking.' },
  { id: 'p010', name: 'Bell Pepper Mix (3-pack)', category: 'Vegetables', price: 3.29, icon: '🫑', rating: 4.7, reviews: 142, stock: 45, description: 'Red, yellow and orange bell peppers for colorful meals.' },

  // ── Dairy ────────────────────────────────────────────────────────────────
  { id: 'p011', name: 'Whole Milk (1 gallon)', category: 'Dairy', price: 4.29, icon: '🥛', rating: 4.8, reviews: 389, stock: 50, description: 'Farm-fresh whole milk, no added hormones.' },
  { id: 'p012', name: 'Greek Yogurt (32 oz)', category: 'Dairy', price: 5.49, icon: '🍶', rating: 4.9, reviews: 276, stock: 35, description: 'Thick, creamy plain Greek yogurt, high in protein.' },
  { id: 'p013', name: 'Cheddar Cheese (8 oz)', category: 'Dairy', price: 3.99, icon: '🧀', rating: 4.7, reviews: 231, stock: 40, description: 'Sharp aged cheddar, perfect for sandwiches and cooking.' },
  { id: 'p014', name: 'Salted Butter (1 lb)', category: 'Dairy', price: 4.99, icon: '🧈', rating: 4.6, reviews: 195, stock: 45, description: 'Creamy European-style salted butter, great for baking.' },
  { id: 'p015', name: 'Large Eggs (12-pack)', category: 'Dairy', price: 3.49, icon: '🥚', rating: 4.8, reviews: 412, stock: 60, description: 'Grade A large white eggs from cage-free hens.' },

  // ── Bakery ────────────────────────────────────────────────────────────────
  { id: 'p016', name: 'Sourdough Bread Loaf', category: 'Bakery', price: 4.49, icon: '🍞', rating: 4.9, reviews: 284, stock: 25, description: 'Artisan sourdough with crispy crust and chewy crumb.' },
  { id: 'p017', name: 'Blueberry Muffins (6-pack)', category: 'Bakery', price: 5.99, icon: '🧁', rating: 4.7, reviews: 167, stock: 20, description: 'Freshly baked muffins loaded with plump blueberries.' },
  { id: 'p018', name: 'Croissants (4-pack)', category: 'Bakery', price: 4.99, icon: '🥐', rating: 4.8, reviews: 203, stock: 15, description: 'Buttery, flaky French-style croissants, baked fresh daily.' },
  { id: 'p019', name: 'Whole Wheat Bagels (6-pack)', category: 'Bakery', price: 3.99, icon: '🥯', rating: 4.5, reviews: 148, stock: 30, description: 'Hearty whole wheat bagels, perfect for breakfast.' },

  // ── Beverages ─────────────────────────────────────────────────────────────
  { id: 'p020', name: 'Orange Juice (52 oz)', category: 'Beverages', price: 5.49, icon: '🍊', rating: 4.7, reviews: 321, stock: 55, description: '100% fresh-squeezed orange juice, no added sugar.' },
  { id: 'p021', name: 'Sparkling Water 12-Pack', category: 'Beverages', price: 6.99, icon: '💧', rating: 4.6, reviews: 254, stock: 40, description: 'Lemon-lime sparkling water, zero calories, zero sugar.' },
  { id: 'p022', name: 'Green Tea (20-bag box)', category: 'Beverages', price: 3.99, icon: '🍵', rating: 4.8, reviews: 189, stock: 75, description: 'Premium Japanese green tea bags, antioxidant-rich.' },
  { id: 'p023', name: 'Cold Brew Coffee (32 oz)', category: 'Beverages', price: 7.99, icon: '☕', rating: 4.9, reviews: 312, stock: 30, description: 'Smooth, bold cold brew concentrate, ready to drink.' },

  // ── Snacks ────────────────────────────────────────────────────────────────
  { id: 'p024', name: 'Trail Mix (16 oz)', category: 'Snacks', price: 5.99, icon: '🥜', rating: 4.6, reviews: 178, stock: 50, description: 'Mixed nuts, dried fruit and dark chocolate chips.' },
  { id: 'p025', name: 'Tortilla Chips (12 oz)', category: 'Snacks', price: 3.49, icon: '🌮', rating: 4.5, reviews: 231, stock: 70, description: 'Restaurant-style salted tortilla chips, thick-cut.' },
  { id: 'p026', name: 'Dark Chocolate Bar (3.5 oz)', category: 'Snacks', price: 3.99, icon: '🍫', rating: 4.8, reviews: 265, stock: 60, description: '72% cacao dark chocolate, single-origin Ecuador.' },
  { id: 'p027', name: 'Popcorn (Butter, 3-pack)', category: 'Snacks', price: 4.29, icon: '🍿', rating: 4.4, reviews: 142, stock: 80, description: 'Movie-theater-style butter microwave popcorn.' },

  // ── Meat & Seafood ────────────────────────────────────────────────────────
  { id: 'p028', name: 'Chicken Breast (2 lb)', category: 'Meat & Seafood', price: 8.99, icon: '🍗', rating: 4.7, reviews: 298, stock: 35, description: 'Boneless, skinless chicken breasts, antibiotic-free.' },
  { id: 'p029', name: 'Atlantic Salmon Fillet (1 lb)', category: 'Meat & Seafood', price: 12.99, icon: '🐟', rating: 4.9, reviews: 187, stock: 20, description: 'Fresh Atlantic salmon, rich in omega-3 fatty acids.' },
  { id: 'p030', name: 'Ground Beef 80/20 (1 lb)', category: 'Meat & Seafood', price: 6.49, icon: '🥩', rating: 4.6, reviews: 241, stock: 30, description: 'USDA choice ground beef, perfect for burgers and tacos.' },

  // ── Frozen Foods ──────────────────────────────────────────────────────────
  { id: 'p031', name: 'Frozen Mixed Vegetables (16 oz)', category: 'Frozen Foods', price: 2.49, icon: '🧊', rating: 4.5, reviews: 156, stock: 55, description: 'Quick-frozen peas, carrots, corn, and green beans.' },
  { id: 'p032', name: 'Cheese Pizza (12 inch)', category: 'Frozen Foods', price: 5.99, icon: '🍕', rating: 4.4, reviews: 203, stock: 25, description: 'Classic thin-crust cheese pizza, bake in 12 minutes.' },
  { id: 'p033', name: 'Ice Cream (Vanilla, 1.5 qt)', category: 'Frozen Foods', price: 5.49, icon: '🍦', rating: 4.8, reviews: 312, stock: 30, description: 'Rich, creamy vanilla bean ice cream with real vanilla.' },

  // ── Baby Products ──────────────────────────────────────────────────────────
  { id: 'p034', name: 'Baby Diapers Size 2 (84-ct)', category: 'Baby Products', price: 24.99, icon: '👶', rating: 4.8, reviews: 512, stock: 40, description: 'Ultra-soft diapers with up to 12-hour leak protection.' },
  { id: 'p035', name: 'Baby Wipes (256-ct)', category: 'Baby Products', price: 9.99, icon: '🧻', rating: 4.9, reviews: 423, stock: 60, description: 'Fragrance-free, hypoallergenic baby wipes, extra thick.' },
  { id: 'p036', name: 'Organic Baby Formula (12.4 oz)', category: 'Baby Products', price: 29.99, icon: '🍼', rating: 4.7, reviews: 234, stock: 20, description: 'USDA organic infant formula, DHA and iron fortified.' },

  // ── Cleaning Products ──────────────────────────────────────────────────────
  { id: 'p037', name: 'All-Purpose Cleaner (32 oz)', category: 'Cleaning Products', price: 4.49, icon: '🧹', rating: 4.6, reviews: 189, stock: 75, description: 'Lemon-scented all-purpose spray, kills 99.9% of germs.' },
  { id: 'p038', name: 'Dish Soap (24 oz)', category: 'Cleaning Products', price: 3.29, icon: '🫧', rating: 4.7, reviews: 276, stock: 80, description: 'Ultra-concentrated dish soap, cuts through grease fast.' },
  { id: 'p039', name: 'Laundry Pods (42-ct)', category: 'Cleaning Products', price: 14.99, icon: '🧺', rating: 4.8, reviews: 345, stock: 50, description: '3-in-1 laundry pods with stain remover and brightener.' },

  // ── Pet Care ──────────────────────────────────────────────────────────────
  { id: 'p040', name: 'Dog Food Dry (15 lb)', category: 'Pet Care', price: 22.99, icon: '🐕', rating: 4.7, reviews: 312, stock: 30, description: 'Chicken and rice dry dog food for adult dogs.' },
  { id: 'p041', name: 'Cat Litter Clumping (20 lb)', category: 'Pet Care', price: 15.99, icon: '🐈', rating: 4.6, reviews: 198, stock: 35, description: 'Clumping clay litter with odor neutralizer technology.' },

  // ── Beauty & Health ───────────────────────────────────────────────────────
  { id: 'p042', name: 'Vitamin C Supplements (60-ct)', category: 'Beauty & Health', price: 12.99, icon: '💊', rating: 4.8, reviews: 421, stock: 60, description: '1000mg Vitamin C tablets with rose hips, daily immune support.' },
  { id: 'p043', name: 'Sunscreen SPF 50 (3 oz)', category: 'Beauty & Health', price: 9.99, icon: '🧴', rating: 4.7, reviews: 256, stock: 45, description: 'Broad-spectrum SPF 50 mineral sunscreen, reef-safe.' },
  { id: 'p044', name: 'Lip Balm Set (4-pack)', category: 'Beauty & Health', price: 7.49, icon: '💄', rating: 4.5, reviews: 178, stock: 70, description: 'Moisturizing lip balms in 4 flavors — SPF 15 formula.' },

  // ── Fashion ───────────────────────────────────────────────────────────────
  { id: 'p045', name: 'Reusable Tote Bag (2-pack)', category: 'Fashion', price: 8.99, icon: '👜', rating: 4.8, reviews: 312, stock: 100, description: 'Large canvas tote bags, machine-washable, 50 lb capacity.' },
  { id: 'p046', name: 'Cotton Kitchen Apron', category: 'Fashion', price: 14.99, icon: '🎽', rating: 4.6, reviews: 145, stock: 40, description: 'Adjustable cotton apron with two deep front pockets.' },

  // ── Home & Kitchen ────────────────────────────────────────────────────────
  { id: 'p047', name: 'Bamboo Cutting Board', category: 'Home & Kitchen', price: 19.99, icon: '🔪', rating: 4.7, reviews: 267, stock: 35, description: 'Eco-friendly bamboo cutting board, 18×12 inch, antibacterial.' },
  { id: 'p048', name: 'Stainless Steel Water Bottle (24 oz)', category: 'Home & Kitchen', price: 22.99, icon: '🫙', rating: 4.9, reviews: 389, stock: 55, description: 'Vacuum-insulated bottle keeps drinks cold 24 hrs / hot 12 hrs.' },

  // ── Stationery ────────────────────────────────────────────────────────────
  { id: 'p049', name: 'Premium Notebook (200 pages)', category: 'Stationery', price: 11.99, icon: '📓', rating: 4.7, reviews: 198, stock: 65, description: 'Dot-grid hardcover notebook, fountain pen friendly paper.' },
  { id: 'p050', name: 'Ballpoint Pens (12-pack)', category: 'Stationery', price: 5.99, icon: '✒️', rating: 4.6, reviews: 234, stock: 90, description: 'Smooth-writing black ballpoint pens, medium 1.0mm tip.' },

  // ── Toys ─────────────────────────────────────────────────────────────────
  { id: 'p051', name: 'Building Blocks Set (100 pcs)', category: 'Toys', price: 18.99, icon: '🧱', rating: 4.8, reviews: 312, stock: 30, description: 'Classic colorful building blocks compatible with major brands.' },
  { id: 'p052', name: 'Wooden Puzzle (48-piece)', category: 'Toys', price: 12.99, icon: '🧩', rating: 4.7, reviews: 187, stock: 25, description: 'Educational jigsaw puzzle for ages 3+, safe non-toxic paint.' },

  // ── Gadgets ───────────────────────────────────────────────────────────────
  { id: 'p053', name: 'USB-C Charging Cable (6 ft)', category: 'Gadgets', price: 9.99, icon: '🔌', rating: 4.6, reviews: 412, stock: 80, description: 'Braided nylon USB-C to USB-C fast-charging cable, 60W.' },
  { id: 'p054', name: 'Wireless Earbuds', category: 'Gadgets', price: 34.99, icon: '🎧', rating: 4.5, reviews: 276, stock: 20, description: 'True wireless earbuds, 6hr battery + 18hr charging case.' },
  { id: 'p055', name: 'Portable Power Bank (10000 mAh)', category: 'Gadgets', price: 27.99, icon: '🔋', rating: 4.7, reviews: 345, stock: 25, description: 'Slim 10000 mAh power bank with dual USB-A and USB-C ports.' }
];

const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))];

const DEFAULT_COUPONS = [
  { code: 'SAVE10', type: 'percent', value: 10, minOrder: 20, description: '10% off orders $20+' },
  { code: 'FLAT5',  type: 'flat',    value: 5,  minOrder: 30, description: '$5 off orders $30+' },
  { code: 'WELCOME15', type: 'percent', value: 15, minOrder: 0, description: '15% off your order' }
];
