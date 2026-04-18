# SuperMart Admin Dashboard Guide

## 🔐 Admin Credentials

**Email:** `admin@supermart.com`  
**Password:** `admin123`

These credentials are automatically created when the application loads for the first time.

---

## 📊 Admin Dashboard Features

The admin dashboard provides comprehensive management tools for running the SuperMart e-commerce platform.

### 1. **Dashboard (Analytics Overview)**
- **Total Orders:** View total number of orders placed
- **Total Revenue:** See cumulative sales revenue
- **Total Users:** Count of registered customers
- **Top 5 Products:** View best-selling products with quantities

### 2. **Inventory Management**
- View all products with current stock levels
- **Edit Stock:** Update product quantities in real-time
- **Search Inventory:** Find specific products by name
- Monitor stock across all 86 products

### 3. **Orders Management**
- View all customer orders with details
- **Order Status Updates:** Change order status from:
  - Pending
  - Processing
  - Shipped
  - Delivered
  - Cancelled
- **Search Orders:** Look up orders by Order ID
- See order details including customer name, total amount, and date

### 4. **Users Management**
- View all registered users (both customers and admins)
- See user details (name, email, role, join date)
- **No access to passwords:** Passwords are never displayed for security
- **No access to personal profiles:** Customer personal data is protected
- Search users by email or name

---

## ⚙️ How to Use

### Login as Admin
1. Go to the main page and click "Sign In"
2. Enter admin credentials (see above)
3. You'll be automatically redirected to the Admin Dashboard

### Access Admin Panel from Customer Account
- If logged in as admin on the main store, an "Admin Panel" button appears in the navbar
- Click it to directly access the dashboard

### Managing Inventory
1. Go to **Inventory** section
2. Find product you want to update
3. Click **Edit Stock** button
4. Enter new stock quantity
5. Confirm to save

### Managing Orders
1. Go to **Orders** section
2. Find customer order
3. Click **Update Status** button
4. Select new status from dropdown
5. Save changes

### Viewing Analytics
1. Dashboard shows real-time analytics
2. Top products update based on actual sales
3. Revenue calculated from all completed orders

---

## 🔒 Security Features

✅ **Admin accounts cannot access:**
- Customer passwords
- Customer personal profile information
- Payment method details

✅ **Protected Data:**
- Only order details and addresses are visible
- User management limited to view-only (except admin can manage their own profile)
- Orders created after payment with customer information

✅ **Role-based Access:**
- Admin panel only accessible to admin accounts
- Customers cannot access admin features
- Automatic redirection for unauthorized access

---

## 📝 Typical Admin Workflows

### Processing New Orders
1. Go to **Orders**
2. Find new orders with "Pending" status
3. Click **Update Status** → Change to "Processing"
4. Prepare order for shipping
5. Update status to "Shipped" with tracking info
6. Once delivered, mark as "Delivered"

### Monitoring Inventory
1. Check **Dashboard** for top-selling products
2. Go to **Inventory**
3. Find running low items
4. Click **Edit Stock** to update quantities
5. Restock before items run out

### Analyzing Performance
1. **Dashboard** shows key metrics at a glance
2. Monitor revenue trends
3. Identify bestsellers
4. Track customer growth

---

## 💡 Tips

- Orders are saved automatically when customers complete payment
- Admin credentials can be changed by updating localStorage through browser console (advanced)
- All data is stored in browser localStorage (demo version)
- For production, integrate with a backend database

---

## 📧 Support

For issues or questions about the admin panel, please refer to the main application documentation.
