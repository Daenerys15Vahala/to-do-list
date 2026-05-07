const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

loadTasks();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  createTaskElement(taskText);

  saveTask(taskText);

  taskInput.value = "";
}

function createTaskElement(taskText) {
  const li = document.createElement("li");

  li.innerHTML = `
  <span>${taskText}</span>
  <div>
    <button class="completeBtn"></button>
    <button class="deleteBtn"></button>
  </div>
`;

  taskList.appendChild(li);

  const completeBtn = li.querySelector(".completeBtn");
  const deleteBtn = li.querySelector(".deleteBtn");
  const taskSpan = li.querySelector("span");

  completeBtn.addEventListener("click", function () {
    taskSpan.classList.toggle("completed");
  });

  deleteBtn.addEventListener("click", function () {
    li.remove();
    removeTask(taskText);
  });
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    createTaskElement(task);
  });
}

function removeTask(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.filter((task) => task !== taskToRemove);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
