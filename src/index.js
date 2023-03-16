import './css/normalize.css';
import './css/general.css';
import './css/style.css';
import {createTask} from './modules/task.js'
import { openTaskManager } from './modules/task.js';
import { closeTaskManager } from './modules/task.js';

const confirm = document.getElementById('btn-confirm-task');
confirm.addEventListener('click', createTask)

const addTask = document.getElementById('btn-task');
addTask.addEventListener('click', openTaskManager);

const closeTask = document.getElementById('btn-cancel-task')
closeTask.addEventListener('click', closeTaskManager);