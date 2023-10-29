import React, { useEffect, useState } from "react";
import "./Todo.css";
let nexID = 0;
function Todo() {
  const [task, setTask] = useState("");
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    const data = window.localStorage.getItem("todos");
    if (data) {
      setAllTodos(JSON.parse(data));
    }
  }, []);

  // Load todos from localStorage when the component mounts

  const handleClick = () => {

    if(!task){
      alert("please fill the form")
    }else{
      setAllTodos((prevTodos) => {
        const newTodos = [
          ...prevTodos,
          {
            id: nexID++,
            title: task,
            completed: false,
            edited: false,
          },
        ];
        // Save updated todos to localStorage
        window.localStorage.setItem("todos", JSON.stringify(newTodos));
        return newTodos;
      });
      setTask("");
    }
    
   
   
  };

  const handleDelete = (id) => {
    const updatedTodos = allTodos.filter((todo) => todo.id !== id);
    setAllTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleCompleted = (id) => {
    const newTodo = [...allTodos];
    newTodo[id].completed = !newTodo[id].completed;
    setAllTodos(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };

  const handleEdit = (id) => {
    const newTodo = [...allTodos];
    newTodo[id].edited = !newTodo[id].edited;
    setAllTodos(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };
  const handleEditChange = (id, newvalue) => {
    const newTodo = [...allTodos];
    newTodo[id].title = newvalue;
    setAllTodos(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };
  const handleUpdate = (id) => {
    const newTodo = [...allTodos];
    newTodo[id].edited = !newTodo[id].edited;

    setAllTodos(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "white", width: "100vw", height: "100vh" }}
    >
      <div className=" w-50 contain" style={{ height: "80%" }}>
        <div
          className=" w-100  d-flex justify-content-center align-items-center tdo"
          style={{ height: "4rem", backgroundColor: " #b43757" }}
        >
          <h3 className="fw-bolder text-light">Todolist</h3>
        </div>
        <div
          className="w-100 mt-4   d-flex justify-content-center  main"
          style={{
            height: "80%",
            backgroundColor: "#AEAEAE",
            overflowY: "scroll",
          }}
        >
          <div className=" w-75 mt-3">
            <div className="mt-3 headd">
              <input
                type="text"
                value={task}
                className="me-3 shadow-lg px-5 py-2 w-75 "
                autoFocus
                placeholder="Enter Your Task"
                onChange={(e) => {
                  setTask(e.target.value);
                }}
              />
              <button
              
                onClick={handleClick}
                className="btn shadow-lg text-light fw-bolder "
                style={{
                  backgroundColor: " #b43757",
                }}
              >
                {" "}
                Add task
              </button>
            </div>

            <div>
              {allTodos.map((item, index) => {
                return (
                  <div
                    className=" mt-4 py-2 rounded shadow-lg bg-light d-flex justify-content-around w-100 todo-list"
                    key={index}
                  >
                    {item.edited ? (
                      <>
                        <input
                          type="text"
                          className=" py-1 px-5"
                          value={item.title}
                          onChange={(e) => {
                            handleEditChange(index, e.target.value);
                          }}
                        />

                        <button
                          className="btn shadow-lg text-light fw-bolder py-2 "
                          style={{
                            backgroundColor: " #b43757",
                          }}
                          onClick={() => {
                            handleUpdate(index);
                          }}
                        >
                          Update
                        </button>
                      </>
                    ) : (
                      <>
                        <h5
                          className=" d-inline titel  w-75"
                          style={{
                            textDecoration: item.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {item.title}
                        </h5>
                        <div className="d-inline  icons ">
                          {item.completed ? (
                            <i
                              class="fa-solid fa-square-xmark fs-5"
                              style={{ color: "#b43757" }}
                              onClick={() => {
                                handleCompleted(index);
                              }}
                            ></i>
                          ) : (
                            <i
                              class="fa-solid fa-square-check  fs-5 "
                              style={{ color: "#b43757" }}
                              onClick={() => {
                                handleCompleted(index);
                              }}
                            ></i>
                          )}
{item.completed ? (
    <i
      className="fa-solid fa-trash fs-5 ms-2"
      style={{ color: " #957c82", cursor: "not-allowed" }}
    ></i>
  ) : (
    <i
      className="fa-solid fa-trash fs-5 ms-2"
      style={{ color: "#b43757" }}
      onClick={() => {
        handleDelete(item.id);
      }}
    ></i>
  )}
  {
    item.completed?(
      
      <i
      class="fa-solid fa-pen-to-square fs-5 ms-2"
      style={{ color: " #957c82",cursor:'not-allowed' }}
    
    ></i>
    ):(
      <i
      class="fa-solid fa-pen-to-square fs-5 ms-2"
      style={{ color: "#b43757" }}
      onClick={() => {
        handleEdit(index);
      }}
    ></i>
    )
  }
                        
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
