<?php
// $servername = "sql313.byethost3.com";
// $username = "b3_35427669";
// $password = "campusGuide_2324";
// $dbname = "b3_35427669_login";

$servername = "localhost";
$username = "root";
$password = "admin";
$dbname = "login";

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
   
?>
