document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".todo-form");
    const todoList = document.querySelector(".todo-list");
    const submitBtn = document.querySelector("button[type='submit']");
    const hero = document.getElementById("add");
    const btnTheme = document.getElementById("btn-theme");
    const placeHolder = document.getElementById("placehold");
    const addLampiranBtn = document.getElementById("addLampiran");
    const cameraCanvas = document.getElementById('cameraCanvas');
    const videoElement = document.getElementById('cameraVideo');

    let width = 300;
    let height = 240;
    let capturedImage = null;

    let db;
    let editingIndex = null;

    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service worker berhasil didaftarkan: ', reg.scope))
            .catch(err => console.error('Service Worker Gagal', err));
    }

    async function requestNotificationPermission(){
        const result = await Notification.requestPermission();

        if(result === 'denied'){
            console.log('Izin Notifikasi ditolak');
            return;
        }

        if(result === 'deafult'){
            console.log('izin notifikasi diabaikan');
        }

        console.log('notifikasi diizinkan');
    }

    if('Notification' in window){
        requestNotificationPermission();
    }

    const currentTheme = localStorage.getItem("theme");
    if(currentTheme === "dark"){
        document.body.classList.add("dark-mode");
        btnTheme.textContent = "☀️";
    } else {
        btnTheme.textContent = "🌙";
    }

    btnTheme.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            btnTheme.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            btnTheme.textContent = "🌙";
        }
    });

    const request = indexedDB.open("TodoDatabase", 1);

    request.onerror = function(event) {
        console.log("Error: Gagal Membuka index DB", event.target.error);
    };

    request.onupgradeneeded = function(event){
        db = event.target.result;
        if(!db.objectStoreNames.contains("todos")){
            db.createObjectStore("todos", {keyPath: "id", autoIncrement: true });
        }
    };

    request.onsuccess = function(event){
        db = event.target.result;
        tampilkanTodos();
    }

    function tampilkanTodos() {
        if(!db) return;

        let transaction = db.transaction("todos", "readonly");
        let store = transaction.objectStore("todos");
        let requestGetAll = store.getAll();

        requestGetAll.onsuccess = function(event){
            let todos = event.target.result;
            todoList.innerHTML = "";

            if (todos.length === 0) {
                todoList.appendChild(placeHolder);
                return;
            }

            todos.forEach((todo) => {
                const li = document.createElement("li");
                li.className = "todo-item";

                let namaPriority = "Penting";
                if (todo.prioritas === "medium") {
                    namaPriority = "Sedang";
                } else if (todo.prioritas === "low") {
                    namaPriority = "Rendah";
                }

                li.innerHTML = `
                    <input type="checkbox" ${todo.selesai ? "checked" : ""}>
                    <div class="todo-info">
                        <h3 class="${todo.selesai ? "done" : ""}">
                            ${todo.judul}
                        </h3>
                        <span class="badge ${todo.prioritas}">
                            ${namaPriority}
                        </span>
                        ${todo.waktuNotif ? `<p>Deadline: ${todo.waktuNotif.replace('T', ' ')}</p>` : ""}
                        ${todo.desc ? `<p class="desc">${todo.desc}</p>` : ""}

                        ${todo.lampiran ? `
                            <details style="margin-top: 8px;">
                                <summary style="cursor: pointer; font-size: 12px; font-weight: bold; color: #546cf3;">Lihat Lampiran</summary>
                                <img src="${todo.lampiran}" alt="Lampiran Tugas" style="margin-top: 5px; width: 100%; max-width: 200px; border-radius: 8px; border: 1px solid #ccc;">
                            </details>
                        ` : ""}
                    </div>

                    <div class="todo-actions">
                        <button type="button" class="btn-edit">Edit</button>
                        <button type="button" class="btn-delete">Hapus</button>
                    </div>
                `;

                li.querySelector(".btn-delete").addEventListener("click", function() {
                    let transaction = db.transaction("todos", "readwrite");
                    let store = transaction.objectStore("todos");
                    let deleteReq = store.delete(todo.id);

                    deleteReq.onsuccess = function () {
                        tampilkanTodos();
                    }
                });

                li.querySelector(".btn-edit").addEventListener("click", function() {
                    editingIndex = todo.id;
                    document.getElementById("judul").value = todo.judul;
                    document.getElementById("desc").value = todo.desc;
                    document.getElementById("priority").value = todo.prioritas;
                    document.getElementById("waktuNotif").value = todo.waktuNotif || "";

                    if(todo.lampiran){
                        const context = cameraCanvas.getContext('2d');
                        const img = new Image();
                        img.onload = function() {
                            cameraCanvas.width = width;
                            cameraCanvas.height = height;
                            context.drawImage(img, 0, 0, width, height);
                            cameraCanvas.style.display = 'block';
                        };
                        img.src = todo.lampiran;
                        capturedImage = todo.lampiran;
                    } else {
                        cameraCanvas.style.display = 'none';
                        capturedImage = null;
                    }

                    videoElement.style.display = 'none';
                    const stream = videoElement.srcObject;
                    if(stream){
                        stream.getTracks().forEach(track => track.stop());
                        videoElement.srcObject = null;
                    }

                    addLampiranBtn.disabled = false;
                    addLampiranBtn.style.opacity = "1";
                    addLampiranBtn.style.cursor = "pointer";

                    hero.textContent = "Edit Tugas";
                    submitBtn.textContent = "Update Tugas";
                });

                li.querySelector('input[type="checkbox"]').addEventListener("change", function() {
                    todo.selesai = this.checked;
                    let transaction = db.transaction("todos", "readwrite");
                    let store = transaction.objectStore("todos");
                    let putReq = store.put(todo);

                    putReq.onsuccess = function(){
                        tampilkanTodos();
                    }
                });

                todoList.appendChild(li);
            });
        }
    }

    function scheduleNotification(judul, desc, waktuNotif) {
        if (!waktuNotif) return;
        const targetTime = new Date(waktuNotif).getTime();
        const now = new Date().getTime();
        const tenMinutesBefore = targetTime - (10 * 60 * 1000);
        const delay = tenMinutesBefore - now;

        if (delay > 0) {
            setTimeout(() => {
                if (navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage({
                        type: 'REMINDER',
                        judul: judul,
                        desc: `Pengingat: 10 menit lagi menuju waktu ${waktuNotif.replace('T', ' ')}`
                    });
                }
            }, delay);
        }
    }

    function triggerNewTaskNotification(judul, desc) {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'NEW_TODO',
                judul: judul,
                desc: desc
            });
        }
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const judul = document.getElementById("judul").value;
        const desc = document.getElementById("desc").value;
        const prioritas = document.getElementById("priority").value;
        const waktuNotif = document.getElementById("waktuNotif").value;

        // const todo = {
        //     judul: judul,
        //     desc: desc,
        //     deadline: deadline,
        //     prioritas: prioritas,
        //     selesai: false
        // };

        let transaction = db.transaction("todos", "readwrite");
        let store = transaction.objectStore("todos");

        if (editingIndex !== null) {
            let getReq = store.get(editingIndex);
            getReq.onsuccess = function(event){
                let todoLama = event.target.result;
                let todoBaru = {
                    ...todoLama,
                    judul: judul,
                    desc: desc,
                    prioritas: prioritas,
                    waktuNotif: waktuNotif,
                    lampiran: capturedImage
                };
                store.put(todoBaru);
                triggerNewTaskNotification(judul, desc);
                scheduleNotification(judul, desc, waktuNotif);
            };

            editingIndex = null;
            submitBtn.textContent = "Tambah Tugas";
            hero.textContent = "Tambah Tugas Baru";
        } else {
            let todoBaru = {
                judul: judul, 
                desc: desc,
                prioritas: prioritas,
                waktuNotif: waktuNotif,
                selesai: false,
                lampiran: capturedImage
            };
            store.add(todoBaru);
            triggerNewTaskNotification(judul, desc);
            scheduleNotification(judul, desc, waktuNotif);
        }

        transaction.oncomplete = function(){
            form.reset();
            tampilkanTodos();
            capturedImage = null;
            cameraCanvas.style.display = 'none';
            startCamera();
        }
    });

    function startCamera (){
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
            videoElement.srcObject = stream;
            videoElement.style.display = 'block'; 
            videoElement.play();

            addLampiranBtn.disabled = false;
            cameraCanvas.style.display = 'none';
        })
        .catch(err => {
            console.error("Gagal mengakses kamera: ", err);
            alert("Tidak dapat mengakses kamera. Pastikan izin kamera diizinkan.");
        });
    }

    startCamera();

    function cameraTakePicture(){
        if (!videoElement.srcObject) {
            startCamera();
            addLampiranBtn.textContent = "Capture";
            return;
        }

        const context = cameraCanvas.getContext('2d');
        if(width && height){
            cameraCanvas.width = width;
            cameraCanvas.height = height;
            context.drawImage(videoElement, 0,0, width, height);
            const data = cameraCanvas.toDataURL('image/png');

            cameraCanvas.style.display = 'block';
            console.log(data);

            const stream = videoElement.srcObject;
            if(stream){
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                videoElement.srcObject = null;
            }
            videoElement.style.display = 'none';
            addLampiranBtn.disabled = true;
            capturedImage = data;
            return data;
        }
    }

    addLampiranBtn.addEventListener('click', () => {
        cameraTakePicture();
    })
});