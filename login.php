<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
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
                <a href="forgot.html" class="forgot">Forgot Password?</a>
				<a href="register.php" class="register2">REGISTER</a>
				<input type="submit" value="LOGIN" class="login" onclick="storeUsername();">
            </form>

        <script>
            function storeUsername() {
				let username = document.getElementById("username").value;
				localStorage.setItem("username", username);
			}
        </script>

		<?php
			session_start();
			include 'db_connection.php';

			if ($_SERVER["REQUEST_METHOD"] == "POST") {
				$username = $_POST['username'];
				$password = $_POST['password'];

				$stmt = $conn->prepare("SELECT * from `user info` where username = ?");
				$stmt->bind_param("s", $username);
				$stmt->execute();
				$stmt_result = $stmt->get_result();

				if ($stmt_result->num_rows > 0) {
					$data = $stmt_result->fetch_assoc();
					if ($data['password'] === $password) {
						echo "<h2>Login Successfully</h2>";
						header("Location: ./campusGuide.html"); //main
					} else {
						echo '<p class="error">Incorrect password!</p>';
					}
				} else {
					echo '<p class="error">Username not found!</p>';
				}
				$stmt->close();
				$conn->close();
			}
		?>
    </div>
</body>
</html>