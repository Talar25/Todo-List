

const createElement = function (task){

    const taskEl = document.createElement('div');
    taskEl.classList.add('task')

    const taskText = document.createElement('div');;
    taskText.classList.add('task-text');

    const taskTitle = document.createElement('span');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = task.title

    const taskContent = document.createElement('p');
    taskContent.classList.add('task-content');
    taskContent.textContent = task.content;

    const taskDate = document.createElement('p');
    taskDate.classList.add('task-date')
    taskDate.textContent = task.date;

    taskText.appendChild(taskTitle);
    taskText.appendChild(taskContent);
    taskEl.appendChild(taskText);
    taskEl.appendChild(taskDate);

    return taskEl;

}

const addToArray = function (obj) {
    const arr = [];
    arr.push(obj)

    return arr;
}

const renderTasks = function (tasks) {
    tasks.forEach(element => {
        const container = document.getElementById('container')
        const createdEl = createElement(element);
        container.appendChild(createdEl);
    });
}

const resetTaskManager = function () {
    const title = document.getElementById('add-task-title').value = "";
    const content = document.getElementById('add-task-content').value = "";
    const date = document.getElementById('add-date').value = "";
}


export const createTask = function () {
    //selecting DOM elements
    
    const title = document.getElementById('add-task-title').value;
    const content = document.getElementById('add-task-content').value;
    const date = document.getElementById('add-date').value;

    const arr = addToArray({title, content, date});
    console.log(arr)
    
//     <div id="task" class="task">
//     <div class="task-text">
//     <span id="task-title" class="task-title">Lorem</span>
//     <p id="task-content" class="task-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi praesentium ex tempora est exercitationem. </p>
// </div>
//     <p id="task-date" class="task-date">No date</p>
// </div>


    resetTaskManager()
    const taskManager = document.getElementById('add-task')
    taskManager.classList.remove('show')

    return renderTasks(arr)

}



export const openTaskManager = function () {
    resetTaskManager();
    const taskManager = document.getElementById('add-task')
    taskManager.classList.toggle('show')
}

export const closeTaskManager = function () {
    resetTaskManager();
    const taskManager = document.getElementById('add-task')
    taskManager.classList.remove('show')
}