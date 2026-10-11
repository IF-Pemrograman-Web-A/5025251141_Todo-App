<?php
$kategori = isset($_GET['menu']) ? $_GET['menu'] : 'personal';
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TO DO LIST - <?= ucfirst($kategori); ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav aria-label="Pintasan Navigasi" class="skip-links">
        <a href="#heading-tugas" class="skip-link">Lewati ke Daftar Tugas</a>
        <a href="#judul" class="skip-link">Lewati ke Form Tambah Tugas</a>
    </nav>

    <header>
        <h1>TO-DO LISTKU</h1>
        <button type="button" id="btn-theme" aria-label="Ubah Mode tampilan Gelap atau Terang">🌙</button>
    </header>