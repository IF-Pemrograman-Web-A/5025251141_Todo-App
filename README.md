# [E01a] The Style Warrior - Todo List App

Tugas membuat tampilan **Todo List** menggunakan HTML dan CSS sesuai dengan kriteria.

| Nama                | NRP        |  Kelas     |
| ------------------- | ---------- | ---------- |
| Muhammad Fahmi Ilmi | 5025251141 | PWEB A     |

## Deskripsi

### 1. Semantic HTML Elements

Menggunakan beberapa elemen semantic HTML5 seperti `<header>`, `<main>`, `<aside>`, dan `<footer>` untuk membagi struktur halaman.

1. `<header>` saya gunakan sebagai tempat judul utama `<h1>`  
    kutipan kode:

   ```html
   <header>
     <h1>TO-DO LISTKU</h1>
   </header>
   ```

2. `<main>` saya gunakan sebagai tempat untuk panel kiri  
    kutipan kode:
   ```html
   <main class="panel-kiri">
     <section class="list">
       <h2>Daftar Tugas</h2>
       <ul class="todo-list">
         <li class="todo-item">
           <input type="checkbox" checked />
           <div class="todo-info">
             <h3 class="done">Tugas E01A PWEB</h3>
             <span class="badge high">Penting</span>
             <p>Deadline: 14 September 2026</p>
           </div>
         </li>
         <li class="todo-item">
           <input type="checkbox" />
           <div class="todo-info">
             <h3>Tugas KKA BFS, DFS, UCS</h3>
             <span class="badge medium">Sedang</span>
             <p>Deadline: 12 September 2026</p>
           </div>
         </li>
         <li class="todo-item">
           <input type="checkbox" />
           <div class="todo-info">
             <h3>Tugas KPPL Resume</h3>
             <span class="badge low">Ringan</span>
             <p>Deadline: 15 September 2026</p>
           </div>
         </li>
       </ul>
     </section>
   </main>
   ```
3. `<aside>` saya gunakan sebagai tempat untuk panel kanan  
    kutipan kode:
   ```html
   <aside class="panel-kanan">
     <section class="form">
       <h2>Tambah Tugas Baru</h2>
       <form class="todo-form">
         <label for="judul">Judul Tugas</label><br />
         <input
           type="text"
           id="judul"
           placeholder="Masukkan Judul..."
           required
         />
         <br />
         <label for="desc">Deskripsi Tugas</label><br />
         <textarea
           id="desc"
           placeholder="Masukkan Deskripsi..."
           rows="3"
         ></textarea>
         <br />
         <label for="deadline">Deadline</label><br />
         <input type="date" id="deadline" required />
         <br />
         <label>Prioritas</label><br />
         <select required>
           <option selected value="high">Penting</option>
           <option value="medium">Sedang</option>
           <option value="low">Ringan</option>
         </select>
         <button type="submit" title="Tambah Tugas">Tambah Tugas</button>
       </form>
     </section>
   </aside>
   ```
4. `<footer>` saya gunakan sebagai tempat identitas, seperti nama nrp
   kutipan kode:
   ```html
   <footer>
     <p>2026 | MUHAMMAD FAHMI ILMI | 5025251141</p>
   </footer>
   ```

### 2. Layout 2 Panel

Layout utama menggunakan **Flexbox** dan dibagi menjadi dua panel:

- **Panel kiri** untuk menampilkan daftar tugas.  
   kutipan kode:
  ```html
  <main class="panel-kiri">
    <section class="list">
      <h2>Daftar Tugas</h2>
      <ul class="todo-list">
        <li class="todo-item">
          <input type="checkbox" checked />
          <div class="todo-info">
            <h3 class="done">Tugas E01A PWEB</h3>
            <span class="badge high">Penting</span>
            <p>Deadline: 14 September 2026</p>
          </div>
        </li>
        <li class="todo-item">
          <input type="checkbox" />
          <div class="todo-info">
            <h3>Tugas KKA BFS, DFS, UCS</h3>
            <span class="badge medium">Sedang</span>
            <p>Deadline: 12 September 2026</p>
          </div>
        </li>
        <li class="todo-item">
          <input type="checkbox" />
          <div class="todo-info">
            <h3>Tugas KPPL Resume</h3>
            <span class="badge low">Ringan</span>
            <p>Deadline: 15 September 2026</p>
          </div>
        </li>
      </ul>
    </section>
  </main>
  ```
