import React from "react"
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Todo } from "../types";
import CalendarDisplay from "./CalendarDisplay";

interface MonthProps {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const numberToMonth : Record<string, string> = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "10": "October",
  "11": "November",
  "12": "December",
}

const Month = (props: MonthProps) => {
  const leftHandle: React.MouseEventHandler<HTMLDivElement> = (event): void => {
    event.preventDefault();
    props.setMonth(props.month - 1)
    const thisYear = new Date().getFullYear()
  }

  const rightHandle: React.MouseEventHandler<HTMLDivElement> = (event): void => {
    event.preventDefault();
    props.setMonth(props.month + 1)
    const thisYear = new Date().getFullYear()
  }
  
  return (
    <div>
      <LeftCircleOutlined onClick={leftHandle}/>
      <div>{numberToMonth[props.month]}</div>
      <RightCircleOutlined onClick={rightHandle}/>
      <CalendarDisplay todos={props.todos} setTodos={props.setTodos}/>
    </div>
    
  )
}

export default Month