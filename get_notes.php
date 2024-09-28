<?php

require 'config.php';

$stmt = $pdo->query("SELECT * FROM notes");
$notes = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($notes);
?>

