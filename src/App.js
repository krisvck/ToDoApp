// import logo from './logo.svg';
// import './App.css';

//We want to store all of our ToDos inside of a state and render all those
//Useref hook alloes us to reference elements inside our HTML
//useEffect and store our inputs locally
import React, { useState, useRef, useEffect } from 'react';
import ToDoList from './ToDoList';
import { v4 as uuidv4 } from 'uuid';
import { serialize } from 'uri-js';
import './style.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {
  /*
  return an empty array if there are no ToDos
  todos stands for all the elements inside our list
  setTodos is the method we are going to use to update our list
  const [todos, setTodos] = useState(['Todo 1', 'Todo 2']) --> <ToDoList todos={todos}/>
  This passes the todos variable to todos
  const [todos, setTodos] = useState([{
    id: 1,
    name: 'Todo 1',
    complete: false
  }])
*/
const [todos, setTodos] = useState([])
const todoNameRef = useRef()

//storing our ToDos
useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
}, [])

//getting our Todos
useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos])

function toggleTodo(id) {
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}

function handleAddToDo(e) {
    const name = todoNameRef.current.value
    if (name === '') return 
    //console.log(name)
    setTodos(prevTodos => {
      const { v4: uuidv4 } = require('uuid');
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    //clear the input after entering something
    todoNameRef.current.value = null
}

function handleClearTodos() {
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)

}

  return (
    //We want to return our ToDo List
    //Create a component called ToDoList and we're going to return that
    //as our first element inside our application.
    //Component means a file that is being inlcuded in here
    //<> We can return our 2 things by using this wrapping it in a empty element
    <>
      <div>
      <h1>Enter your ToDos below:</h1>
      </div>
      <ToDoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type = "text" />
      <button onClick={handleAddToDo}>Add ToDo</button>
      <button onClick={handleClearTodos}>Clear</button>
      <div>{todos.filter(todo => !todo.complete).length} Left ToDos</div>
    </>
  )
}

export default App;
