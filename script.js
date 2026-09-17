document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.todo-form');
    const todoList = document.querySelector('.todo-list');
    const submitBtn = document.querySelector("button[type='submit']");
    const hero = document.getElementById('add');
    const btnTheme = document.getElementById('btn-theme');
    const placeHolder = document.getElementById('placehold');

    btnTheme.addEventListener('click', function(){
        document.body.classList.toggle('dark-mode');

        if(document.body.classList.contains('dark-mode')) btnTheme.textContent = "☀️";
        else btnTheme.textContent = "🌙";
    });

    let editingItem = null;

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const judul = document.getElementById('judul').value;
        const desc = document.getElementById('desc').value;
        const deadline = document.getElementById('deadline').value;
        const prioritas = document.getElementById('priority').value;

        const li = document.createElement('li');
        li.className = "todo-item";

        let namaPriority = "Penting";

        if(prioritas === "medium") namaPriority = "Sedang";
        else if(prioritas === "low") namaPriority = "Rendah";

        if (editingItem) {
            const h3 = editingItem.querySelector("h3");
            const badge = editingItem.querySelector(".badge");
            const pDeadline = editingItem.querySelector(".todo-info p");
            const pDesc = editingItem.querySelector(".desc");

            h3.textContent = judul;
            badge.className = `badge ${prioritas}`;
            badge.textContent = namaPriority;
            pDeadline.textContent = `Deadline: ${deadline}`;

            editingItem.setAttribute("data-deadline", deadline);
            editingItem.setAttribute("data-priority", prioritas);

            if (desc) {
                if (pDesc) {
                    pDesc.textContent = desc;
                } else {
                    const newDescP = document.createElement("p");
                    newDescP.className = "desc";
                    newDescP.textContent = desc;
                    editingItem.querySelector(".todo-info").appendChild(newDescP);
                }
            } else if (pDesc) {
                pDesc.remove();
            }

            editingItem = null;
            submitBtn.textContent = "Tambah Tugas";
            hero.textContent = "Tambah Tugas Baru";
        }
        else {
            li.setAttribute("data-deadline", deadline);
            li.setAttribute("data-priority", prioritas);

            li.innerHTML = `
                <input type="checkbox">
                <div class="todo-info">
                    <h3>${judul}</h3>
                    <span class="badge ${prioritas}">${namaPriority}</span>
                    <p>Deadline: ${deadline}</p>
                    <p class="desc">${desc}</p>
                </div>

                <div class="todo-actions">
                    <button type="button" class="btn-edit">Edit</button>
                    <button type="button" class="btn-delete">Hapus</button>
                </div>
            `
            placeHolder.remove();
            todoList.appendChild(li);

            const btnDelete = li.querySelector('.btn-delete');
            btnDelete.addEventListener('click', function(){
                if(editingItem === li){
                    editingItem = null;
                    submitBtn.textContent = "Tambah Tugas";
                    hero.textContent = "Tambah Tugas Baru";
                    form.reset();
                }
                li.remove();
            });

            const btnEdit = li.querySelector('.btn-edit');
            btnEdit.addEventListener('click', function(){
                hero.textContent = "Edit Tugas"
                editingItem = li;

                document.getElementById('judul').value = li.querySelector('h3').textContent;
                document.getElementById('deadline').value = li.getAttribute('data-deadline');
                document.getElementById('priority').value = li.getAttribute('data-priority');

                const descP = li.querySelector(".desc");
                document.getElementById('desc').value = descP ? descP.textContent : "";

                submitBtn.textContent = "Update Tugas";
            });

            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function(){
                const h3 = li.querySelector('h3');
                if(checkbox.checked) h3.classList.add('done');
                else h3.classList.remove('done');
            });
        }
        form.reset();
    });
});