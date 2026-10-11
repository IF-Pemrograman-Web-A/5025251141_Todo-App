<?php
include 'config.php';

$kategori = isset($_GET['menu']) ? $_GET['menu'] : 'personal';

$edit_data = null;
if(isset($_GET['edit_id'])){
    $edit_id = intval($_GET['edit_id']);
    $edit_query = mysqli_query($conn, "SELECT * FROM todos WHERE id = $edit_id");
    $edit_data = mysqli_fetch_assoc($edit_query);
}

if($kategori === 'personal'){
    $query = "SELECT * FROM todos WHERE kategori = 'personal' AND user_id = $current_user_id";
} else {
    $query = "SELECT * FROM todos WHERE kategori = 'shared'";
}
$result = mysqli_query($conn, $query);

include 'header.php';
include 'menu-bar.php';
?>

    <div class="container">
        <main class="panel-kiri">
            <section class="list" aria-labelledby="heading-tugas">
                <h2 id="heading-tugas" tabindex="-1">Daftar Tugas</h2>
                <ul class="todo-list" aria-live="polite">
                    <?php if(mysqli_num_rows($result) === 0): ?>
                        <p id="placehold">Tidak Ada Tugas Horee</p>
                    <?php else: ?>
                        <?php while($row = mysqli_fetch_assoc($result)): ?>
                            <li class="todo-item">
                                <input type="checkbox" <?= $row['selesai'] ? 'checked' : ''; ?>
                                       onclick="window.location.href='update-status.php?id=<?= $row['id']; ?>&status=<?= $row['selesai'] ? 0:1; ?>&menu=<?= $kategori; ?>'">
                                <div class="todo-info">
                                    <h3 class="<?= $row['selesai'] ? 'done':''; ?>">
                                        <?= htmlspecialchars($row['judul']); ?>
                                    </h3>
                                    <span class="badge <?= $row['prioritas']; ?>">
                                        <?= $row['prioritas'] === 'high' ? 'Penting' : ($row['prioritas'] === 'medium' ? 'Sedang': 'Ringan'); ?>
                                    </span>
                                    <?php if(!empty($row['waktu_notif'])): ?>
                                        <p>Deadline: <?= str_replace('T', ' ', $row['waktu_notif']); ?></p>
                                    <?php endif; ?>
                                    <?php if(!empty($row['deskripsi'])): ?>
                                        <p class="desc"><?= htmlspecialchars($row['deskripsi']); ?></p>
                                    <?php endif; ?>

                                    <?php if(!empty($row['lampiran'])): ?>
                                        <details style="margin-top: 8px;">
                                            <summary style="cursor: pointer; font-size: 12px; font-weight: bold; color: #546cf3;">Lihat Lampiran</summary>
                                            <img src="<?= $row['lampiran']; ?>" alt="Lampiran Tugas" style="margin-top: 5px; width: 100%; max-width: 200px; border-radius: 8px; border: 1px solid #ccc;">
                                        </details>
                                    <?php endif; ?>
                                </div>

                                <div class="todo-actions">
                                    <a href="index.php?menu=<?= $kategori; ?>&edit_id=<?= $row['id']; ?>" class="btn-edit">Edit</a>
                                    <a href="hapus.php?id=<?= $row['id']; ?>&menu=<?= $kategori; ?>" onclick="return confirm('Yakin ingin hapus?')" class="btn-delete">Hapus</a>
                                </div>
                            </li>
                        <?php endwhile; ?>
                    <?php endif; ?>
                </ul>
            </section>
        </main>

        <aside class="panel-kanan" aria-label="add">
            <section class="form">
                <h2 id="add"><?= $edit_data ? "Edit Tugas" : "Tambah Tugas Baru"; ?></h2>
                <form class="todo-form" action="proses.php" method="POST">
                    <input type="hidden" name="id" value="<?= $edit_data['id'] ?? ''; ?>">
                    <input type="hidden" name="kategori" value="<?= $kategori; ?>">
                    <input type="hidden" name="lampiran" id="inputLampiran" value="<?= $edit_data['lampiran'] ?? ''; ?>">

                    <label for="judul">Judul Tugas</label><br>
                    <input type="text" id="judul" name="judul" placeholder="Masukkan Judul..." value="<?= htmlspecialchars($edit_data['judul'] ?? ''); ?>" required/>
                    <br>
                    <label for="desc">Deskripsi Tugas</label><br>
                    <textarea id="desc" name="desc" placeholder="Masukkan Deskripsi..." rows="3"><?= htmlspecialchars($edit_data['deskripsi'] ?? ''); ?></textarea>
                    <br>

                    <label for="waktuNotif">Deadline</label><br>
                    <input type="datetime-local" id="waktuNotif" name="waktuNotif" value="<?= $edit_data['waktu_notif'] ?? ''; ?>" required/><br>
                    
                    <label for="prioritas">Prioritas</label><br>
                    <select id="prioritas" name="prioritas" required>
                        <option value="high" <?= (isset($edit_data['prioritas']) && $edit_data['prioritas'] == 'high') ? 'selected' : ''; ?>>Penting</option>
                        <option value="medium" <?= (isset($edit_data['prioritas']) && $edit_data['prioritas'] == 'medium') ? 'selected' : ''; ?>>Sedang</option>
                        <option value="low" <?= (isset($edit_data['prioritas']) && $edit_data['prioritas'] == 'low') ? 'selected' : ''; ?>>Ringan</option>
                    </select>

                    <label for="addLampiran">Tambahkan Lampiran</label><br><br>

                    <video id="cameraVideo" autoplay playsinline style="width: 100%; max-width: 300px; display: none; border-radius: 10px; margin-bottom: 10px;"></video>
                    <canvas id="cameraCanvas" style="display: none; width: 100%; max-width: 200px; border-radius: 8px; margin-bottom: 10px;"></canvas>

                    <?php if(!empty($edit_data['lampiran'])): ?>
                        <div id="oldPreview" style="margin-bottom:10px;">
                            <img src="<?= $edit_data['lampiran']; ?>" style="width: 100%; max-width: 200px; border-radius: 8px;" alt="Preview">
                        </div>
                    <?php endif; ?>

                    <button id="addLampiran" type="button" title="Take Picture">Take Picture</button>
                    <hr>
                    <div class="submitContainer">
                        <button type="submit" title="Simpan" class="btn-edit"><?= $edit_data ? "Update Tugas" : "Tambah Tugas"; ?></button>
                        <?php if($edit_data): ?>
                            <a href="index.php?menu=<?= $kategori; ?>" id="batalBtn" title="Batal" class="btn-delete">Batal</a>
                        <?php endif; ?>
                    </div>
                </form>
            </section>
        </aside>
    </div>

<?php include 'footer.php'; ?>