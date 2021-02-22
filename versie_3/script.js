const todoUl = document.getElementById("todo-ul");
const addItemButton = document.getElementById("new-item-button");

// ----------------------------------------------------------------------------
async function doWork() {
  try {
    const result = await getTodoList();
    return result;
 
  } catch (err) {
    console.log(`Er gaat iets mis: ${err}`);
  }
};

// ----------------------------------------------------------------------------
const makeTodoLi = function(newItem) {

  return "<div class='update-checkbox'><input type='checkbox'></input></div>"
          + "<div class='item-description'>"
          + newItem.description
          + "</div>"
          + "<div class='hidden-id'>"
          + newItem._id
          + "</div>"
          + "<div class='div-delete-button'><button class='delete-button'>"
          + "<img class='delete-image' src='dustbin.png' alt='trash can icon'>"
          + "</button></div>"
          ;
}

// ----------------------------------------------------------------------------
const deleteItem = function(itemToDelete) {

  if (itemToDelete.target.classList.contains("delete-image")) {
    parentDiv = itemToDelete.target.parentElement.parentElement;
  } else if (itemToDelete.target.classList.contains("delete-button")) {
    parentDiv = itemToDelete.target.parentElement;
  } else {
    return;
  }

  idToDelete = parentDiv.previousSibling.innerHTML;
  deleteFromTodoList(idToDelete).then((result) => {
    parentDiv.parentElement.remove();
  });
};

// ----------------------------------------------------------------------------
const setItemDone = function(item) {

  if (item.target.parentElement.classList.contains('update-checkbox')) {

    // het ID ophalen in de omliggende html
    let itemId = item.target.parentElement.nextSibling.nextSibling.innerHTML;

    updateAsDone(itemId).then( result => item.target.parentElement.nextSibling.classList.add("item-done"));

  }
}

// ----------------------------------------------------------------------------
const processResult = function(result) {

  result = result.sort(function(a, b) {
    a = new Date(a._createdOn);
    b = new Date(b._createdOn);
    return b - a;
  }
  );

  // taken die gedaan zijn doorstrepen
  result.forEach((todoItem) => {
    let newLi = document.createElement("li");
    newLi.classList.add('todo-li')
    newLi.innerHTML = makeTodoLi(todoItem);
    todoUl.append(newLi);
    if (todoItem.done) {
      newLi.querySelector('div:nth-child(2)').classList.add('item-done');
    }

  })

  const deleteButtons = todoUl.getElementsByClassName('delete-button');
  Array.from(deleteButtons).forEach( deleteButton => addEventListener("click", deleteItem));
  // of 
  // [...deleteButtons].forEach( e => addEventListener("click", deleteItem));

  const updateBoxes = todoUl.getElementsByClassName('update-checkbox');
  Array.from(updateBoxes).forEach( updateBox => addEventListener("change", setItemDone))

 };

// ----------------------------------------------------------------------------
const showNewItem = function(newItem) {

  let newLi = document.createElement("li");
  newLi.classList.add('todo-li');
  newLi.innerHTML = makeTodoLi(newItem);
  todoUl.insertBefore(newLi, todoUl.getElementsByTagName("li")[0]);

  newLi.querySelector(".delete-button").addEventListener("click", deleteItem);

  newLi.querySelector('.update-checkbox').addEventListener("change", setItemDone);

}

 // ----------------------------------------------------------------------------
const addItem = function (item) {

  let itemText = document.getElementById("new-item-text").value;

  if (itemText === "") {
    alert("Er is niks toe te voegen, vul een nieuw te-doen-ding in.");
    return;
  }

  let itemToAdd = { description: itemText, done: false };

  putOnTodoList(itemToAdd).then((result) => showNewItem(result));

  document.getElementById("new-item-text").value = "";
}

// ----------------------------------------------------------------------------

doWork().then( result => processResult(result));

addItemButton.addEventListener("click", addItem);
