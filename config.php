<?php
$host = "localhost:3307";
$user = "root";
$pass = "";
$db = "db_todo";

$conn = mysqli_connect($host, $user, $pass, $db);
if(!$conn){
    die("Koneksi gagal " . mysqli_connect_error());
}

if(!isset($_COOKIE['device_user_id'])){
    $unique_name = "User_" . substr(md5(mt_rand()), 0, 6);

    $insert_user = "INSERT INTO users(username, nama_lengkap) VALUES ('$unique_name', '$unique_name')";
    mysqli_query($conn, $insert_user);

    $new_user_id = mysqli_insert_id($conn);

    setcookie('device_user_id', $new_user_id, time() + (86400 * 30), "/");
    $current_user_id = $new_user_id;
} else {
    $current_user_id = intval($_COOKIE['device_user_id']);
}
?>