document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".todo-form");
    const todoList = document.querySelector(".todo-list");
    const submitBtn = document.querySelector("button[type='submit']");
    const hero = document.getElementById("add");
    const btnTheme = document.getElementById("btn-theme");
    const placeHolder = document.getElementById("placehold");

    let todos = [];
    let editingIndex = null;

    btnTheme.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            btnTheme.textContent = "☀️";
        } else {
            btnTheme.textContent = "🌙";
        }
    });

    function tampilkanTodos() {
        todoList.innerHTML = "";

        if (todos.length === 0) {
            todoList.appendChild(placeHolder);
            return;
        }

        todos.forEach((todo, index) => {
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
                    <p>Deadline: ${todo.deadline}</p>
                    ${todo.desc ? `<p class="desc">${todo.desc}</p>` : ""}
                </div>

                <div class="todo-actions">
                    <button type="button" class="btn-edit">Edit</button>
                    <button type="button" class="btn-delete">Hapus</button>
                </div>
            `;

            li.querySelector(".btn-delete").addEventListener("click", function() {
                todos.splice(index, 1);
                tampilkanTodos();
            });

            li.querySelector(".btn-edit").addEventListener("click", function() {
                editingIndex = index;
                document.getElementById("judul").value = todo.judul;
                document.getElementById("desc").value = todo.desc;
                document.getElementById("deadline").value = todo.deadline;
                document.getElementById("priority").value = todo.prioritas;

                hero.textContent = "Edit Tugas";
                submitBtn.textContent = "Update Tugas";
            });

            li.querySelector('input[type="checkbox"]').addEventListener("change", function() {
                todo.selesai = this.checked;
                tampilkanTodos();
            });

            todoList.appendChild(li);
        });
    }

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

    tampilkanTodos();
});