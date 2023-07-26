import {useState} from "react"
import { Todo } from "../types";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

interface TodoProps {
  todos: Todo[];
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  // month: number
}


const TodoHolder = (props: TodoProps)  => {
  console.log(props.todo);
  const [formVisible, setFormVisible] = useState<boolean>(false)

  const toggleForm = (): void => {
    setFormVisible(!formVisible)    
  }

  const handleDelete: React.MouseEventHandler<HTMLDivElement> = (event): void => {
    event.preventDefault();
    axios.delete(`http://localhost:3001/api/todos/${props.todo.id}`)
    .then(res => {
      console.log('from handle submit', res.data);
      props.setTodos(props.todos.filter((aTodo: Todo) => aTodo.id !== props.todo.id))
    })
  }
  
  if (formVisible) {
    return (
      <div>
        <div id={props.todo.id} onClick={toggleForm}>{props.todo.title}</div>
      </div>
    )
  } else {
    return (
      <div>
        <div id={props.todo.id} onClick={toggleForm}>{props.todo.title}</div>
        <DeleteOutlined onClick={handleDelete}/>
      </div>
    )
  }
  
};

export default TodoHolder