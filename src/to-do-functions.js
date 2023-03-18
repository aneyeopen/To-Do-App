
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


    function showToDos(toDos, element){

    }

    return {
        openModal,
        closeModal
    }
})();

export const todoManager = (function () {

    const currentProject = "home";

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
        const toDoPriority = (document.querySelector('[name="create-new__urgent"]:checked')).value;

        const toDoProject = getCurrentProject();



        const newToDo = (toDoTitle, toDoDate, toDoDetails, toDoPriority, toDoProject);

        todoList[currentProject].push(newToDo);

    }

    return {
        getCurrentProject,
        changeCurrentProject,
        newToDo
    }


})();