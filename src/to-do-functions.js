
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


        element.innerHTML = "";


        if (todos[toDoManager.getCurrentProject()].length == 0) {
            return;
        }

        for (let i = 0; i < todos[toDoManager.getCurrentProject()].length; i++) {
            const toDoContainer = document.createElement("li");
            toDoContainer.classList.add("to-do-container");

            
            const toDoCheck = document.createElement("div");
            toDoCheck.classList.add("to-do-check unchecked");

            const toDoTitle = document.createElement("div");
            toDoTitle.innerHTML = todos[toDoManager.getCurrentProject()][i].name;
            toDoTitle.classList.add("to-do-title");

            // to do date //

            const toDoDetails = document.createElement("div");
            toDoDetails.innerHTML = todos[toDoManager.getCurrentProject()][i].details;
            toDoTitle.classList.add("to-do-details");

            const toDoUrgent = document.createElement("div");
            toDoCheck.classList.add("to-do-urgent urgent-unchecked");

            todos[toDoManager.getCurrentProject()][i].index = i;
        }








    }

    return {
        openModal,
        closeModal
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



    return {
        getCurrentProject,
        changeCurrentProject,
        newToDo
    }


})();