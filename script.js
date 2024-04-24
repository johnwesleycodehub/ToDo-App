const form= document.getElementById("form")
const textInput = document.getElementById("textInput")
const dateInput = document.getElementById("dateInput")
const textarea = document.getElementById("textarea")
const msg = document.getElementById("msg")
const tasks = document.getElementById("tasks")
const add = document.getElementById("add")

const formValidation = () =>{
    if(textInput.value === ""){
        msg.innerHTML="Input field cannot be empty";
    }
    else{
        msg.innerHTML="";

        getData();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();
        (()=>{
            add.setAttribute("data-bs-dismiss","")
        })();
    }
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    formValidation();
});

let data = [{}];
const getData=()=>{
    data.push({
        text: textInput.value,
        date: dateInput.value,
        task: textarea.value,
    });
    localStorage.setItem("data",JSON.stringify(data));
    createTask();
};

const createTask = ()=>{
    tasks.innerHTML="";
    data.map((ele,i)=>{
        return (tasks.innerHTML += `<div id=${i}>
        <span class="fw-bolder">${ele.text}</span>
        <span class="fw-bolder">${ele.date}</span>
        <p class="fw-bold">${ele.task}</p>
        <span class="options">
        <i onclick="editTask(this)" data-bs-toogle="modal" data-bs-target="#form" class="fa fa-pencil-square" aria-hidden="true"></i>
        <i onclick="deleteTask(this);createTask()" class="fa fa-trash-o" aria-hidden="true"></i>
        </span>
        </div>
        
        `);
    });
    resetForm();
};

const resetForm=()=>{
    textInput.value="";
    dateInput.value="";
    textarea.value="";
};
(()=>{
    data=JSON.parse(localStorage.getItem("data")) || [];
    createTask();
})();

const editTask=(e)=>{
    let task = e.parentElement.parentElement;
    textInput.value= task.children[0].innerHTML;
    dateInput.value = task.children[1].innerHTML;
    textarea.value = task.children[2].innerHTML;
}
const deleteTask=(e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1)
    localStorage.setItem("data",JSON.stringify(data));
};