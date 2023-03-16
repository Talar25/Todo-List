import './css/normalize.css';
import './css/general.css';
import './css/style.css';
import './icons/check.png'
import './icons/inbox.png'
import './icons/today.png'
import './icons/week.png'
import {createTask} from './modules/task.js'
import { openTaskManager } from './modules/task.js';
import { closeTaskManager } from './modules/task.js';
import { removeTask } from './modules/task.js';

const confirm = document.getElementById('btn-confirm-task');
confirm.addEventListener('click', createTask)

const addTask = document.getElementById('btn-task');
addTask.addEventListener('click', openTaskManager);

const closeTask = document.getElementById('btn-cancel-task')
closeTask.addEventListener('click', closeTaskManager);

const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('click', (e)=> {
    if(checkbox.checked) removeTask()
    
})