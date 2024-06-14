<?php
require_once 'config.php';

$name = trim($_POST['name']);
$pass = trim($_POST['pass']);
$email = trim($_POST['email']);
$surname = trim($_POST['surname']);


if ($name =='' OR $pass=='' OR $email==''  OR $surname==''){
    echo 2;
    die; 
}

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 



$sql = "INSERT INTO users (name, email, password, surname) VALUES ('".$name."', '".$email."', '".$pass."', '".$surname."')";

if ($conn->query($sql) === TRUE) {
    echo 1;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>