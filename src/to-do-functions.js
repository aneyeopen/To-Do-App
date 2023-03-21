
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


    function showAllToDo(todos, element){

        const toDoList = todos[toDoManager.getCurrentProject()];

        element.innerHTML = "";


        if (toDoList.length == 0) {
            return;
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
    function todoFactory(name, date, details, urgent, project, checked=false) {
        return {
            name,
            date,
            details,
            urgent,
            project,
            checked
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



        const newToDo = todoFactory(toDoTitle, toDoDate, toDoDetails, toDoPriority, toDoProject);


        todoList[currentProject].push(newToDo);

        if (toDoProject != "all time") {
            todoList["all time"].push(newToDo);
        }

        if (toDoPriority === 'urgent') {
            todoList["urgent"].push(newToDo);
        }

    }



    return {
        getCurrentProject,
        changeCurrentProject,
        newToDo
    }


})();