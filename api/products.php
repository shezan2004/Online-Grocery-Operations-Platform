<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/models/ProductModel.php';

header('Content-Type: application/json; charset=utf-8');

$model = new ProductModel($pdo);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        $res = $model->find((int)$_GET['id']);
        echo json_encode($res ?: []);
    } elseif (isset($_GET['q'])) {
        $res = $model->search($_GET['q']);
        echo json_encode($res);
    } else {
        echo json_encode($model->all());
    }
    exit;
}

// POST -> create product
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) { http_response_code(400); echo json_encode(['error'=>'Invalid JSON']); exit; }
    $ok = $model->create($input);
    echo json_encode(['success' => (bool)$ok]);
    exit;
}

// PUT -> update stock (expects JSON {id, stock})
if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['id']) || !isset($input['stock'])) { http_response_code(400); echo json_encode(['error'=>'Missing id or stock']); exit; }
    $ok = $model->updateStock((int)$input['id'], (int)$input['stock']);
    echo json_encode(['success' => (bool)$ok]);
    exit;
}

http_response_code(405);
echo json_encode(['error'=>'Method not allowed']);
