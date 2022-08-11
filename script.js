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
    msg.innerHTML = "*Yêu cầu nhập thông tin";
    if (isValid(tempData)) {
        data.push(tempData);

        showData();
        localStorage.setItem("data", JSON.stringify(data));
    }
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
            msg2.innerHTML = "*Đã cập nhập thành công";
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
                <input type="checkbox" value="0">
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