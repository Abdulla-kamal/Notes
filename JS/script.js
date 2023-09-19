let input = document.querySelector("input");
let addBtn = document.querySelector(".add");
let clearBtn = document.querySelector(".clear");
let result = document.getElementById("result");

let arrayOfobj = [];

if (localStorage.getItem("tasks")) {
  arrayOfobj = JSON.parse(localStorage.getItem("tasks"));
}
getData();
addBtn.addEventListener("click", (_) => {
  if (input.value === "") {
    return;
  }
  addObjarray(arrayOfobj);
  addToLocalStorage(arrayOfobj);
  addToPage(arrayOfobj);
  input.value = "";
});


result.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    DeleteWith(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.classList.contains("task")) {
    checkCompleted(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

clearBtn.addEventListener("click", (_) => {
  if (arrayOfobj.length === 0) {
    return;
  } else {
    popLetter();
  }
  localStorage.removeItem("tasks");
  arrayOfobj = [];
  addToPage(arrayOfobj);
});

function addObjarray(arrayOfobj) {
  let task = {
    id: Date.now(),
    title: input.value,
    completed: false,
  };
  arrayOfobj.push(task);
  addToLocalStorage(arrayOfobj)
  addToPage(arrayOfobj)
}

function addToLocalStorage(arrayOfobj) {
  localStorage.setItem("tasks", JSON.stringify(arrayOfobj));
}

function addToPage(arrayOfobj) {
  result.innerHTML = "";
  arrayOfobj.forEach((task) => {
    let mainDiv = document.createElement("div");
    mainDiv.className = "task";
    if (task.completed) {
      mainDiv.className = "task done";
    }
    mainDiv.setAttribute("data-id", task.id);
    mainDiv.appendChild(document.createTextNode(task.title));
    let del = document.createElement("span");
    del.className = "del";
    del.appendChild(document.createTextNode("Delete"));
    mainDiv.appendChild(del);
    result.appendChild(mainDiv);
  });
}

function getData() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addToPage(arrayOfobj);
  }
}

function DeleteWith(dataId) {
  arrayOfobj = arrayOfobj.filter((e) => e.id != dataId);
  addToLocalStorage(arrayOfobj);
}

function checkCompleted(taskId) {
  for (let i = 0; i < arrayOfobj.length; i++) {
    if (arrayOfobj[i].id == taskId) {
      arrayOfobj[i].completed == false
        ? (arrayOfobj[i].completed = true)
        : (arrayOfobj[i].completed = false);
    }
  }
  addToLocalStorage(arrayOfobj);
}

function popLetter() {
  let letter = document.createElement("div");
  letter.className = "letter";
  let close = document.createElement("close");
  close.className = "close";
  document.body.appendChild(letter);
  letter.appendChild(close);
  letter.appendChild(document.createTextNode("Great Job 🔥"));
  let a = document.createElement("a");
  a.innerHTML = "Follow Me";
  a.setAttribute("href", "https://www.instagram.com/abd_o_el_/?next=%2F&hl=en");
  letter.appendChild(a);
  let cover = document.createElement("div");
  cover.className = "cover";
  document.body.appendChild(cover);
  setTimeout(function () {
    document.querySelector(".letter").remove();
    document.body.style.opacity = "1";
    document.querySelector(".cover").remove();
  }, 5000);
  document.querySelector(".close").addEventListener("click", (_) => {
    document.querySelector(".close").parentElement.remove();
    document.querySelector(".cover").remove();
  });
}



