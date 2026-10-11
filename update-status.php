<?php
include 'config.php';

if (isset($_GET['id']) && isset($_GET['status'])) {
    $id = intval($_GET['id']);
    $status = intval($_GET['status']);
    $menu = $_GET['menu'];
    mysqli_query($conn, "UPDATE todos SET selesai = $status WHERE id = $id");
    header("Location: index.php?menu=" . $menu);
    exit;
}
?>