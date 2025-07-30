//1. Create a new element using createElement function 
//2. insert require data either by using .innerText or innerHtml
//3. insert new element in parent container using appendChild or append

let todos =[
    {
        id: 1,
        title: "study at 9pm"
    },
    {
        id: 2,
        title: "walk at 10pm"
    },
    {
        id: 3,
        title: "sleep at 11pm"
    }
]
let todoContainer = document.querySelector(".todoContainer");
function addTodo(todo){
    let li = document.createElement("li");
    li.innerHTML = `<div>
                <input type="checkbox" name="" id="">
                <h1>${todo.title}</h1>
            <div>
            <button>❌</button>
            <button>✏️</button>
            </div>
            </div>`;
    todoContainer.appendChild(li);        
}

function showAllTodos(todos){
    todos.forEach(todo => {
        addTodo(todo);
    });
}
showAllTodos(todos);