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

        var buttonContainer = document.createElement("div");
        buttonContainer.classList.add("project-button-container")

        projectForm.appendChild(projectFormInput);
        buttonContainer.appendChild(addProjectButton);
        buttonContainer.appendChild(cancelProjectButton);
        projectForm.appendChild(buttonContainer);

        cancelProjectButton.addEventListener("click", e => {
            projectForm.reset();
            projectForm.innerHTML = '';
        })

        container.appendChild(projectForm);



        
    }


    function showToDos(todos, element){

        element.innerHTML = "";
        console.log(todos)

        todoManager.indexArray()
        dateManager.clearDateLists();
        dateManager.sortWithinWeek();
        dateManager.sortToday();
        todoManager.sortImportant();
        todoManager.sortCurrentProject();

        
        

        if (todos[todoManager.currentProject].length == 0) {
            return;
        }

        for (let i = 0; i < todos[todoManager.currentProject].length; i++) {
            const toDoContainer = document.createElement("li");
            toDoContainer.classList.add("to-do-container");
            

            
            const toDoCheck = document.createElement("div");
            toDoCheck.classList.add("to-do-check");
            toDoCheck.addEventListener("click", e => {
                todoManager.checkToDo(toDoCheck, todos[todoManager.currentProject][i], toDoContainer)
            })

            const toDoTitle = document.createElement("div");
            toDoTitle.innerHTML = todos[todoManager.currentProject][i].name;
            toDoTitle.classList.add("to-do-title");


            const toDoDetails = document.createElement("div");
            toDoDetails.innerHTML = todos[todoManager.currentProject][i].details;
            toDoDetails.classList.add("to-do-details");

            
            const toDoProject = document.createElement("div");
            if (todos[todoManager.currentProject][i].project != undefined){
            toDoProject.innerHTML = `Project: ${dateManager.formatDate(todos[todoManager.currentProject][i].project)}`;
            } else {
                toDoProject.innerHTML = "No Project";
            }
            toDoProject.classList.add("to-do-project");

            const toDoDate = document.createElement("div");
            toDoDate.innerHTML = `Due: ${dateManager.formatDate(todos[todoManager.currentProject][i].date)}`;
            toDoDate.classList.add("to-do-date");

            const toDoImportant = document.createElement("div");
            
            toDoCheck.classList.add("to-do-important");
            if (todos[todoManager.currentProject][i].check === true) {
                toDoContainer.classList.add("container-checked")
                toDoCheck.classList.add("checked");
            }else {toDoCheck.classList.add("unchecked");}
            

            
            
            const toDoDelete = document.createElement("div");
            toDoDelete.innerHTML = "X";
            toDoDelete.classList.add("to-do-delete");
            toDoDelete.addEventListener("click", e => {
                let tempIndex = todos[todoManager.currentProject][i].index;
                if(todos[todoManager.currentProject][i].project != undefined) {
                    for (let k = 0; k < todos[[todos[todoManager.currentProject][i].project]].length; k++) {
                        if (todos[[todos[todoManager.currentProject][i].project]][k].index == todos[todoManager.currentProject][i].index){
                            
                            todos[todos[todoManager.currentProject][i].project] = todoManager.removeFromArray(k, todos[todos[todoManager.currentProject][i].project]);
                            todos["all time"] = todoManager.removeFromArray(tempIndex, todos["all time"]);
                        }
                        break;
                    }
                }else {todos["all time"] = todoManager.removeFromArray(tempIndex, todos["all time"]);}
                
                
                    showToDos(todoManager.todos, document.querySelector('.to-do-list'));
        
            })

            const toDoTextContainer = document.createElement("div");
            toDoTextContainer.classList.add("to-do-text");

            const toDoOptions = document.createElement("div");
            toDoOptions.classList.add("to-do-options");

            toDoContainer.appendChild(toDoCheck);
            toDoTextContainer.appendChild(toDoTitle);
            toDoTextContainer.appendChild(toDoDetails);
            toDoContainer.appendChild(toDoTextContainer);
            toDoOptions.appendChild(toDoDelete);
            toDoOptions.appendChild(toDoProject);
            toDoOptions.appendChild(toDoDate);
            toDoOptions.appendChild(toDoImportant);
            toDoContainer.appendChild(toDoOptions);

            element.appendChild(toDoContainer);
        }
        


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
    
    const tempToDo = todoFactory("fart", "2023-06-12", "these are pretty important", true, false, undefined, false)
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
    function todoFactory(name, date, details, important, check, project, index) {
        return {
            name,
            date,
            details,
            important,
            check,
            project,
            index
        }
    };


    function newToDo(e, todoList, form) {

        e.preventDefault();

        const toDoTitle = (document.querySelector('#modal-to-do-title')).value;
        const toDoDetails = (document.querySelector('#modal-to-do-details')).value;
        const toDoDate = (document.querySelector('#to-do-date')).value;
        const toDoPriority = (document.getElementById("create-new__important").checked);

        

        let toDoProject = undefined;
        if (todoManager.currentProject != "all time" &&
            todoManager.currentProject != "today" &&
            todoManager.currentProject != "this week" &&
            todoManager.currentProject != "important") {
                toDoProject = todoManager.currentProject;
            }
        const newToDo = todoFactory(toDoTitle, toDoDate, toDoDetails, toDoPriority, false, toDoProject, false);
            newToDo.check = false;
            console.log(newToDo)
    
            todoList["all time"].push(newToDo);
        

        

        
    }

    function checkToDo(checkDiv, todo, container) {
        let tempIndex = todo.index
        for (let i=0 ; i < todoManager.todos["all time"].length; i++){
            if (todoManager.todos["all time"][i].index  === todo.index){
                if (todo.check == true) {
                    checkDiv.classList.remove("checked");
                    checkDiv.classList.add("unchecked");
                    container.classList.remove("container-checked")
                    todoManager.todos["all time"][i].check = false;
                } else {
                    checkDiv.classList.remove("unchecked");
                    checkDiv.classList.add("checked")
                    container.classList.add("container-checked")
                    todoManager.todos["all time"][i].check = true;
                }
            }
            console.log(todoManager.todos)
        }
        

    }

    function removeFromArray(index, array) {
        const halfBeforeTheUnwantedElement = array.slice(0,index);
        const indexPlusOne = index + 1;
        const halfAfterTheUnwantedElement = array.slice(indexPlusOne);
        const poppedArray = halfBeforeTheUnwantedElement.concat(halfAfterTheUnwantedElement);
        return poppedArray;
    }

    function sortImportant() {
        for (let i = 0; i < todoManager.todos["all time"].length; i++) {
            if (todoManager.todos["all time"][i].important === true) {
                todoManager.todos["important"].push(todoManager.todos["all time"][i]);
            }
        }
    }

    function indexArray() {
        for (let i = 0; i < todoManager.todos["all time"].length; i++) {
            todoManager.todos["all time"][i].index = i;
        }
    }

    function sortCurrentProject() {
        for (let i = 0; i < todoManager.todos["all time"].length; i++) {
            if (todoManager.currentProject != "all time" &&
                todoManager.currentProject != "today" &&
                todoManager.currentProject != "this week" &&
                todoManager.currentProject != "important") {
                if (todoManager.todos["all time"][i].project != undefined) {
                    todos[todoManager.currentProject].push(todoManager.todos["all time"][i])
                }
            }
        }
    }



    return {
        changeCurrentProject,
        currentProject,
        newToDo,
        todos,
        checkToDo,
        sortImportant,
        removeFromArray,
        indexArray,
        sortCurrentProject
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
            if (todoManager.todos["all time"][i].date != "No Due Date"){
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
        todoManager.todos["important"] = [];
        if (todoManager.currentProject != "all time") {
            todoManager.todos[todoManager.currentProject] = [];}
        }

    function sortToday() {
        
        const todayDate = new Date();
        const todayFormatted = format(todayDate, "yyyy-MM-dd");
        for (let i = 0; i < todoManager.todos["all time"].length; i++) {
            if (todoManager.todos["all time"][i].date != "No Due Date"){
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