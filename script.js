let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
render();

function openTab(id) {
    document.querySelectorAll(".content").forEach(c => c.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    event.target.classList.add("active");
}

function addTask() {
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const task = document.getElementById("task").value;

    if (!date || !time || !task) {
        alert("Please select date, time and enter task");
        return;
    }

    tasks.push({
        date,
        time,
        task,
        done: false
    });

    save();

    document.getElementById("task").value = "";
}


function toggleTask(i) {
    tasks[i].done = !tasks[i].done;
    save();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    save();
}

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
}

function render() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    let completed = 0;

    tasks.forEach((t, i) => {
        if (t.done) completed++;
        list.innerHTML += `
  <div class="task ${t.done ? "done" : ""}">
    <span>📅 ${t.date} | ⏰ ${t.time}</span>
    <p>${t.task}</p>
    <div>
      <button onclick="toggleTask(${i})">Done</button>
      <button onclick="deleteTask(${i})">Delete</button>
    </div>
  </div>
`;

    });

    document.getElementById("progressText").innerText =
        `${completed} / ${tasks.length} tasks completed`;
}
