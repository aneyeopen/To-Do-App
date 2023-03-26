import { addDays, format, isEqual, isWithinInterval } from "date-fns";
import parseISO from "date-fns/parseISO";


export const domManipulator = (function () {


    function openModal(modal, overlay) {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        return;
    };

    function closeModal(modal, overlay) {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        // resetForm() //
        document.getElementById("create-new-form").reset();
        
        return;
    }


    function showToDos(todos, element){

        console.log(todos[todoManager.getCurrentProject()]);
        element.innerHTML = "";


        if (todos[todoManager.getCurrentProject()].length == 0) {
            return;
        }

        for (let i = 0; i < todos[todoManager.getCurrentProject()].length; i++) {
            const toDoContainer = document.createElement("li");
            toDoContainer.classList.add("to-do-container");

            
            const toDoCheck = document.createElement("div");
            toDoCheck.classList.add("to-do-check");
            toDoCheck.classList.add("unchecked");

            const toDoTitle = document.createElement("div");
            toDoTitle.innerHTML = todos[todoManager.getCurrentProject()][i].name;
            toDoTitle.classList.add("to-do-title");


            const toDoDetails = document.createElement("div");
            toDoDetails.innerHTML = todos[todoManager.getCurrentProject()][i].details;
            toDoTitle.classList.add("to-do-details");


            const toDoDate = document.createElement("div");
            toDoDate.innerHTML = todoManager.formatDate(todos[todoManager.getCurrentProject()][i].date);
            toDoDate.classList.add("to-do-date");

            const toDoUrgent = document.createElement("div");
            toDoCheck.classList.add("to-do-urgent");
            toDoCheck.classList.add("urgent-unchecked");

            todos[todoManager.getCurrentProject()][i].index = i;

            toDoContainer.appendChild(toDoCheck);
            toDoContainer.appendChild(toDoTitle);
            toDoContainer.appendChild(toDoDetails);
            toDoContainer.appendChild(toDoDate);
            toDoContainer.appendChild(toDoUrgent);

            element.appendChild(toDoContainer);
        }

        return;








    }

    return {
        openModal,
        closeModal,
        showToDos
    }
})();

export const todoManager = (function () {

    const currentProject = "all time";

    const todoList = [];

    function getCurrentProject() {
        return currentProject;
    }

    function changeCurrentProject(newProject) {
        currentProject = newProject
    }



    // to do factory function
    function todoFactory(name, date, details, urgent, project, checked=false, index) {
        return {
            name,
            date,
            details,
            urgent,
            project,
            checked,
            index
        }
    };


    function newToDo(e, todoList, form) {

        e.preventDefault();

        const toDoTitle = (document.querySelector('#modal-to-do-title')).value;
        const toDoDetails = (document.querySelector('#modal-to-do-details')).value;
        const toDoDate = (document.querySelector('#to-do-date')).value;
        const toDoPriority = (document.querySelector('[name="create-new__urgent"]:checked'));

        const toDoProject = getCurrentProject();

        console.log(toDoPriority);
        console.log(toDoTitle);



        const newToDo = todoFactory(toDoTitle, toDoDate, toDoDetails, toDoPriority, toDoProject, null);


        todoList[currentProject].push(newToDo);

        if (toDoProject != "all time") {
            todoList["all time"].push(newToDo);
        }

        if (toDoPriority === 'urgent') {
            todoList["urgent"].push(newToDo);
        }

    }

    function indexToDo(todo, listIndex) {
        todo.index = listIndex;
        return;
    }

    function formatDate(date) {
        let formattedDate;
        if (!date) {
            formattedDate = "No Due Date";
        }
        else{
            formattedDate = date;
        }
        return formattedDate;
    }



    return {
        getCurrentProject,
        changeCurrentProject,
        newToDo,
        formatDate
    }


})();