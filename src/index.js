import './style.css';
import { domManipulator, todoManager } from './to-do-functions';


// storage //

const todos = JSON.parse(localStorage.getItem('todos')) || {
    "all time": [],
    "today": [],
    "week": [],
    "important": []                                           
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
    domManipulator.showToDos(todos, display);
    
});

// sidebar events //

const allTimeSide = document.getElementById("all-time-sidebar");
let currSideButton = allTimeSide;
currSideButton.classList.add("sidebar-active");
allTimeSide.addEventListener('click', e => {
    currSideButton = domManipulator.changeSideButton(allTimeSide, currSideButton, "all time"),
    domManipulator.showToDos(todos, display);
})
const todaySide = document.getElementById("today-sidebar");
todaySide.addEventListener('click', e => {
    currSideButton = domManipulator.changeSideButton(todaySide, currSideButton, "today"),
    domManipulator.showToDos(todos, display);
})
const thisWeekSide = document.getElementById("this-week-sidebar");
thisWeekSide.addEventListener('click', e => {
    currSideButton = domManipulator.changeSideButton(thisWeekSide, currSideButton, "this week"),
    domManipulator.showToDos(todos, display);
})
const importantSide = document.getElementById("important-sidebar");
importantSide.addEventListener('click', e => {
    currSideButton = domManipulator.changeSideButton(importantSide, currSideButton, "important"),
    domManipulator.showToDos(todos, display);
})



