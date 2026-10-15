## Integrating MySQL + PHP API (MVC-style) with front-end AJAX

This document shows how to wire the included PHP API endpoints and the SQL schema into your existing static front-end.

1) Create the database

```sql
-- run in MySQL
SOURCE db/schema.sql;
```

2) Configure DB connection
- Edit `api/db.php` or set `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS` env variables.

3) Available API endpoints (JSON)
- `GET /api/products.php` — list all products
- `GET /api/products.php?id=12` — get product by id
- `GET /api/products.php?q=banana` — search
- `POST /api/products.php` — create product (JSON body)
- `PUT /api/products.php` — update product stock (JSON body `{id, stock}`)
- `POST /api/orders.php` — create order (JSON body)
- `GET /api/orders.php` — list orders

4) Example AJAX (vanilla fetch) — fetch products

```javascript
fetch('/api/products.php')
  .then(r => r.json())
  .then(products => {
    console.log(products);
    // Render to your grid instead of the hardcoded `products` array
  });
```

5) Example: create order (checkout) — send JSON

```javascript
const orderPayload = {
  customerName: 'Jane Doe',
  customerEmail: 'jane@example.com',
  address: '123 Main St',
  items: [ { id: 1, quantity: 2, price: 0.99 }, { id: 3, quantity: 1, price: 2.99 } ],
  pricing: { subtotal: 4.97, discount: 0, vat: 0.25, total: 5.22 }
};

fetch('/api/orders.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderPayload)
})
.then(r => r.json())
.then(res => console.log(res));
```

6) Front-end migration notes
- Replace the in-memory `products` array in `script.js` with the API fetch shown above.
- On login/signup, call an API (you can add `api/auth.php`) instead of storing plaintext in `localStorage`.
- Use `fetch` to POST orders to `/api/orders.php` instead of writing to `localStorage`.

7) Security & production notes
- Use HTTPS and protect DB credentials via env vars.
- Hash passwords using `password_hash()` in PHP (the `UserModel` uses it for `authenticate`).
- Validate and sanitize all inputs server-side.
- Add authentication (JWT or session-based) for protected admin endpoints.
