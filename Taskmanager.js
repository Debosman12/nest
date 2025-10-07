<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Manager</title>
  <style>
    body {
      font-family: "Segoe UI", sans-serif;
      background: #1f2937;
      color: #f9fafb;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      height: 100vh;
      padding-top: 60px;
    }
    .container {
      background: #374151;
      border-radius: 10px;
      padding: 20px;
      width: 340px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    }
    h2 {
      text-align: center;
      margin-bottom: 15px;
      color: #93c5fd;
    }
    input, button, select {
      width: 100%;
      padding: 8px;
      margin: 5px 0;
      border-radius: 6px;
      border: none;
      font-size: 14px;
    }
    input {
      background: #111827;
      color: #f9fafb;
    }
    button {
      background: #3b82f6;
      color: white;
      cursor: pointer;
      transition: 0.2s;
    }
    button:hover {
      background: #2563eb;
    }
    ul {
      list-style: none;
      padding: 0;
      margin-top: 10px;
    }
    li {
      background: #111827;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    li.completed {
      text-decoration: line-through;
      color: #9ca3af;
    }
    select {
      background: #111827;
      color: #f9fafb;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🗒️ Task Manager</h2>
    <input type="text" id="taskInput" placeholder="Enter a new task..." />
    <button id="addBtn">Add Task</button>
    <select id="filter">
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
    </select>
    <ul id="taskList"></ul>
  </div>

  <script>
    // Task list (array of objects)
    let tasks = [];

    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const addBtn = document.getElementById("addBtn");
    const filter = document.getElementById("filter");

    // Add a task
    addBtn.addEventListener("click", () => {
      const text = taskInput.value.trim();
      if (text === "") return alert("Please enter a task!");

      const newTask = {
        id: Date.now(),
        text,
        completed: false
      };
      tasks.push(newTask);
      taskInput.value = "";
      renderTasks();
    });

    // Toggle completion
    function toggleTask(id) {
      tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      renderTasks();
    }

    // Delete a task
    function deleteTask(id) {
      tasks = tasks.filter(task => task.id !== id);
      renderTasks();
    }

    // Filter tasks
    filter.addEventListener("change", renderTasks);

    // Display tasks
    function renderTasks() {
      taskList.innerHTML = "";
      let filteredTasks = tasks;

      if (filter.value === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
      } else if (filter.value === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
      }

      filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) li.classList.add("completed");

        // Add buttons
        const buttons = document.createElement("div");
        const doneBtn = document.createElement("button");
        doneBtn.textContent = "✔";
        doneBtn.style.background = "#10b981";
        doneBtn.onclick = () => toggleTask(task.id);

        const delBtn = document.createElement("button");
        delBtn.textContent = "✖";
        delBtn.style.background = "#ef4444";
        delBtn.onclick = () => deleteTask(task.id);

        buttons.append(doneBtn, delBtn);
        buttons.style.display = "flex";
        buttons.style.gap = "6px";

        li.appendChild(buttons);
        taskList.appendChild(li);
      });
    }
  </script>
</body>
</html>