- **Panel kanan** untuk form tambah atau edit tugas.  
   kutipan kode:

  ```html
  <aside class="panel-kanan">
    <section class="form">
      <h2>Tambah Tugas Baru</h2>
      <form class="todo-form">
        <label for="judul">Judul Tugas</label><br />
        <input
          type="text"
          id="judul"
          placeholder="Masukkan Judul..."
          required
        />
        <br />
        <label for="desc">Deskripsi Tugas</label><br />
        <textarea
          id="desc"
          placeholder="Masukkan Deskripsi..."
          rows="3"
        ></textarea>
        <br />
        <label for="deadline">Deadline</label><br />
        <input type="date" id="deadline" required />
        <br />
        <label>Prioritas</label><br />
        <select required>
          <option selected value="high">Penting</option>
          <option value="medium">Sedang</option>
          <option value="low">Ringan</option>
        </select>
        <button type="submit" title="Tambah Tugas">Tambah Tugas</button>
      </form>
    </section>
  </aside>
  ```

  Menggunakan Flexbox supaya tampilan panel bisa kanan kiri.  
   kutipan kode:

  ```css
  .container {
    display: flex;
    gap: 20px;
    max-width: 90%;
    margin: 0 auto;
    padding: 15px;
  }

  .panel-kiri {
    flex: 2;
  }

  .panel-kanan {
    flex: 1;
  }
  ```

  - Panel kiri mengambil ukuran 2 kali ukuran panel kanan. Sehingga panel kiri yang berisi list tugas terlihat lebih lebar.

### 3. Form Input

Panel kanan berisi form untuk memasukkan data tugas, seperti:

- Judul tugas
  ```html
  <label for="judul">Judul Tugas</label><br />
  <input type="text" id="judul" placeholder="Masukkan Judul..." required />
  ```
- Deskripsi
  ```html
  <label for="desc">Deskripsi Tugas</label><br />
  <textarea id="desc" placeholder="Masukkan Deskripsi..." rows="3"></textarea>
  ```
- Deadline
  ```html
  <label for="deadline">Deadline</label><br />
  <input type="date" id="deadline" required />
  ```
- Prioritas tugas
  ```html
  <label>Prioritas</label><br />
  <select required>
    <option selected value="high">Penting</option>
    <option value="medium">Sedang</option>
    <option value="low">Ringan</option>
  </select>
  ```

### 4. Data Statis

Daftar tugas menggunakan data dummy/statis. Setiap tugas memiliki checkbox, judul, deadline, dan tingkat prioritas.

```html
<li class="todo-item">
  <input type="checkbox" checked />
  <div class="todo-info">
    <h3 class="done">Tugas E01A PWEB</h3>
    <span class="badge high">Penting</span>
    <p>Deadline: 14 September 2026</p>
  </div>
</li>
```

### 5. Responsive Design Tampilan dibuat responsive menggunakan `@media
(max-width: 768px)`. Pada layar yang lebih kecil, kedua panel akan berubah
menjadi satu kolom dan form akan berada di bagian atas. 
```css
@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }

    .panel-kanan{
        order: -1;
    }

    .panel-kiri {
        order: 1;
    }
}
```
- Saat di buka di mobile tampilan panel akan menjadi atas bawah. kemudian panel kanan di tampilkan di atas panel kiri dengan mengubah urutannya menggunakan properti `order`.

### 6. External CSS
Style halaman dipisahkan ke dalam file `style.css`, sehingga file HTML hanya
berisi struktur halaman dan file CSS digunakan untuk mengatur tampilan. 
```html
<link rel="stylesheet" href="style.css">
```

## Preview 
- Tampilan Desktop  
![Desktop](assets/desktop.png)

- Tapilan Mobile  
![Mobile](assets/mobile2.png)  
![Mobile](assets/mobile1.png)


## PENJELASAN KODE JAVASCRIPT  
Kode JavaScript dijalankan setelah seluruh elemen halaman termuat sempurna menggunakan event `DOMContentLoaded`. Berikut adalah rincian bagian kodenya:  

### 1. Inisialisasi & Toggle Dark/Light Mode  
```javascript
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.todo-form');
    const todoList = document.querySelector('.todo-list');
    const submitBtn = document.querySelector("button[type='submit']");
    const hero = document.getElementById('add');
    const btnTheme = document.getElementById('btn-theme');

    let todos = [];
    let editingIndex = null;

    btnTheme.addEventListener('click', function(){
        document.body.classList.toggle('dark-mode');

        if(document.body.classList.contains('dark-mode')) btnTheme.textContent = "☀️";
        else btnTheme.textContent = "🌙";
    });
