import './css/normalize.css';
import './css/general.css';
import './css/style.css';
import './icons/check.png'
import './icons/inbox.png'
import './icons/today.png'
import './icons/week.png'
// import {createTask} from './modules/task.js'
// import { openTaskManager } from './modules/task.js';
// import { closeTaskManager } from './modules/task.js';
// import { removeTask } from './modules/task.js';
import { task } from './modules/task.js';
import { today } from './modules/today';
import { project } from './modules/project';
import { listOfProjects } from './modules/project';
import { renderProjects } from './modules/project';

const confirm = document.getElementById('btn-confirm-task');
confirm.addEventListener('click', task.createTask)

const addTask = document.getElementById('btn-task');
addTask.addEventListener('click', task.openTaskManager);

const closeTask = document.getElementById('btn-cancel-task')
closeTask.addEventListener('click', task.closeTaskManager);

// const taskEl = document.getElementById('task');

// taskEl.addEventListener('click', (e)=> {
//     if(e.target.classList.contains('remove-btn')){
//         console.log("hej")
//     }
// })

const todayEl = document.getElementById('today');
todayEl.addEventListener('click', task.sortArray);

// const btnProject = document.getElementById('btn-project');
// btnProject.addEventListener('click', (e)=> {
//  e.defaultPrevented
//  const form = document.querySelector('.form-add-project');
//  form.classList.toggle('show')
// })

// const addProject = document.getElementById('btn-project-agree')
// const cancelProject = document.getElementById('btn-project-decline')
// const projectName = document.getElementById('new-project')

// addProject.addEventListener('click', (e)=> {
//     e.defaultPrevented
//     const newProject = project(projectName.value);
//     const form = document.querySelector('.form-add-project');
//     form.classList.remove('show')
//     listOfProjects.push(newProject)
//     renderProjects();
    

//     const confirm = document.getElementById('btn-confirm-task');
//     confirm.addEventListener('click', newProject.createTask)

//     const addTask = document.getElementById('btn-task');
//     addTask.addEventListener('click', newProject.openTaskManager);

//     const closeTask = document.getElementById('btn-cancel-task')
//     closeTask.addEventListener('click', newProject.closeTaskManager);
// })