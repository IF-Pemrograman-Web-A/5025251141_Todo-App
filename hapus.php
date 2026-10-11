<?php
include 'config.php';
$id = $_GET['id'];
$menu = $_GET['menu'];
mysqli_query($conn, "DELETE FROM todos WHERE id = $id");
header("Location: index.php?menu=" . $menu);
exit;
?>