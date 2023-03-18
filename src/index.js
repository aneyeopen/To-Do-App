import './style.css';
import { domManipulator, todoManager } from './to-do-functions';


// storage //

const todos = JSON.parse(localStorage.getItem('todos')) || {
    "home": [],
    "today": [],
    "week": []                                           
    };



// main events //

const display = document.querySelector('.main');


//Add a new item//
const openForm = document.getElementById('add-button');

const modal = document.querySelector(".modal");

const overlay = document.querySelector(".overlay");

openForm.addEventListener('click', e => domManipulator.openModal(modal, overlay));


// modal events //

const closeForm = document.querySelector(".modal-close");

closeForm.addEventListener('click', e => domManipulator.closeModal(modal, overlay));

submitForm.addEventListener('click', e => todoManager.newToDo())






