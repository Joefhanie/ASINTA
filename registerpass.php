<?php
session_start();
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $new_password = $_POST['new_password'];

    $sql = "SELECT * FROM `user info` WHERE username = '$username'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
		echo "Username found.";
       
        $sql_update = "UPDATE `user info` SET password = '$new_password' WHERE username = '$username'";
        $result_update = mysqli_query($conn, $sql_update);

        if ($result_update) {
            echo "Password updated successfully.";
            header("Location: ./login.php");
            exit();
        } else {
            echo "Password update failed. Please try again.";
            header("Location: ./forgot.html");
            exit();
        }
    } else {
        echo "Username not found. Password reset failed.";
        header("Location: ./forgot.html");
        exit();
    }
}
?>
