document.addEventListener("DOMContentLoaded", () => {
    // Get existing tasks from local storage and display them on the page
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let container = document.querySelector(".container");
  
    tasks.forEach((task) => {
      container.innerHTML += `<div class="task" data-task-id="${task.id}">
                                  <li>
                                    <span>${task.task}</span>
                                    <span>Deadline : ${formatDate(task.date)} ${task.time}</span>
                                    <img src="remove.svg" alt="Remove" data-task-id="${task.id}" onclick="Remove(event)" />
                                  </li>
                                </div>`;
    });
  });
  
  const Add = () => {
    let task = document.getElementsByName("t")[0].value;
    let date = document.getElementsByName("d")[0].value;
    let time = document.getElementsByName("ti")[0].value;
  
    // Check if any of the fields is empty
    if (!task || !date || !time) {
      alert("Please fill in all the fields before adding the task.");
      return; // Stop execution if any field is empty
    }
  
    // Format the date in the "dd/mm/yy" format
    let formattedDate = formatDate(date);
  
    // Add the task to the container with the formatted date and time and remove icon
    let container = document.querySelector(".container");
    let taskId = container.querySelectorAll(".task").length; // Get the current number of tasks
    container.innerHTML += `<div class="task" data-task-id="${taskId}">
                                <li>
                                    <span>${task}</span>
                                    <span>Deadline : ${formattedDate} ${time}</span>
                                    <img src="remove.svg" alt="Remove" data-task-id="${taskId}" onclick="Remove(event)" />
                                </li>
                            </div>`;
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    // Create a new task object and add it to the tasks array
    let newTask = {
      task: task,
      date: date,
      time: time,
      id: tasks.length, // Assign a unique ID based on the length of the tasks array
    };
    tasks.push(newTask);
  
    // Save the updated tasks array to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  
    // ... existing code to display the new task ...
    Clear();
  };
  
  const Remove = (event) => {
    const taskId = event.target.getAttribute("data-task-id");
    let taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    taskElement.remove();
  
    // Remove the task from local storage and update the remaining tasks
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.id !== parseInt(taskId));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  
  const Clear = () => {
    document.getElementsByName("t")[0].value = "";
    document.getElementsByName("d")[0].value = "";
    document.getElementsByName("ti")[0].value = "";
  };
  
  // Helper function to format the date as "dd/mm/yy"
  const formatDate = (dateString) => {
    let date = new Date(dateString);
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear().toString().substr(-2);
    return `${day}/${month}/${year}`;
  };
  