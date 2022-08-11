let forms = document.querySelectorAll("form");
let textInput = document.getElementById("textInput");
let textarea = document.getElementById("textarea");
let dateInput = document.getElementById("dateInput");
let priority = document.getElementById("priority");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");
let add = document.getElementById("add");

forms.forEach(form => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // console.log("button clicked");
        formValidation();
    });
})

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "*Yêu cầu nhập thông tin";
    } else {
        console.log("success");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};

let data = {};

let acceptData = () => {
    data.push({
        text: textInput.value,
        description: textarea.value,
        date: dateInput.value,
        priority: priority.value,
    });

    localStorage.setItem("data", JSON.stringify(data));

    createPosts();
};

let createPosts = () => {
    posts.innerHTML = "";
    data.map((x, y) => {
        return (posts.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
            <p>${x.priority}</p>
            <span class="options">
            <i onClick= "editPosts(this)" data-bs-toggle="modal" data-bs-target="#update" class="fas fa-edit"></i>
            <i onClick ="deletePosts(this);createPosts()" data-bs-toggle="modal" data-bs-target="#exampleModal" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
}
let deletePosts = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};

let editPosts = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    textarea.value = selectedTask.children[1].innerHTML;
    dateInput.value = selectedTask.children[2].innerHTML;
    priority.value = selectedTask.children[3].innerHTML;

    // deletePosts(e);
};

let resetForm = () => {
    textInput.value = "";
    textarea.value = "";
    dateInput.value = "";
    priority.value = "";
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createPosts();
})();
function getSelectValue(){
    var selectedValue = document.getElementById("priority").value;
    console.log(selectedValue);
}

document.getElementById('update').addEventListener('click', (e) => {
    // e.preventDefault();
    // const newTitle = document.getElementById('textInputUpdate').value
    // const newDescription = document.getElementById('textareaUpdate').value
    // const newDate = document.getElementById('dateInputUpdate').value
    // const newWork = document.getElementById('priorityUpdate').value

    // const titleDom = posts.childNodes[1].childNodes[1]
    // const dateDom = posts.childNodes[1].childNodes[3]
    // const descDom = posts.childNodes[1].childNodes[5]
    // const workDom = posts.childNodes[1].childNodes[7]

    // titleDom.textContent = newTitle
    // dateDom.textContent = newDate
    // descDom.textContent = newDescription
    // workDom.textContent = newWork
})