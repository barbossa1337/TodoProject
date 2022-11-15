/* Selectors */
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const errorArea = document.querySelector("#error");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");

/*Global Functions*/
allEventListeners();

/*All event listeners are merging in one function*/
function allEventListeners() {
    form.addEventListener("submit", addNewItem);
}

/*New item function*/
function addNewItem(e) {
    e.preventDefault();
    //Input control
    if (input.value === '') {
        /*Error message*/
        errorArea.innerHTML = "Please type a task!";
        /*Clear error message*/
        setTimeout(function () {
            errorArea.innerHTML = "";
        }, 5000);
        return;
    }
    /*Create list item*/
    const li = document.createElement("li");
    li.classList = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(input.value));
    /*Create delete button in list items*/
    const a = document.createElement("a");
    a.classList = "delete-item float-end btn btn-danger btn-sm";
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
    /*Merge new list item's elements*/
    li.appendChild(a);
    taskList.appendChild(li);
    /*Clear input after adding a new item*/
    input.value = "";
}
