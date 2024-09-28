<?php

require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;
$title = $data['title'];
$content = $data['content'];

if ($id) {
    // Update existing note
    $stmt = $pdo->prepare("UPDATE notes SET title = ?, content = ? WHERE id = ?");
    $stmt->execute([$title, $content, $id]);
} else {
    // Create new note
    $stmt = $pdo->prepare("INSERT INTO notes (title, content) VALUES (?, ?)");
    $stmt->execute([$title, $content]);
}

echo json_encode(['status' => 'success']);
?>

