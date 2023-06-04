import { addDays, format, isEqual, isWithinInterval, parse, isSameDay } from "date-fns";


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

    let currSideButton;

    function changeSideButton(selectedSideButton, project) {
        todoManager.changeCurrentProject(project)
        domManipulator.currSideButton.classList.remove("sidebar-active"),
        domManipulator.currSideButton = selectedSideButton,
        domManipulator.currSideButton.classList.add("sidebar-active");
        
        return domManipulator.currSideButton;
    }

    function addProjectInput(container, projectContainer) {
        


        if (document.querySelector(".add-project-button")) {
            return;
        }
        var projectForm = document.createElement('form');
        projectForm.action = "";
        var projectFormInput = document.createElement("textarea");
        projectFormInput.name = "add-project";
        projectFormInput.required = true;
        projectFormInput.classList.add("add-project-input");
        projectFormInput.placeholder = "Enter Project Name";

        var addProjectButton = document.createElement('input');
        addProjectButton.type = 'submit';
        addProjectButton.classList.add("add-project-button");
        addProjectButton.value = "Add Project";

        projectForm.addEventListener("submit", e => {
            e.preventDefault();
            const inputValue = document.querySelector(".add-project-input").value;
            const newProject = document.createElement('div')
            newProject.innerHTML = inputValue;
            newProject.classList.add("sidebar-link");
            newProject.classList.add("clickable");

            const newProjectString = inputValue.toString();
            const display = document.querySelector('.to-do-list');


            newProject.addEventListener("click", e => {
                changeSideButton(newProject, newProjectString)
                showToDos(todoManager.todos, display)
                
            })

            projectContainer.appendChild(newProject);
            projectForm.innerHTML = '';


            
            todoManager.todos[inputValue.toString()] = [];
        })

        var cancelProjectButton = document.createElement("button");
        cancelProjectButton.classList.add("cancel-project-button");
        cancelProjectButton.innerText = "Cancel"

        projectForm.appendChild(projectFormInput);
        projectForm.appendChild(addProjectButton);
        projectForm.appendChild(cancelProjectButton);

        cancelProjectButton.addEventListener("click", e => {
            projectForm.reset();
            projectForm.innerHTML = '';
        })

        container.appendChild(projectForm);



        
    }


    function showToDos(todos, element){

        element.innerHTML = "";


        dateManager.clearDateLists();

        dateManager.sortWithinWeek(todoManager.todos);
        dateManager.sortToday(todoManager.todos)


        if (todos[todoManager.currentProject].length == 0) {
            return;
        }

        for (let i = 0; i < todos[todoManager.currentProject].length; i++) {
            const toDoContainer = document.createElement("li");
            toDoContainer.classList.add("to-do-container");

            
            const toDoCheck = document.createElement("div");
            toDoCheck.classList.add("to-do-check");
            toDoCheck.classList.add("unchecked");
            toDoCheck.addEventListener("click", e => {
                todoManager.checkToDo(toDoCheck)
            })

            const toDoTitle = document.createElement("div");
            toDoTitle.innerHTML = todos[todoManager.currentProject][i].name;
            toDoTitle.classList.add("to-do-title");


            const toDoDetails = document.createElement("div");
            toDoDetails.innerHTML = todos[todoManager.currentProject][i].details;
            toDoTitle.classList.add("to-do-details");


            const toDoDate = document.createElement("div");
            toDoDate.innerHTML = `Due: ${dateManager.formatDate(todos[todoManager.currentProject][i].date)}`;
            toDoDate.classList.add("to-do-date");

            const toDoImportant = document.createElement("div");
            
            toDoCheck.classList.add("to-do-important");
            toDoCheck.classList.add("important-unchecked");

            todos[todoManager.currentProject][i].index = i;
            
            const toDoDelete = document.createElement("div");
            toDoDelete.innerHTML = "X";
            toDoDelete.classList.add("to-do-delete");

            const toDoTextContainer = document.createElement("div");
            toDoTextContainer.classList.add("to-do-text");

            const toDoOptions = document.createElement("div");
            toDoOptions.classList.add("to-do-options");

            toDoContainer.appendChild(toDoCheck);
            toDoTextContainer.appendChild(toDoTitle);
            toDoTextContainer.appendChild(toDoDetails);
            toDoContainer.appendChild(toDoTextContainer);
            toDoOptions.appendChild(toDoDelete);
            toDoOptions.appendChild(toDoDate);
            toDoOptions.appendChild(toDoImportant);
            toDoContainer.appendChild(toDoOptions);

            element.appendChild(toDoContainer);
        }
        todos["this week"] = [];
        todos["today"] = [];
        console.log(todoManager.todos)
        


        return;

    }




    return {
        openModal,
        closeModal,
        showToDos,
        addProjectInput,
        currSideButton,
        changeSideButton
    }
})();

