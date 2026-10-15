<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || !isset($input['items']) || !is_array($input['items'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid order payload']);
        exit;
    }

    try {
        $pdo->beginTransaction();

        $orderRef = 'ORD' . time() . rand(100,999);
        $stmt = $pdo->prepare('INSERT INTO orders (order_ref, user_id, customer_name, customer_email, address, phone, payment_method, coupon_code, subtotal, discount, vat, total, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

        $subtotal = $input['pricing']['subtotal'] ?? 0;
        $discount = $input['pricing']['discount'] ?? 0;
        $vat = $input['pricing']['vat'] ?? 0;
        $total = $input['pricing']['total'] ?? 0;

        $stmt->execute([
            $orderRef,
            $input['user_id'] ?? null,
            $input['customerName'] ?? ($input['customer_name'] ?? 'Guest'),
            $input['customerEmail'] ?? ($input['customer_email'] ?? 'guest@local'),
            $input['address'] ?? '',
            $input['phone'] ?? '',
            $input['paymentMethod'] ?? '',
            $input['couponCode'] ?? null,
            $subtotal,
            $discount,
            $vat,
            $total,
            $input['status'] ?? 'Pending'
        ]);

        $orderId = $pdo->lastInsertId();

        $itemStmt = $pdo->prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
        foreach ($input['items'] as $it) {
            $itemStmt->execute([$orderId, $it['id'], $it['quantity'], $it['price']]);
            // reduce stock
            $pdo->prepare('UPDATE products SET stock = stock - ? WHERE id = ?')->execute([(int)$it['quantity'], (int)$it['id']]);
        }

        $pdo->commit();
        echo json_encode(['success' => true, 'order_ref' => $orderRef]);
        exit;
    } catch (Exception $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create order', 'message' => $e->getMessage()]);
        exit;
    }
}

// GET -> list orders (basic)
if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM orders ORDER BY created_at DESC');
    $orders = $stmt->fetchAll();
    echo json_encode($orders);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
