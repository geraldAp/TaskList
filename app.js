// Define our ui vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// function to load all event listeners
loadEventListeners();


// Load all event listeners
function loadEventListeners() {
    // DOM Load event creating the process of saving to local storage step3
    // this event is called right after the dom is loaded
    document.addEventListener('DOMContentLoaded', getTasks)
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter task event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS creating the process of saving to local storage step4
function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // making it a string
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        //create li 
        const li = document.createElement('li')
        //add class materialize 
        li.className = 'collection-item';

        // create text noode here we didnt use taskinput.value becuse in this case its coming from task
        const value = document.createTextNode(task);
        // append value to li
        li.appendChild(value);
        // new link element
        const link = document.createElement('a');
        // Add class to link
        link.className = 'delete-item secondary-content';
        // Add icon to html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append li to ul(taskList)
        li.appendChild(link);
        //append li to ul(taskList)
        taskList.appendChild(li);
    })

}

// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task')
    }
    //not necessary to create the else if
    else if (taskInput.value > '') {
        //create li 
        const li = document.createElement('li')
        //add class materialize 
        li.className = 'collection-item';

        // create text noode
        const value = document.createTextNode(taskInput.value);
        // append value to li
        li.appendChild(value);
        // new link element
        const link = document.createElement('a');
        // Add class to link
        link.className = 'delete-item secondary-content';
        // Add icon to html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append li to ul(taskList)
        li.appendChild(link);
        //append li to ul(taskList)
        taskList.appendChild(li);

        // store in local Storage creating the process of saving to local storage step1
        storeTaskInLocalStorage(taskInput.value);
    }

    // clear inputm 
    taskInput.value = '';


    e.preventDefault();
}


// Store Task creating the process of saving to local storage step2
function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // making it a string
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // push task into tasks mind you task is a parameter taking the argument taskInput.value 
    tasks.push(task)

    //setting it back to local storage
    // has t be stord as astring so we store task the the variable tasks but we wrap it
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


// Remove Task

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        //we rapped it around a confirm
        if (confirm('Are You Sure')) {
            e.target.parentElement.parentElement.remove();

            //remove from ls process of saving to local storage step5
            // we dnt have the id so we pass this here the actual element
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

//Remove from Local storage  process of saving to local storage step6
function removeTaskFromLocalStorage(taskItem) {
    // checking local storage and putting it into a variable
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // making it a string
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    // // first way
    // taskList.innerHTML = '';

    //faster way
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear  from local storage process of saving to local storage step7

    clearTasksFromLocalStoragee();
}

// clear task from local storage process of saving to local storage step8
function clearTasksFromLocalStoragee() {
    localStorage.clear();
}



// Filter Task
function filterTasks(e) {
    //changing it to lower case
    const text = e.target.value.toLowerCase();
    //we can use for each because of the nodelist 
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        // if the indexOf(text) is not = to negative one the task should show  
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}








