import React, { useState } from "react";
import { Calendar, Popover, Space, Button } from "antd";
import type {Dayjs} from "dayjs";
import { Todo } from "../types";
import ModalEditTodo from "./ModalEditTodo";
import ModalAddTodo from "./ModalAddTodo";
import { PlusCircleOutlined, CheckCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";

interface CalendarDisplayInterface {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const statusToType : Record<string, string> = {
  "true": "success",
  "false": "error",
}

const CalendarDisplay = (props: CalendarDisplayInterface) => {
  const [selectedDay, setSelectedDay] = useState<Dayjs>();

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [status, setStatus] = useState<boolean>(false)
  const [isModalAddTodoOpen, setIsModalAddTodoOpen] = useState<boolean>(false);
  
  const [isModalEditTodoOpen, setIsModalEditTodoOpen] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("")
  const [editDescription, setEditDescription] = useState<string>("")
  const [editId, setEditID] = useState<string>("")
  const [editMonth, setEditMonth] = useState<number>(0)
  const [editStatus, setEditStatus] = useState<boolean>(false)
  const [editDay, setEditDay] = useState<number>(0)

  const showModalAddNewTodo = () => {
    setTitle("")
    setDescription("")
    setStatus(false)
    setIsModalAddTodoOpen(true);
  };

  const showModalEditTodo = (todo: Todo) => {  
    if (todo) {
      setEditTitle(todo.title)
      setEditDescription(todo.description)
      setEditMonth(todo.month)
      setEditStatus(todo.status)
      setEditDay(todo.day)
      setIsModalEditTodoOpen(true)
      setEditID(todo.id)
    } 
  }

  const getData = (value: Dayjs) => {
    const day = value.date()
    const month = value.month()
    
    const array = props.todos.filter((aTodo: Todo) => {
      if (aTodo.day === day && aTodo.month -1 == month) {
        return true
      } else {
        return false
      }
    })    
    return array
  }

  const dateCellRender = (value: Dayjs) => {    
    const data: Todo[] = getData(value);
    if (data.length > 0) {
      return (
        <div>
          <CheckCircleFilled style={{color: "green"}} />
          <ul className="events">
            {data.map((todo) => (
              <li key={todo.id} >
                <Space wrap>
                  <Popover placement="topLeft" title={todo.title} content={todo.description}>
                    <Button onClick={() => showModalEditTodo(todo)}>{todo.title}</Button>
                  </Popover>
                </Space>
              </li>
            ))}
          </ul>
          <PlusCircleOutlined onClick={showModalAddNewTodo}/>

        </div>
      );
    } else {
      return (
        <div>
          <ExclamationCircleFilled style={{color: "red"}}/>
          <p></p>
          <PlusCircleOutlined onClick={showModalAddNewTodo}/>
        </div>
      )
    }
    
  };  
  return (
    <div>
      <Calendar dateCellRender={dateCellRender} onSelect={(date: Dayjs) => setSelectedDay(date)} onChange={(date: Dayjs) => setSelectedDay(selectedDay)}/>
      <ModalAddTodo isModalAddTodoOpen={isModalAddTodoOpen} setIsModalAddTodoOpen={setIsModalAddTodoOpen} setTodos={props.setTodos} todos={props.todos} value={selectedDay} title={title} setTitle={setTitle} description={description} setDescription={setDescription} status={status} setStatus={setStatus} />
      <ModalEditTodo isModalEditTodoOpen={isModalEditTodoOpen} setIsModalEditOpen={setIsModalEditTodoOpen} todos={props.todos} setTodos={props.setTodos} editTitle={editTitle} editDescription={editDescription} editId={editId} editMonth={editMonth} editStatus={editStatus} setEditTitle={setEditTitle} setEditDescription={setEditDescription} setEditID={setEditID} setEditMonth={setEditMonth} setEditStatus={setEditStatus} editDay={editDay} setEditDay={setEditDay}/>
    </div>
  )
}

export default CalendarDisplay