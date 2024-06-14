<?php
require_once 'config.php';

$email = trim($_POST['email']);
$name = trim($_POST['name']);
$pass = trim($_POST['pass']);
$surname = trim($_POST['surname']);
$country = trim($_POST['country']);
$city = trim($_POST['city']);
$postcode = trim($_POST['postcode']);
$address = trim($_POST['address']);

if ($email == ''){
    echo 2;
    die;
}


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "UPDATE users SET name='$name', password='$pass', surname='$surname', country='$country', city='$city', postcode='$postcode', address='$address' WHERE email='$email'";

if ($conn->query($sql) === TRUE) {
    echo 1;
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
