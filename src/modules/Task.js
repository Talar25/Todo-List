class Task {
    id = (Date.now()+ '').slice(-10);

    constructor(title, description, date){
        this.title = title;
        this.description = description;
        this.date = date;
    }
}

export class Project {
    #tasks = [];
    title = document.getElementById('add-task-title');
    description = document.getElementById('add-task-content');
    date = document.getElementById('add-date');
    taskManager = document.getElementById('add-task'); 
    confirm = document.getElementById('btn-confirm-task');
    addTask = document.getElementById('btn-task');
    closeTask = document.getElementById('btn-cancel-task');
    


    constructor(name = 'inbox'){
        this.name = name.toLowerCase();
        console.log(name)


        this.confirm.addEventListener('click', this._newTask.bind(this))

        this.addTask.addEventListener('click', this._openTaskManager.bind(this));

        this.closeTask.addEventListener('click', this._closeTaskManager.bind(this));
    }

    

    


    _newTask(){
        let task;

        if(this.title.value == '' || this.description.value == '' || this.date.value == '') {
            this._resetTaskManager()
            return this.taskManager.classList.remove('show')
        };

        //create new task
        task = new Task(this.title.value, this.description.value, this.date.value)

        //add to our array
        this.#tasks.push(task)
        console.log(task);
        console.log(this.#tasks)

        //render workouts
        this._renderTasks(this.name);

        //close task manager
        this._closeTaskManager()

    }

    _renderTasks(name = 'Inbox'){
        const container = document.getElementById('container')
        container.textContent = "";
        const header = document.createElement('h2')
        header.classList.add('heading-secondary');
        header.textContent = name;
        container.appendChild(header);


        this.#tasks.forEach((element, index) => {

            const createdEl = this._createElement(element, index);
            container.appendChild(createdEl);
        });

    }

    _createElement(task, index) {
        
        const taskEl = document.createElement('div');
        taskEl.classList.add('task')
            
        
        const taskText = document.createElement('div');
        taskText.classList.add('task-text');
        
        const taskTitle = document.createElement('span');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = task.title
        
        const taskContent = document.createElement('p');
        taskContent.classList.add('task-content');
        taskContent.textContent = task.description;
        
        const taskDate = document.createElement('p');
        taskDate.classList.add('task-date')
        taskDate.textContent = task.date;

        const button = document.createElement('button');
        button.classList.add('remove-btn');
        button.setAttribute('remove-data', "");
        button.addEventListener('click', ()=> {
                this._removeFromArray(index)
        })
        
        taskText.appendChild(taskTitle);
        taskText.appendChild(taskContent);
        taskEl.appendChild(taskText);
        taskEl.appendChild(taskDate);
        taskEl.appendChild(button)
        
        return taskEl;
    }

    _removeFromArray (index){
        this.#tasks.splice(index, 1)
        return this._renderTasks();

    }


    _resetTaskManager(){
        this.title.value = "";
        this.description.value = "";
        this.date.value = "";
    }

    _openTaskManager(){
        this._resetTaskManager();
        this.taskManager.classList.toggle('show')
    }

    _closeTaskManager(){
        this._resetTaskManager();
        this.taskManager.classList.remove('show')
    }
}


export class App {
    #projects = [];
    projectManager = document.getElementById('form-add-project');
    inputProject = document.getElementById('new-project');
    addProjectBtn = document.getElementById('btn-project');
    buttonAgree = document.getElementById('btn-project-agree');
    buttonDecline = document.getElementById('btn-project-decline');
    confirm = document.getElementById('btn-confirm-task');
    taskManager = document.getElementById('add-task'); 
    addTask = document.getElementById('btn-task');
    closeTask = document.getElementById('btn-cancel-task');
    title = document.getElementById('add-task-title');
    description = document.getElementById('add-task-content');
    date = document.getElementById('add-date');

    title = document.getElementById('add-task-title');
    description = document.getElementById('add-task-content');
    date = document.getElementById('add-date');
    taskManager = document.getElementById('add-task'); 




    //konstruktor
    constructor() {
        //starting first project
        this._renderProject()

        this.buttonAgree.addEventListener('click', this._addProject.bind(this))
        this.buttonDecline.addEventListener('click', this._closeProjectManager.bind(this))
        this.addProjectBtn.addEventListener('click', this._openProjectManager.bind(this));
        
    }


    //reset task manager values
    _resetTaskManager(){
        this.title.value = "";
        this.description.value = "";
        this.date.value = "";
    }

    //show task manager
    _openTaskManager(){
        this._resetTaskManager();
        this.taskManager.classList.toggle('show')
    }

    //close task manager
    _closeTaskManager(){
        this._resetTaskManager();
        this.taskManager.classList.remove('show')
    }


    //open projectManager
    _openProjectManager(){
        this._restartProjectManager();
        this.projectManager.classList.add('show')
    }

    //start project
    _renderProject(index = 0){
        if(this.#projects.length === 0){
            const project = new Project();
            this.#projects.push(project)
        }else return this.#projects[index]._renderTasks()
    }

    //close projectManager
    _closeProjectManager(){
        this._restartProjectManager();
        this.projectManager.classList.remove('show')
    }


    //restart ProjectManager
    _restartProjectManager(){
        this.inputProject.value = "";
    }

    //add project  <li id="title" class="new-project"><a  href="#">title</a></li>
    _addProject(){
        if(this.inputProject.value === '') return this._closeProjectManager();
        const title = this.inputProject.value;
        console.log(title)

        //create new project
        const project = new Project(title)

        //add to our array
        this.#projects.push(project)
        console.log(project)
        console.log(this.#projects)

        //render projectBtns
        this._renderProjectBtns();

        project._newTask();

        this._closeProjectManager();
    }

    _createBtnProject(name, index){
        const li = document.createElement('li');
        li.id = name.title;
        li.classList.add('new-project');
        
        const a = document.createElement('a');
        a.href = "#"
        a.textContent = name;

        const div = document.createElement('div')
        div.classList.add('project-cancel')
        div.addEventListener('click', ()=> {
            this._removeFromArray(index)
        })
        

        li.appendChild(a);
        li.appendChild(div)
        
        return li;

    }

    _renderProjectBtns () {
        const container = document.querySelector('.project-container');
        container.textContent = "";

        this.#projects.forEach((element, index) => {

            const createdEl = this._createBtnProject(element.name, index);
            createdEl.addEventListener('click',()=> {
                this._chooseProject(index)
            })
            container.appendChild(createdEl);
        });
    }



    //choose project
    _chooseProject(index){
        const choosenProject = this.#projects[index];
        console.log(choosenProject)
        choosenProject._renderTasks(choosenProject.name);
        console.log('co sie dzieje')
    }

    //delete project

    _removeFromArray (index){
        this.#projects.splice(index, 1)
        return this._renderProjectBtns();

    }

    //show tasks for today

    //show tasks for this week (incoming 7 days)
}


const html = `
<div id="add-task" class="add-task">

<div class="form-add-project">

<input id="new-project" type="text" placeholder="Name">

<div class="form-buttons">
<button id="btn-project-agree" class="btn-project-agree">Add</button>
<button id="btn-project-decline" class="btn-project-decline">Cancel</button>
</div> 


//to juz mamy aktywne!!

</div>
<button id="btn-project" class="btn-add-project show">Add project</button>
</ul> 
`