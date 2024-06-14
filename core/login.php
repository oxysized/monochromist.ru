<?php
require_once 'config.php';

$email= trim($_POST['email']);
$pass = trim($_POST['pass']);

if ($email =='' OR $pass==''){
    echo 2;
    die;
}


$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT name, email FROM users WHERE email='".$email."' and password='".$pass."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    setcookie("username", $row['name'], time() + (3 * 24 * 60 * 60), "/");
    setcookie("email", $row['email'], time() + (3 * 24 * 60 * 60), "/");
    echo json_encode($row);
} else {
    echo "0";
}
$conn->close();
?>