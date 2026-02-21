const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const filterBtn = document.getElementById("filterBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const todoBody = document.getElementById("todoBody");

let todos = [];
let filterCompleted = false;

function renderTodos() {
    todoBody.innerHTML = "";

    let filteredTodos;

    if (currentFilter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (currentFilter === "pending") {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else {
        filteredTodos = todos;
    }

    if (filteredTodos.length === 0) {
        todoBody.innerHTML = `
            <tr>
                <td colspan="4" class="empty">No task found</td>
            </tr>
        `;
        return;
    }

    filteredTodos.forEach((todo, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${todo.task}</td>
            <td>${todo.date}</td>
            <td class="${todo.completed ? "status-complete" : ""}">
                ${todo.completed ? "Completed" : "Pending"}
            </td>
            <td>
                <button class="action-btn complete-btn" onclick="toggleComplete(${index})">
                    ✓
                </button>
                <button class="action-btn delete-btn" onclick="deleteTodo(${index})">
                    ✕
                </button>
            </td>
        `;

        todoBody.appendChild(row);
    });
}

function addTodo() {
    const task = taskInput.value.trim();
    const date = dateInput.value;

    // Validation
    if (task === "" || date === "") {
        alert("Task dan Date tidak boleh kosong!");
        return;
    }

    todos.push({
        task,
        date,
        completed: false
    });

    taskInput.value = "";
    dateInput.value = "";
    renderTodos();
}

filterSelect.addEventListener("change", function () {
    currentFilter = this.value;
    renderTodos();
});

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

function deleteAll() {
    todos = [];
    renderTodos();
}

function filterTodos() {
    filterCompleted = !filterCompleted;
    renderTodos();
}

addBtn.addEventListener("click", addTodo);
deleteAllBtn.addEventListener("click", deleteAll);
filterBtn.addEventListener("click", filterTodos);

renderTodos();