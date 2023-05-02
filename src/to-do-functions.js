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

    function changeSideButton(selectedSideButton, currentSide, project) {
        todoManager.changeCurrentProject(project),
        currentSide.classList.remove("sidebar-active"),
        console.log(currentSide)
        currentSide = selectedSideButton,
        currentSide.classList.add("sidebar-active");
        
        return currentSide;
    }


    function showToDos(todos, element){

        console.log(todos[todoManager.currentProject]);
        element.innerHTML = "";


        if (todos[todoManager.currentProject].length == 0) {
            return;
        }

        for (let i = 0; i < todos[todoManager.currentProject].length; i++) {
            const toDoContainer = document.createElement("li");
            toDoContainer.classList.add("to-do-container");

            
            const toDoCheck = document.createElement("div");
            toDoCheck.classList.add("to-do-check");
            toDoCheck.classList.add("unchecked");

            const toDoTitle = document.createElement("div");
            toDoTitle.innerHTML = todos[todoManager.currentProject][i].name;
            toDoTitle.classList.add("to-do-title");


            const toDoDetails = document.createElement("div");
            toDoDetails.innerHTML = todos[todoManager.currentProject][i].details;
            toDoTitle.classList.add("to-do-details");


            const toDoDate = document.createElement("div");
            toDoDate.innerHTML = todoManager.formatDate(todos[todoManager.currentProject][i].date);
            toDoDate.classList.add("to-do-date");

            const toDoImportant = document.createElement("div");
            toDoCheck.classList.add("to-do-important");
            toDoCheck.classList.add("important-unchecked");

            todos[todoManager.currentProject][i].index = i;

            toDoContainer.appendChild(toDoCheck);
            toDoContainer.appendChild(toDoTitle);
            toDoContainer.appendChild(toDoDetails);
            toDoContainer.appendChild(toDoDate);
            toDoContainer.appendChild(toDoImportant);

            element.appendChild(toDoContainer);
        }

        return;

    }




    return {
        openModal,
        closeModal,
        showToDos,
        changeSideButton
    }
})();

export const todoManager = (function () {

    const currentProject = "all time";
    

    const todoList = [];


    function changeCurrentProject(project) {
        todoManager.currentProject = project;
    }



    // to do factory function
    function todoFactory(name, date, details, important, project, checked=false, index) {
        return {
            name,
            date,
            details,
            important,
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
        const toDoPriority = (document.querySelector('[name="create-new__important"]:checked'));

        const toDoProject = todoManager.currentProject;

        console.log(toDoPriority);
        console.log(toDoTitle);



        const newToDo = todoFactory(toDoTitle, toDoDate, toDoDetails, toDoPriority, toDoProject, null);


        todoList[currentProject].push(newToDo);

        if (toDoProject != "all time") {
            todoList["all time"].push(newToDo);
        }

        if (toDoPriority === 'important') {
            todoList["important"].push(newToDo);
        }

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
        changeCurrentProject,
        currentProject,
        newToDo,
        formatDate
    }



})();