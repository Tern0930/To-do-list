const inputTask = document.getElementById('input-task');
const taskList = document.getElementById('task-list');

let tasksList = JSON.parse(localStorage.getItem('tasks')) || [];
if (tasksList[0] === null)
    tasksList.splice(0, 1);
console.log(tasksList);
renderTasks();
// let tasksList = [];

function addTask() {
    const taskText = inputTask.value;
    if (taskText) {
        inputTask.value = '';
        taskList.innerHTML += `<li>
            <label class="custom-checkbox">
                <input type="checkbox" onchange="markTaskAsDone(this)">
                <span class="task">${taskText}</span>
            </label>
            <button class="delete-btn" onclick="deleteTask(this)">
                <i class="ri-close-circle-line"></i>
            </button>
        </li>`;

        const nodes = taskList.children;
        for (let i = 0; i < nodes.length-1; ++i) {
            const taskLabel = nodes[i].firstElementChild;
            if (taskLabel.lastElementChild.classList.contains('task-done')) {
                taskLabel.firstElementChild.checked = true;
            }
        }

        const newTask = {
            name: taskText.toString(),
            checked: false
        };
        tasksList.push(newTask);
        updateLocalStorage();
    }
}

function deleteTask(elem) {
    const taskElem = elem.parentElement;
    const taskText = taskElem.firstElementChild.lastElementChild.innerHTML;
    const taskId = findTaskId(taskText);
    tasksList.splice(taskId, 1);
    taskElem.parentElement.removeChild(taskElem);
    updateLocalStorage();
}

function  markTaskAsDone(elem) {
    const textElem = elem.nextElementSibling;
    textElem.classList.toggle('task-done');

    const taskId = findTaskId(textElem.innerHTML);
    tasksList[taskId].checked = !tasksList[taskId].checked;
    updateLocalStorage();
}

function findTaskId(taskText) {
    for (let i = 0; i < tasksList.length; ++i) {
        if (tasksList[i].name === taskText.toString()) {
            return i;
        }
    }
}

function renderTasks() {
    for (const task of tasksList) {
        inputTask.value = '';
        taskList.innerHTML += `<li>
            <label class="custom-checkbox">
                <input type="checkbox" onchange="markTaskAsDone(this)" ${task.checked ? 'checked' : ''}>
                <span class="task ${task.checked ? 'task-done' : ''}">${task.name}</span>
            </label>
            <button class="delete-btn" onclick="deleteTask(this)">
                <i class="ri-close-circle-line"></i>
            </button>
        </li>`;
    }
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasksList));
    console.log(tasksList);
}
