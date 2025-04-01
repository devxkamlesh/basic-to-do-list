let userInput = document.getElementById("userinput");
let userList = document.querySelector(".user-list");

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task on Enter key press
userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && userInput.value.trim() !== "") {
    addTask(userInput.value.trim());
    saveTasks();
    userInput.value = ""; // Clear input field
  }
});

// Handle delete & complete actions
userList.addEventListener("click", function (event) {
  let taskElement = event.target.closest("li");

  if (event.target.classList.contains("fa-trash")) {
    taskElement.remove();
    saveTasks(); // Save after deletion
  }

  if (event.target.classList.contains("fa-check")) {
    taskElement.classList.toggle("completed");
    saveTasks(); // Save after toggling completion
  }
});

// Function to add task to UI
function addTask(taskText, completed = false) {
  let li = document.createElement("li");
  li.classList.add("task");
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    ${taskText}
    <span> 
      <i class="fa-solid fa-check"></i> 
      <i class="fa-solid fa-trash"></i> 
    </span>
  `;

  userList.appendChild(li);
}

// ------------------------ From Here :- This code is genrated By ChatGPT ------------------------//


// Save tasks to local storage
function saveTasks() {
  let tasks = [];
  document.querySelectorAll(".user-list li").forEach(task => {
    tasks.push({
      text: task.childNodes[0].textContent.trim(), // Get only text, ignoring icons
      completed: task.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
}
  