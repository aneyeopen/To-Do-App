import './style.css';
import { domManipulator, todoManager } from './to-do-functions';


// storage //

const todos = JSON.parse(localStorage.getItem('todos')) || {
    "all time": [],
    "today": [],
    "week": [],
    "urgent": []                                           
    };



// main events //

const display = document.querySelector('.to-do-list');
const form = document.getElementById("create-new-form");

domManipulator.showToDos(todos, display);


//Add a new item//
const openForm = document.getElementById('add-button');

const modal = document.querySelector(".modal");

const overlay = document.querySelector(".overlay");

openForm.addEventListener('click', e => domManipulator.openModal(modal, overlay));


// modal events //

const closeForm = document.querySelector(".modal-close");

closeForm.addEventListener('click', e => domManipulator.closeModal(modal, overlay));



form.addEventListener('submit', e => {
    todoManager.newToDo(e, todos, form); 
    domManipulator.closeModal(modal, overlay),
    domManipulator.showToDos(todos, display);;
});