...
```  

Proses inisialisasi (deklarasi variabel) untuk mengambil elemen-elemen HTML ke dalam JavaScript menggunakan metode DOM (Document Object Model) agar bisa dimanipulasi nantinya. kemudian membuat togle darkmode dengan menambah event listener pada elemen ber id `btn-theme` sehingga saat di click akan mengubah tema tampilan web antara mode terang dan gelap (dark mode) dengan memanipulasi kelas CSS `dark-mode` pada elemen <body> serta mengubah ikon tombol.  

### 2. Penanganan Event Form Submit (Tambah & Update Tugas)  
```javascript
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const judul = document.getElementById("judul").value;
    const desc = document.getElementById("desc").value;
    const deadline = document.getElementById("deadline").value;
    const prioritas = document.getElementById("priority").value;

    const todo = {
        judul: judul,
        desc: desc,
        deadline: deadline,
        prioritas: prioritas,
        selesai: false
    };

    if (editingIndex !== null) {
        todos[editingIndex] = todo;
        editingIndex = null;
        submitBtn.textContent = "Tambah Tugas";
        hero.textContent = "Tambah Tugas Baru";
    } else {
        todos.push(todo);
    }

    tampilkanTodos();
    form.reset();
});
```
Penjelasan:  
- `e.preventDefault();` : Perintah wajib untuk mencegah default behavior dari form HTML (yaitu melakukan reload atau refresh halaman secara otomatis saat tombol submit ditekan).   
- Penyimpanan Objek (todo): Nilai input dari form dibungkus terlebih dahulu ke dalam struktur objek JavaScript agar data terorganisir dengan rapi.  
- Jika `editingIndex` tidak bernilai null, artinya aplikasi sedang dalam mode edit, sehingga data pada indeks array tersebut ditimpa (todos[editingIndex] = todo).
- Jika `editingIndex` bernilai null, data objek baru ditambahkan ke dalam array menggunakan metode `.push(todo)`.
- `tampilkanTodos();`: Memanggil fungsi render ulang agar daftar tugas di layar langsung diperbarui secara dinamis tanpa refresh.  
- `form.reset();` : Mengosongkan kembali kolom-kolom input pada form setelah data berhasil diproses.  

### 3. FITUR EDIT DAN HAPUS TUGAS  
#### 3.1. Tombol Hapus  
```javascript 
li.querySelector(".btn-delete").addEventListener("click", function() {
    todos.splice(index, 1);
    tampilkanTodos();
});
```  
Berfungsi untuk menghapus data tugas dari dalam array todos berdasarkan indeksnya menggunakan metode . `splice(index, 1)`. Setelah itu, daftar tugas langsung dirender ulang.  

#### 3.2. Tombol Edit  
```javascript 
li.querySelector(".btn-edit").addEventListener("click", function() {
    editingIndex = index;
    document.getElementById("judul").value = todo.judul;
    document.getElementById("desc").value = todo.desc;
    document.getElementById("deadline").value = todo.deadline;
    document.getElementById("priority").value = todo.prioritas;

    hero.textContent = "Edit Tugas";
    submitBtn.textContent = "Update Tugas";
});
```  
Mengubah judul panel form menjadi "Edit Tugas", merekam elemen `li` tersebut ke dalam variabel `editingItem`, lalu menarik kembali data tugas dari elemen HTML ke dalam kolom-kolom input form di sebelah kanan agar siap diubah oleh pengguna. Tombol submit juga diubah teksnya menjadi "Update Tugas".  

#### 3.3. Checkbox Selesai  
```javascript 
li.querySelector('input[type="checkbox"]').addEventListener("change", function() {
    todo.selesai = this.checked;
    tampilkanTodos();
});
```
Mendeteksi perubahan pada status checkbox (this.checked) dan memperbarui properti selesai pada objek terkait, kemudian memicu render ulang agar kelas CSS .done (efek coret pada teks) diterapkan dengan benar.  

## Tampilan Setelah Ketambah Javascript  
### 1. Tampilan Awal (Light Mode)  
![Desktop](assets/lightmode.png)  
### 2. Tampilan Awal (Dark Mode)  
![Desktop](assets/darkmode.png)  
### 3. Tambah Tugas  
![Desktop](assets/addtask.png)  
### 4. Edit Tugas
![Desktop](assets/edittask.png)

## VERSI 2 - JIKA ADA DETAIL/EDITOR  GAK JADI
- Tampilan Desktop  
![Desktop](assets/desktop1.png)
![Desktop](assets/desktop2.png)

- Tapilan Mobile  
![Mobile](assets/mobile3.png)  
![Mobile](assets/mobile4.png)
![Mobile](assets/mobile5.png)

TERIMA KASIH 
