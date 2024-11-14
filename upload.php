<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES['file'])) {
    $uploaded_file = $_FILES['file']['tmp_name'];
    $destination_path = './users/' . $_FILES['file']['name'];
    if (move_uploaded_file($uploaded_file, $destination_path)) {
        echo $destination_path;
    } else {
        echo "Error uploading file.";
    }
}
?>