export const todoManager = (function () {

    const currentProject = "all time";
    
    const tempToDo = todoFactory("fart", "2023-06-07", "these are pretty important", true, false, null)
    const todos = JSON.parse(localStorage.getItem('todos')) || {
        "all time": [tempToDo],
        "today": [],
        "this week": [],
        "important": []                                           
        };


    function changeCurrentProject(project) {
        todoManager.currentProject = project;

        const projectHeader = document.querySelector(".main-current-project");
        if (todoManager.currentProject == "all time" || todoManager.currentProject == "today" || 
        todoManager.currentProject == "this week" || todoManager.currentProject == "important"){

            const words = todoManager.currentProject.split(" ");

            projectHeader.innerHTML = words.map((word) => { 
                return word[0].toUpperCase() + word.substring(1); 
            }).join(" ");
    }else {
        projectHeader.innerHTML = todoManager.currentProject;
    }

    }



    // to do factory function
    function todoFactory(name, date, details, important, checked, index) {
        return {
            name,
            date,
            details,
            important,
            checked,
            index
        }
    };


    function newToDo(e, todoList, form) {

        e.preventDefault();

        const toDoTitle = (document.querySelector('#modal-to-do-title')).value;
        const toDoDetails = (document.querySelector('#modal-to-do-details')).value;
        const toDoDate = (document.querySelector('#to-do-date')).value;
        const toDoPriority = (document.getElementById("create-new__important").checked);


        const newToDo = todoFactory(toDoTitle, toDoDate, toDoDetails, toDoPriority, false);

        

        if (todoManager.currentProject != "all time") {
            todoList["all time"].push(newToDo);
        }

        if (toDoPriority === true) {
            todoList["important"].push(newToDo);
        }

        if (todoManager.currentProject == "this week" || todoManager.currentProject == "today" || todoManager.currentProject == "important") {
            return;
        } else {
            todoList[todoManager.currentProject].push(newToDo);
        }

    }

    function checkToDo(checkDiv) {
        if (checkDiv.classList.contains("checked")) {
            checkDiv.classList.remove("checked");
            checkDiv.classList.add("unchecked");
        } else {
            checkDiv.classList.remove("unchecked");
            checkDiv.classList.add("checked")
        }

    }

    



    return {
        changeCurrentProject,
        currentProject,
        newToDo,
        todos,
        checkToDo
    }



})();

export const dateManager = (function () {

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

    

    function sortWithinWeek() {

        const todayDate = new Date();
        const todayFormatted = format(todayDate, "yyyy-MM-dd");
        const weekFromToday = addDays(todayDate, 7);
        const weekFromTodayFormatted = format(weekFromToday, "yyyy-MM-dd");
        for (let i = 0; i < todoManager.todos["all time"].length; i++) {
            if (todoManager.todos["all time"][i] != "No Due Date"){
                let parsedDate = parse(todoManager.todos["all time"][i].date, "yyyy-MM-dd", new Date())
                if (isWithinInterval(parsedDate, {start: parse(todayFormatted, "yyyy-MM-dd", new Date()), end: parse(weekFromTodayFormatted, "yyyy-MM-dd", new Date())})) {
                    todoManager.todos["this week"].push(todoManager.todos["all time"][i]);
                }
            }
        }
    }
    
    function clearDateLists() {
        todoManager.todos["today"] = [];
        todoManager.todos["this week"] = [];
    }

    function sortToday() {
        
        const todayDate = new Date();
        const todayFormatted = format(todayDate, "yyyy-MM-dd");
        for (let i = 0; i < todoManager.todos["all time"].length; i++) {
            if (todoManager.todos["all time"][i] != "No Due Date"){
                let parsedDate = parse(todoManager.todos["all time"][i].date, "yyyy-MM-dd", new Date());
                if (isSameDay(parse(todayFormatted, "yyyy-MM-dd", new Date()), parse(todoManager.todos["all time"][i].date, "yyyy-MM-dd", new Date()))) {
                    todoManager.todos["today"].push(todoManager.todos["all time"][i]);
                }
            }
        }
    }

    


    return {
        formatDate,
        sortWithinWeek,
        sortToday,
        clearDateLists
    }

})();