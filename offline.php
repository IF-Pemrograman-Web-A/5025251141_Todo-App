<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline Nih...</title>
    <style>
        body {
            font-family: sans-serif;
            text-align: center;
            padding: 50px;
            background: #f8fafc;
            color: #334155;
        }
        h1 {
            color: #1e293b;
        }

        .offline-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            background-color: #733280;
            color: #fff;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
        }
    </style>
</head>
<body>
    <h1>Kamu Sedang Offline</h1>
    <p>Koneksi Internetmu terputus nihh.. benerin dong..</p>
    <button class="offline-btn" onclick="window.location.reload()">Refresh</button>
</body>
</html>