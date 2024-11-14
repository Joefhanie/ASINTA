<?php
session_start();
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "INSERT INTO `user info` (`username`, `password`) VALUES ('$username', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "Registration successful!";
        header("Location: ./index.php");
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    $conn->close();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Register</title>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="images\icon.ico">
    <link rel="stylesheet" href="formStyle.css">
</head>
<body>
<div class="left-half">
		<img src="./images/ASINTA.png" class="logo">
	</div>
	<div class="right-half">
		<div class="form">
			<h1>Student Interactive Navigation Tool App</h1>
			<form action="#" method="post">
				<label for="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" required>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
				<input type="submit" value="SIGN UP" class="register">
				<a href="login.php" class="login2">LOGIN</a>
			</form>
		</div>
	</div>
</body>
</html>