class Task {
    id = (Date.now()+ '').slice(-10);

    constructor(title, description, date){
        this.title = title;
        this.description = description;
        this.date = date;
    }
}



class Inbox {
    _tasks = [];
    name;
    active = true;


    constructor(){
        this.name = "Inbox";
    }

    _newTask(element){
        const task = new Task(element.title, element.description, element.date);

        //add to our array
        this._tasks.push(task)
        console.log(task);
        console.log(this._tasks)
    }

    _removeTask (index){
        this._tasks.splice(index, 1)

    }

    getTasks(){
        return this._tasks;
    }
}


class Project extends Inbox {

    constructor(name){
        super()
        this.name = name;
    }
}



export class App {
    #projects = [new Inbox()];
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




    //home buttons
    all = document.getElementById('all')
    id = document.getElementById('today')
    thisWeek = document.getElementById('this-week')
    


    //konstruktor
    constructor() {
        //starting first project
        this._initialize();



        
    }

    _initialize(){
        this._renderProjectBtns();
        this.buttonAgree.addEventListener('click', this._addProject.bind(this))
        this.buttonDecline.addEventListener('click', this._closeProjectManager.bind(this))
        this.addProjectBtn.addEventListener('click', this._openProjectManager.bind(this));

        this.confirm.addEventListener('click', this._addTask.bind(this))

        this.addTask.addEventListener('click', this._openTaskManager.bind(this));

        this.closeTask.addEventListener('click', this._closeTaskManager.bind(this));
        this.all.addEventListener('click', this._getAllTasksArray.bind(this))
        this.id.addEventListener('click', this._getAllTodayTasksArray.bind(this))
        this.thisWeek.addEventListener('click', this._getAllWeekTasksArray.bind(this))



        this._attachProjectClickListeners();
    }


    _attachProjectClickListeners() {
        const projectButtons = document.querySelectorAll('.new-project');
        projectButtons.forEach((button, index) => {
          button.addEventListener('click', () => {
            this._chooseProject(index);
          });
        });
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

    //close projectManager
    _closeProjectManager(){
        this._restartProjectManager();
        this.projectManager.classList.remove('show')
    }


    //restart ProjectManager
    _restartProjectManager(){
        this.inputProject.value = "";
    }

    //add task to current project
    _addTask(){
        const filteredProject = this.#projects.find(x => x.active);
        console.log(filteredProject)

        if(this.title.value == '' || this.description.value == '' || this.date.value == '') {
            this._resetTaskManager()
            return this.taskManager.classList.remove('show')
        };
        const task = new Task(this.title.value, this.description.value, this.date.value)

        //add to our array
        filteredProject._newTask(task)
        console.log(task);
        console.log(filteredProject._tasks)

        //render workouts
        this._renderTasks(filteredProject);

        //close task manager
        this._closeTaskManager()
        

        
    }

    //render tasks
    _renderTasks(project){
        const container = document.getElementById('container')
        container.textContent = "";
        const header = document.createElement('h2')
        header.classList.add('heading-secondary');
        header.textContent = project.name;
        container.appendChild(header);

        if(project.length === 0) return;
        project._tasks.forEach((element, index) => {

            const createdEl = this._createETaskElement(element, index);
            container.appendChild(createdEl);
        });

    }

    //create html elements
    _createETaskElement(task, index) {
        const filteredProject = this.#projects.find(x => x.active);
        
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
            filteredProject._removeTask(index)
            this._renderTasks(filteredProject);
        })
        
        taskText.appendChild(taskTitle);
        taskText.appendChild(taskContent);
        taskEl.appendChild(taskText);
        taskEl.appendChild(taskDate);
        taskEl.appendChild(button)
        
        return taskEl;
    }

        //add project
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

        this._closeProjectManager();
    }
    //create button for project
    _createBtnProject(name, index){
        const li = document.createElement('li');
        li.setAttribute("id",name);
        li.classList.add('new-project');
        
        const a = document.createElement('a');
        a.href = "#"
        a.textContent = name;
        a.addEventListener('click',()=> {
            this._chooseProject(index)
        })

        const div = document.createElement('div')
        div.classList.add('project-cancel')
        div.addEventListener('click', ()=> {
            this._removeFromArray(index)
        })
        

        li.appendChild(a);
        li.appendChild(div)
        
        return li;

    }

    //render button project to the aside
    _renderProjectBtns () {
        const container = document.querySelector('.project-container');
        container.textContent = "";

        this.#projects.forEach((element, index) => {
            // if(index == 0){
            //     const container = document.getElementById('inbox');
            //     container.addEventListener('click', this._chooseProject(index))
            // }

            const createdEl = this._createBtnProject(element.name, index);
            container.appendChild(createdEl);


            this._attachProjectClickListeners();
    });
    }

    //choose project
    _chooseProject(index){
        const filtered = this.#projects.find(x => x.active === true);
        filtered.active = false;
        const choosenProject = this.#projects[index];
        choosenProject.active = true;
        console.log(choosenProject)
        this._renderTasks(choosenProject);
        console.log('co sie dzieje')

        const taskButton = document.querySelector('.btn-add-task')
        taskButton.classList.remove('hidden')
        const cancelBtns = document.querySelectorAll('.remove-btn')
        cancelBtns.forEach(x => x.classList.remove('hidden'))

        this._initialize();
    }

    //delete project

    _removeFromArray (index){
        if(this.#projects.length > 1){
        this.#projects.splice(index, 1)
        return this._renderProjectBtns();
        }
    }

    _getAllTasksArray(){
        const arr = this.#projects.flatMap(a => a._tasks);
        return this._renderAllTasks(arr, "All Tasks");
    }

    _getAllTodayTasksArray(){
        const arr = this.#projects.flatMap(a => a._tasks);

        //getting today date to the same format eg '2023-05-03'
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${year}-0${month}-${day}`
        const todayArr = arr.filter(x => x.date === currentDate)

        return this._renderAllTasks(todayArr, "Today");
    }

    _getAllWeekTasksArray() {
        const arr = this.#projects.flatMap(a => a._tasks);
      
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
      
        // Calculate the start date of the current week
        const startDate = new Date(currentYear, currentMonth, currentDay - currentDate.getDay());
      
        // Calculate the end date of the current week
        const endDate = new Date(currentYear, currentMonth, currentDay + (6 - currentDate.getDay()));
      
        const weekArr = arr.filter(x => {
          const taskDate = new Date(x.date);
          return taskDate >= startDate && taskDate <= endDate;
        });
      
        return this._renderAllTasks(weekArr, "This week");
      }


    _renderAllTasks(arr, name){
        const container = document.getElementById('container')
        container.textContent = "";
        const header = document.createElement('h2')
        header.classList.add('heading-secondary');
        header.textContent = name;
        container.appendChild(header);
        const taskButton = document.querySelector('.btn-add-task')
        taskButton.classList.add('hidden')



        if(arr.length === 0) return;
        arr.forEach((element, index) => {

            const createdEl = this._createETaskElement(element, index);
            container.appendChild(createdEl);
        });
        const cancelBtns = document.querySelectorAll('.remove-btn')
        cancelBtns.forEach(x => x.classList.add('hidden'))
        console.log(arr)
    }



}