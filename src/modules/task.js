export const task = (function () {
    let taskArr = [];
    let index = 0;

    const addToArray = (obj) => {
        taskArr.push(obj)
    }


    //need to improve that method
    const sortArray = () => {
        taskArr = taskArr.sort((a,b) => {a.date - b.date })
        return renderTasks();
    }

    const removeFromArray = (index) => {
        taskArr.splice(index, 1)
        return renderTasks();
    }

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

        const button = document.createElement('button');
        button.classList.add('remove-btn');
        button.setAttribute('remove-data', "");
        button.addEventListener('click', function (index) {
            setTimeout(()=>{removeFromArray(index)},1000)
        })
    
        taskText.appendChild(taskTitle);
        taskText.appendChild(taskContent);
        taskEl.appendChild(taskText);
        taskEl.appendChild(taskDate);
        taskEl.appendChild(button)
    
        return taskEl;
    
    }

    const renderTasks = () =>{
        const container = document.getElementById('container')
        container.textContent = "";
        const header = document.createElement('h2')
        header.classList.add('heading-secondary');
        header.textContent = 'Inbox'
        container.appendChild(header)

        taskArr.forEach((element, i) => {

            const createdEl = createEl(element, i);
            container.appendChild(createdEl);
        });
    }

    const resetTaskManager = () =>{
        const title = document.getElementById('add-task-title').value = "";
        const content = document.getElementById('add-task-content').value = "";
        const date = document.getElementById('add-date').value = "";
    }

    const createTask =  () =>{
        //selecting DOM elements
        
        const title = document.getElementById('add-task-title').value;
        const content = document.getElementById('add-task-content').value;
        const date = document.getElementById('add-date').value;
        if(title == '' || content == '' || date == '') {
            resetTaskManager()
            const taskManager = document.getElementById('add-task')
            return taskManager.classList.remove('show')
        };
        addToArray({ title, content, date});
        index++;
        console.log(taskArr)
    
        resetTaskManager()
        const taskManager = document.getElementById('add-task')
        taskManager.classList.remove('show')
    
        return renderTasks()
    
    }

    const openTaskManager = () => {
        resetTaskManager();
        const taskManager = document.getElementById('add-task')
        taskManager.classList.toggle('show')
    }

    const closeTaskManager = () =>{
        resetTaskManager();
        const taskManager = document.getElementById('add-task')
        taskManager.classList.remove('show')
    }

    return {
        taskArr,
        createTask,
        openTaskManager,
        closeTaskManager,
        removeFromArray,
        sortArray
    }


}())