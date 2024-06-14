<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "monochromist";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";

$product_name = $_POST['product_name'];
$quantity = $_POST['quantity'];
$size = $_POST['size'];
$total_price = $_POST['total_price'];
$user_email = $_POST['user_email'];

$sql = "INSERT INTO orders (product_name, quantity, size, total_price, user_email) VALUES (?, ?, ?, ?, ?)";


$stmt = $conn->prepare($sql);
$stmt->bind_param("sissd", $product_name, $quantity, $size, $total_price, $user_email);

if ($stmt->execute()) {
    echo "Order saved successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$stmt->close();
$conn->close();
?>
