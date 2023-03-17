export const tasksArray = (function () {
    const arr = [];
    const addToArray = (obj) =>{
        arr.push(obj)
        return arr;
    };

    const removeFromArray = (index) => {
        arr.splice(index, 1);
        return arr;
    };

    const renderTasks = function () {
        arr.forEach((element, i) => {
            const container = document.getElementById('container')
            const createdEl = createEl(element, i);
            container.appendChild(createdEl);
        });
    }

    return {
        arr,
        addToArray,
        removeFromArray,
        renderTasks
    }

}());

const createEl = function (task, index){

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

    const label = document.createElement('label');
    label.classList.add('check-container')

    const input = document.createElement('input')
    input.type = 'checkbox';
    input.id = 'checkbox';

    const span = document.createElement('span');
    span.classList.add('checkmark');
    span.id = index;
    // span.setAttribute("onclick", `tasksArray.removeFromArray(${index})`, false);   


//     <label class="check-container">
//     <input id="checkbox" type="checkbox">
//     <span class="checkmark"></span>
// </label>
    label.appendChild(input)
    label.appendChild(span)
    taskText.appendChild(taskTitle);
    taskText.appendChild(taskContent);
    taskEl.appendChild(label)
    taskEl.appendChild(taskText);
    taskEl.appendChild(taskDate);

    return taskEl;

}



// const addToArray = function (obj) {
//     const arr = [];
//     arr.push(obj)

//     return arr;
// }

// const renderTasks = function (tasks) {
//     tasks.forEach((element, i) => {
//         const container = document.getElementById('container')
//         const createdEl = createElement(element, i);
//         container.appendChild(createdEl);
//     });
// }

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

    tasksArray.addToArray({title, content, date});
    console.log(tasksArray.arr)
    
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

    return tasksArray.renderTasks()

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


export const removeTask = function () {
    console.log(index)
}