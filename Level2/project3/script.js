// --- State Management: Array to hold all task objects ---
let tasks = [];

// --- DOM Element References ---
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const taskCountElement = document.getElementById('taskCount');

// --- Helper: Update the display count ---
const updateTaskCount = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    taskCountElement.textContent = `Total Tasks: ${total} | Completed: ${completed}`;
};

// --- CORE FUNCTION: RENDER TASKS (UPDATED) ---
const renderTasks = () => {
    taskList.innerHTML = ''; // Clear the current list

    tasks.forEach(task => {
        // 1. CREATE the list item (li)
        const li = document.createElement('li');
        li.dataset.id = task.id; // Store unique ID for state management
        
        // Add 'completed' class if the task is done
        if (task.completed) {
            li.classList.add('completed');
        }

        // 2. Add the task text content
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;
        li.appendChild(taskText);

        // 3. Create action buttons container
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        // NEW: Complete Button
        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Unmark' : 'Complete';
        completeButton.classList.add('complete');
        actionsDiv.appendChild(completeButton);
        
        // Edit Button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        actionsDiv.appendChild(editButton);

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        actionsDiv.appendChild(deleteButton);
        
        li.appendChild(actionsDiv);
        
        // Append the new list item to the UL
        taskList.appendChild(li);
    });

    updateTaskCount();
};

// --- EVENT HANDLERS ---

// 1. CREATE (Adding a New Task)
const addTask = () => {
    const text = taskInput.value.trim();
    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    const newTask = {
        id: Date.now(), // Simple unique ID
        text: text,
        completed: false
    };

    tasks.push(newTask); // Update state
    taskInput.value = ''; // Clear input field
    renderTasks();      // Re-render the UI
};

// 2. UPDATE, DELETE, and TOGGLE COMPLETE (UPDATED)
const handleTaskActions = (event) => {
    // Find the closest list item (<li>) which contains the task ID
    const listItem = event.target.closest('li');
    if (!listItem) return;

    const taskId = parseInt(listItem.dataset.id);
    let taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    if (event.target.classList.contains('delete')) {
        // DELETE
        tasks.splice(taskIndex, 1);
        renderTasks();

    } else if (event.target.classList.contains('edit')) {
        // EDIT
        const newText = prompt('Edit your task:', tasks[taskIndex].text);

        if (newText !== null && newText.trim() !== '') {
            tasks[taskIndex].text = newText.trim();
            renderTasks();
        }
        
    } else if (event.target.classList.contains('complete')) {
        // TOGGLE COMPLETE (New Logic: only triggers on the dedicated button)
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        renderTasks(); // Re-render to apply the visual changes and update button text
    }
    // Note: Clicking the task text/li no longer toggles completion, only the button does.
};


// --- Initialization ---
addTaskButton.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskActions);

// Allow adding task with Enter key
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial load with a few dummy tasks
tasks.push({ id: 101, text: 'Complete Coding Samurai Project 3', completed: false });
tasks.push({ id: 102, text: 'Review DOM Manipulation concepts', completed: true });
renderTasks();