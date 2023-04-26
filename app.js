let creat = document.querySelector(".create");
let btn = document.querySelector(".btn");
let todos = document.querySelector(".todos");


let todoApp = () => {
    btn.addEventListener("click", (e) => {
    e.preventDefault();

  let todo = document.createElement("div");
        todo.classList.add("td");
        todo.draggable = true;
  todo.innerHTML = `
    <input  value="${creat.value}" type="text" class="todo" readonly>
    <input type="button" value="Delet" class="delet">
  `;

  todos.appendChild(todo);

  // clear the input field
    creat.value = '';
    




  
    let dlt = document.querySelectorAll(".delet");
    


    dlt.forEach(dt => {
        
        dt.addEventListener("click", () => {
            dt.parentNode.remove();
        })
    })

kanban();

});
}





function kanban() {
  let drag = document.querySelectorAll(".td");
  let place = document.querySelector(".done");

  drag.forEach(dg => {
    dg.addEventListener("dragstart", (event) => {
        
        
        dg.classList.add("dragged");
      
    });
    dg.addEventListener("dragend", (event) => {
        
        dg.classList.remove("dragged");
      
    });
  });
    
    
    
    place.addEventListener("dragover", (event) => {
        event.preventDefault();
        let dragged = document.querySelector(".dragged");
        place.append(dragged);
    })
    
}

todoApp();

