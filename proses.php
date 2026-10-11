<?php
include 'config.php';

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $id = $_POST['id'];
    $judul = mysqli_real_escape_string($conn, $_POST['judul']);
    $desc = mysqli_real_escape_string($conn, $_POST['desc']);
    $waktuNotif = mysqli_real_escape_string($conn, $_POST['waktuNotif']);
    $prioritas = mysqli_real_escape_string($conn, $_POST['prioritas']);
    $kategori = mysqli_real_escape_string($conn, $_POST['kategori']);
    $lampiran = $_POST['lampiran'];

    if (!empty($id)){
        $query = "UPDATE todos SET judul='$judul', deskripsi='$desc', waktu_notif='$waktuNotif', prioritas='$prioritas', lampiran='$lampiran' WHERE id=$id";
    } else {
        $uid = ($kategori === 'personal') ? $current_user_id : "NULL";
        $query = "INSERT INTO todos (user_id, judul, deskripsi, waktu_notif, prioritas, lampiran, kategori) VALUES ($uid, '$judul', '$desc', '$waktuNotif', '$prioritas', '$lampiran', '$kategori')";
    }

    if(mysqli_query($conn, $query)){
        header("Location: index.php?menu=" . $kategori);
        exit;
    } else {
        echo "Gagal: " . mysqli_error($conn);
    }
}
?>