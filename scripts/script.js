window.addEventListener('load', function (e) {
    //lists to keep track of todos

    if (localStorage.getItem('todo_list')) {
        todoList = JSON.parse(localStorage.getItem('todo_list'))
    }
    else {
        todoList = []
    };
    if (localStorage.getItem('deleted_todos')) {
        deletedTodos = JSON.parse(localStorage.getItem('deleted_todos'))
    }
    else {
        deletedTodos = []
    };
    if (localStorage.getItem('done_todos')) {
        doneTodos = JSON.parse(localStorage.getItem('done_todos'))

    }
    else {
        doneTodos = []
    };
    // console.log(todoList);
    ///////////////////////////IMPLEMENTATION OF CREATE TODO FUNCTION////////////////

    // function for creating a todo 
    function createTodo(inputText) {
        // create a todo 
        let todo = document.createElement("div");
        todo.className = "todos";


        // create a text for todo
        let todoText = document.createElement('div');
        todoText.className = "todoText";
        todoText.innerHTML = inputText;

        //////////////////////////IMPLEMENTATION OF THE DELETE BUTTON///////////////
        //create a deleteButton for todo
        let deleteButton = document.createElement("button");
        // add className to the deleteButton
        deleteButton.className = "deleteTodo";
        //add event listener for the deleteButton
        deleteButton.addEventListener("click", function (e) {

            // if the target matches as button then remove the parent node
            if (e.target && e.target.nodeName.toLowerCase() == "button") {

                //push the text of the todo into the deletedTodos array
                console.log(e.target.parentElement.firstChild.innerHTML);
                deletedTodos.push(e.target.parentElement.firstChild.innerHTML);
                todoList.splice(todoList.indexOf(e.target.parentElement.firstChild.innerHTML), 1);
                console.log(todoList);
                if (todoList.length == 0) {
                    localStorage.setItem('todo_list', []);
                } else {
                    localStorage.setItem('todo_list', JSON.stringify(todoList));
                }

                if (deletedTodos.length == 0) {
                    localStorage.setItem('deleted_todos', []);
                } else {
                    localStorage.setItem('deleted_todos', JSON.stringify(deletedTodos));
                }
                //remove the parent element
                e.target.parentElement.remove();
                //show the deleted todo text in the console.
                // console.log("deleted : ")
                // console.log(e.target.parentElement);
                // console.log('deleted todos ')
                // console.log(deletedTodos);
            }
        });
        ///////////////////////////IMPLEMENTATION OF DONE BUTTON//////////////////////////////////////////////

        // create a doneButton for todo
        let doneTodoButton = document.createElement("button");
        // add class name to the doneTodoButton
        doneTodoButton.className = "doneTodo";
        //add event listener to the doneTodoButton
        doneTodoButton.addEventListener('click', function (e) {

            // console.log('checked : ');
            // console.log(e.target.parentElement.firstChild.innerHTML);

            // push the text of the doneTodos to the array
            doneTodos.push(e.target.parentElement.firstChild.innerHTML);

            todoList.splice(todoList.indexOf(e.target.parentElement.firstChild.innerHTML), 1);
            console.log(todoList);
            if (todoList.length == 0) {
                localStorage.setItem('todo_list', []);
            } else {
                localStorage.setItem('todo_list', JSON.stringify(todoList));
            }


            localStorage.setItem('done_todos', JSON.stringify(doneTodos));

            //remove the parent element
            e.target.parentElement.remove();
            console.log(doneTodos);
        });


        /////////////////APPEND THE TODO TEXT, DELETEBUTTON AND DONEBUTTON INTO THE TODO AND RETURN////////////////////////

        //append the todoText , delte button and donebutton to the todo
        todo.appendChild(todoText);
        todo.appendChild(deleteButton);
        todo.appendChild(doneTodoButton);

        return todo;
    }

    //function for inserting todo 
    function insertTodo(todo, destId = 'todo') {
        //get the todo block and insert the todo to the top of the list
        let todoBlock = document.getElementById(destId);
        if (todoBlock != null) {

            localStorage.setItem('todo_list', JSON.stringify(todoList));

            todoBlock.insertBefore(todo, todoBlock.firstChild);
            console.log(todo);

            //set the value of input field ""
            document.getElementById('inputText').value = "";

            console.log(todoList);

        } else {
            todoBlock.appendChild(todo);
            console.log(todo);
        }

    }


    todoList.map(item => {
        let todo = createTodo(item);
        insertTodo(todo);
    });


    document.getElementById('inputText').addEventListener('keypress', function (e) {
        if (e.key == 'Enter') {
            document.querySelector('.addButton').click();
        }
    });



    // adding event listener for the addButton 

    document.querySelector('.addButton').addEventListener('click', function () {


        let inputText = document.getElementById('inputText').value;
        if (inputText != "") {

            //push the todo into the todoList
            todoList.push(inputText);
            console.log("pushed " + inputText);

            //create a todo
            todo = createTodo(inputText);
            console.log(todoList);

            //insert todo into the todoblock        
            insertTodo(todo);



        } else {
            alert("Enter the valid string")
        }
    });

    document.getElementById('checked').addEventListener("click", function (e) {
        
        let checkedDiv = document.getElementById('checked');
        if(e.target == checkedDiv || e.target == document.getElementById('para')){
             checkedDiv.style.width = "1197px";
            checkedDiv.style.height = "450px";
            checkedDiv.style.left = "60px";
            let closeButton = document.createElement('div');
            closeButton.className = 'closeButton';
            closeButton.innerHTML = "X";
            closeButton.addEventListener('click', function(e){
                location.reload();
            });
            checkedDiv.appendChild(closeButton);
            document.getElementById('para').style.display = "none";
            
            doneBlock = document.createElement('div');
            doneBlock.className = "doneBlock";
            doneBlock.style.marginTop = '20px';
            doneBlock.style.display = "flex";
            doneBlock.style.flexDirection = 'column';
            doneBlock.style.justifyContent = 'center';
            doneBlock.style.alignItems = "center";
            doneBlock.style.gap = "25px";
            doneBlock.style.overFlow = "scroll";
            checkedDiv.append(doneBlock);
            

            let todos = null;

            doneTodos.map(item =>{

                 // create a todo 
                let todo = document.createElement("div");
                todo.className = "todos insideTodoBlock";
                todo.style.width= "75%";
                todo.style.marginLeft = "0px auto";

                // create a text for todo
                let todoText = document.createElement('div');
                todoText.className = "todoText";
                todoText.innerHTML = item;
                todoText.style.textAlign = 'center';

                todo.appendChild(todoText);


                doneBlock.insertBefore(todo, doneBlock.firstChild);
                console.log(todo);
                });

          
            }

        });

    




})





