let data = [];
let selectedPostId = null;
let msg = document.getElementById("msg");
let msg2 = document.getElementById("msg2");
//add new item
document.getElementById("add").addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById("textInput").value;
    const id = title;
    const desc = document.getElementById("textarea").value;
    const date = document.getElementById("dateInput").value;
    const priority = document.getElementById("priority").value;
    const tempData = { id, title, desc, date, priority };
    if (isValid(tempData)) {
        data.push(tempData);

        showData();
        msg.innerHTML = "Thêm thành công";
        localStorage.setItem("data", JSON.stringify(data));
    }
    document.getElementById("myForm").reset();
});

//update item
document.getElementById("updateBtn").addEventListener("click", (e) => {
    e.preventDefault();

    if (selectedPostId) {
        const tempPost = data.find((item) => item.id === selectedPostId);
        if (tempPost) {
            const newTitle = document.getElementById("textInputUpdate").value;
            const newDesc = document.getElementById("textareaUpdate").value;
            const newDate = document.getElementById("dateInputUpdate").value;
            const newPriority = document.getElementById("priorityUpdate").value;
            msg2.innerHTML = "*Đã cập nhật thành công";
            data.splice(data.indexOf(tempPost), 1);
            tempPost.title = newTitle;
            tempPost.desc = newDesc;
            tempPost.date = newDate;
            tempPost.priority = newPriority;
            if (isValid(tempPost)) {
                data.push(tempPost);
                new Promise((resolve) => {
                        resolve();
                    })
                    .then(() => {
                        localStorage.setItem("data", JSON.stringify(data));
                    })
                    .then(() => {
                        refreshData();
                    });
            }
        }
    }
});

//validate form
const isValid = (data) => {
    if (data.title === "" || data.desc === "" || data.date === "") return false;
    return true;
};

const editPost = (id) => {
    selectedPostId = id;
    const tempPost = data.find((item) => item.id === id);
    document.getElementById("textInputUpdate").value = tempPost.title;
    document.getElementById("textareaUpdate").value = tempPost.desc;
    document.getElementById("dateInputUpdate").value = tempPost.date;
    document.getElementById("priorityUpdate").value = tempPost.priority;
};
const deletePost = (id) => {
    const tempIndex = data.indexOf(data.find((item) => item.id === id));
    console.log(tempIndex);
    data.splice(tempIndex, 1);
    localStorage.setItem("data", JSON.stringify(data));
    refreshData();
};
const renderRow = (data) => `
    <div id=${data.id} class="row">
        <div class ="display">
            <div class ="display_dad">
                <input type="checkbox" value="${data.id}" class="task_checkbox">
                <div class ="see">
                    <div class="display_dad_child">${data.priority}</div>
                    <p>${data.title}</p>
                </div>
            </div>
            <div class ="knot">
                <i onClick ="deletePost('${data.id}');createPosts()" data-bs-toggle="modal" data-bs-target="#deleteModal" class="fas fa-trash-alt mx-2"></i>   
                <i onClick= "editPost('${data.id}')" data-bs-toggle="modal" data-bs-target="#update" class="fas fa-edit"></i>
            </div>
            
        </div>
    
    </div>  
`;


const showData = () => {
    const posts = document.getElementById("posts");
    posts.innerHTML = "";
    data.map((item) => {
        posts.innerHTML += renderRow(item);
    });
};

const refreshData = () => {
    new Promise((resolve) => {
            resolve();
        })
        .then(() => {
            data = localStorage.getItem("data") ?
                JSON.parse(localStorage.getItem("data")) : [];
        })
        .then(() => {
            showData();
        });
};

refreshData();

const btn = document.querySelector(".done");
const toast = document.querySelector(".toast");
const closeIcon = document.querySelector(".toast__close");
const progress = document.querySelector(".progress");

btn.addEventListener("click", (e) => {
    $('.toast').toast('show')
    toast.classList.add("show");
    progress.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 5000);

    setTimeout(() => {
        progress.classList.add("show");
    }, 5300);
})


// closeIcon.addEventListener("click", (e) => {
//     toast.classList.remove("show");
//     setTimeout(() => {
//         progress.classList.add("show");
//     }, 300);
// });


// d

function KiemtraForm() {
    var tittle = document.getElementById("textInput").value
    var des = document.getElementById("textarea").value
    var date = document.getElementById("dateInput").value
    var errorTitle = document.getElementById("err_title")
    var errorDes = document.getElementById("err_des")
    var errorDate = document.getElementById("err_date")

    errorTitle.innerText = errorDes.innerText = errorDate.innerText = '';

    if (tittle == "") {
        errorTitle.innerText = "Nhập tiêu đề"
    }
    if (des == "") {
        errorDes.innerText = "Nhập mô tả"
    }
    if (date == "") {
        errorDate.innerText = "Chọn ngày sinh"
    }
    return true
}

function bluckRemove() {
    task_checkbox = document.querySelectorAll(".task_checkbox:checked")
    task_checkbox.forEach(element => {
        const tempIndex = data.indexOf(data.find((item) => item.id === element.value));
        console.log(tempIndex);
        data.splice(tempIndex, 1);
    });
    localStorage.setItem("data", JSON.stringify(data));
    refreshData();
}


// var search_input = document.querySelector("#search_input");

// search_input.addEventListener("keyup", function(e) {
//     var span_items = document.querySelectorAll(".table_body .name span");
//     var table_body = document.querySelector(".table_body ul");
//     var search_item = e.target.value.toLowerCase();

//     span_items.forEach(function(item) {
//         if (item.textContent.toLowerCase().indexOf(search_item) != -1) {
//             item.closest("p").style.display = "block";
//         } else {
//             item.closest("p").style.display = "none";
//         }
//     })

// });