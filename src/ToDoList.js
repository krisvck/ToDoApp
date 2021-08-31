import React from 'react'
import ToDo from './ToDo'

export default function ToDoList({todos, toggleTodo}) {
    return (
        //return our ToDos
        todos.map(todo => {
            return <ToDo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
        })
    )
}
