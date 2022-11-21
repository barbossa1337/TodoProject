//Global Selectors
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
const error = document.querySelector("#error");
let items;

//Global Functions
loadItems();
eventListeners();

//All Event Listeners
function eventListeners() {
    //Form Submit
    form.addEventListener("submit", addNewItem);
    //Delete An Item
    taskList.addEventListener('click', deleteAnItem);
    //Delete All Items
    btnDeleteAll.addEventListener("click", deleteAllItems);
    //Edit An Item
    taskList.addEventListener("click", editAnItem);
}

//Edit An Item
function editAnItem(e) {
    const edittedTodo = e.target.parentElement.parentElement;
    if (input.value === "") {
        error.innerHTML = "Write something to edit a task!";
        setTimeout(function () {
            error.innerHTML = "";
        }, 4000);
    } else {
        if (e.target.className === 'fa-solid fa-pen-to-square') {
            if (confirm("Do you want to edit this task?")) {
                edittedTodo.textContent = input.value;
                input.value = "";
            }
            //Delete Button
            const a = document.createElement('a');
            a.classList = 'delete-item float-end btn btn-primary btn-sm ms-2';
            a.setAttribute('href', '#');
            a.innerHTML = '<i class="fa-solid fa-rectangle-xmark"></i>';
            edittedTodo.appendChild(a);
            //Edit Button
            const btnEdit = document.createElement("a");
            btnEdit.href = "#";
            btnEdit.classList = "edit-item float-end btn btn-warning btn-sm";
            btnEdit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            edittedTodo.appendChild(btnEdit);
        }
    }
}

//Delete All Items
function deleteAllItems(e) {

    if (confirm('Are you sure?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        //Clear all todos from storage
        localStorage.clear();
    }

    e.preventDefault();
}

//Delete An Item
function deleteAnItem(e) {
    if (e.target.className === "fa-solid fa-rectangle-xmark") {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();
            //Delete An Item from LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
}

//Add New Items
function addNewItem(e) {
    e.preventDefault();
    //Error
    if (input.value === '') {
        error.innerHTML = "Write a task!";
        setTimeout(() => {
            error.innerHTML = "";
        }, 4000);
        return;
    }
    createItem(input.value);
    setItemToLS(input.value);
    input.value = "";

}

//Create New Items
function createItem(text) {
    //List Items
    const li = document.createElement('li');
    li.classList = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));
    //Anchor Items
    const a = document.createElement('a');
    a.classList = 'delete-item float-end btn btn-primary btn-sm ms-2';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fa-solid fa-rectangle-xmark"></i>';
    //Append elements
    li.appendChild(a);
    taskList.appendChild(li);
    //Edit Button
    const btnEdit = document.createElement("a");
    btnEdit.href = "#";
    btnEdit.classList = "edit-item float-end btn btn-warning btn-sm";
    btnEdit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    li.appendChild(btnEdit);
}

//Set Items To LS
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem("tasks", JSON.stringify(items));
}

//Get Items From LS
function getItemsFromLS() {
    if (localStorage.getItem("tasks") === null)
        items = [];
    else
        items = JSON.parse(localStorage.getItem("tasks"));

    return items;
}

//Delete An Item From LS
function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (todo, index) {
        if (todo === text)
            items.splice(index, 1);
    });
    localStorage.setItem('tasks', JSON.stringify(items));
}

//Load Items To DOM
function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (todo) {
        createItem(todo);
    });
}