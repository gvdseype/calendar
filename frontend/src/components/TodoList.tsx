import {useState} from "react"
import { Todo } from "../types";
import TodoHolder from "./TodoHolder"

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  month: number
}

const TodoList = (props: TodoListProps)  => {  
  return (
    <div>{props.todos.map((aTodo: Todo) => <ul key={aTodo.id}><TodoHolder todo={aTodo} setTodos={props.setTodos} todos={props.todos}/></ul>)}</div>
  )
};

export default TodoList