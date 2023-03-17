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