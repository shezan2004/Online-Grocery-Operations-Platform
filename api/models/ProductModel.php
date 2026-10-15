<?php
class ProductModel {
    private $pdo;
    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function all() {
        $stmt = $this->pdo->query('SELECT * FROM products ORDER BY id ASC');
        return $stmt->fetchAll();
    }

    public function find($id) {
        $stmt = $this->pdo->prepare('SELECT * FROM products WHERE id = ?');
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function search($q) {
        $stmt = $this->pdo->prepare('SELECT * FROM products WHERE name LIKE ? OR category LIKE ?');
        $like = "%" . $q . "%";
        $stmt->execute([$like, $like]);
        return $stmt->fetchAll();
    }

    public function updateStock($id, $stock) {
        $stmt = $this->pdo->prepare('UPDATE products SET stock = ? WHERE id = ?');
        return $stmt->execute([$stock, $id]);
    }

    public function create($data) {
        $stmt = $this->pdo->prepare('INSERT INTO products (name, price, category, img, rating, reviews, stock) VALUES (?, ?, ?, ?, ?, ?, ?)');
        return $stmt->execute([
            $data['name'] ?? '',
            $data['price'] ?? 0.00,
            $data['category'] ?? '',
            $data['img'] ?? '',
            $data['rating'] ?? 0,
            $data['reviews'] ?? 0,
            $data['stock'] ?? 0,
        ]);
    }
}
