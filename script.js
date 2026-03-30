function openTab(evt, tabName) { // adapted from https://www.w3schools.com/howto/howto_js_tabs.asp
  // evt = click event

  var i, tabcontent, tablinks; // classes and counter

  // grab all of the tabs
  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none"; // they're all getting hidden
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function displayForm(evt) {
  const radioButton = document.querySelector('input[name="selection1"]:checked');
  const dropdown = document.getElementById("selection2");

  if (!radioButton || !dropdown.value) {
    document.getElementById("selections").textContent = "Please select a camera mode and camera quality.";
  } else {
    const text = `Camera mode: ${radioButton.value}` + "<br>" + `Camera quality: ${dropdown.value}`;
    document.getElementById("selections").innerHTML = text
  }

}



function addFridgeItem(evt) {

  var form = document.getElementById("fridge-input");
  var item = form.elements["itemName"].value;
  var date = form.elements["exp-date"].value;
  const fridgeList = document.getElementById("my-fridge-list");
  const expList = document.getElementById("my-fridge-expiring-list");
  // var obj = { 'item': item, 'exp-date': date };

  // localStorage.setItem(item, JSON.stringify(obj)); // is this prone to bugs?
  // var retrievedObject = localStorage.getItem(item);

  const li = document.createElement("li");
  li.textContent = `${item} -- Expires ${date}`;


  li.addEventListener("click", () => {
    li.remove();
  });

  // If it is under three days until expiration, we move it to exp lsit
  const daysLeft = (new Date(date) - new Date()) / (1000 * 60 * 60 * 24);

  if (daysLeft < 3) {
    expList.appendChild(li);
  } else {
    fridgeList.appendChild(li)
  }


  form.reset()
}



function Todo() {

  const input = document.getElementById("todoInput");

  const addBtn = document.getElementById("addTodoBtn");
  const list = document.getElementById("todoList");

  const error = document.getElementById("todoError");
  const clear = document.getElementById("clear");


  // console.log({ input, addBtn, list });

  if (!input || !addBtn || !list) return;

  function setError(msg) {

    if (!error) return;
    error.textContent = msg || "";

  }

  function addTodoItem(text) {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Please type something before adding.");
      return;
    }
    setError("");


    const li = document.createElement("li");
    li.classList.add("todo-item");

    const span = document.createElement("span");
    span.classList.add("todo-text");
    span.textContent = trimmed;

    span.addEventListener("click", () => {
      li.classList.toggle("completed");
    });

    // delete button
    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.classList.add("todo-delete");
    delBtn.textContent = "Delete";

    delBtn.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);

    input.value = "";
    input.focus();
  }

  addBtn.addEventListener("click", () => addTodoItem(input.value));

  // press Enter in the input to add
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodoItem(input.value);
    }
  });

  if (clear) {
    clear.addEventListener("click", () => {
      const completed = list.querySelectorAll(".completed");
      completed.forEach((li) => li.remove());
    });
  }

}


document.addEventListener("DOMContentLoaded", Todo);