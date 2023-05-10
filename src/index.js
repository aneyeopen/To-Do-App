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
domManipulator.currSideButton = allTimeSide;
domManipulator.currSideButton.classList.add("sidebar-active");
allTimeSide.addEventListener('click', e => {
    domManipulator.currSideButton = domManipulator.changeSideButton(allTimeSide, "all time"),
    domManipulator.showToDos(todos, display);
})
const todaySide = document.getElementById("today-sidebar");
todaySide.addEventListener('click', e => {
    domManipulator.currSideButton = domManipulator.changeSideButton(todaySide, "today"),
    domManipulator.showToDos(todos, display);
})
const thisWeekSide = document.getElementById("this-week-sidebar");
thisWeekSide.addEventListener('click', e => {
    domManipulator.currSideButton = domManipulator.changeSideButton(thisWeekSide, "this week"),
    domManipulator.showToDos(todos, display);
})
const importantSide = document.getElementById("important-sidebar");
importantSide.addEventListener('click', e => {
    domManipulator.currSideButton = domManipulator.changeSideButton(importantSide, "important"),
    domManipulator.showToDos(todos, display);
})

const addProject = document.getElementById("add-project-sidebar");
const addProjectDiv = document.getElementById("add-project-form");
const projectsContainer = document.getElementById("projects-container")
addProject.addEventListener('click', e => {
    domManipulator.addProjectInput(addProjectDiv, projectsContainer);
})

