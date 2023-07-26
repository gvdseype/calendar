import TodoEntry from '../types/TodoEntry';
const { v4: uuidv4 } = require('uuid');
const todosData : TodoEntry[] = [];


const getEntries = ():TodoEntry[]  => {
  return todosData
};

const addTodo = (month: number, day: number, title: string, description: string, status: boolean): TodoEntry => {
  const newTodoEntry = {
    id: uuidv4(),
    month,
    day,
    title,
    description, 
    status
  }
  todosData.push(newTodoEntry);
  return newTodoEntry;
}

const changeTodo = (id: string, month: number, day: number, title: string, description: string, status: boolean): TodoEntry => {
  let newTodo: TodoEntry = {id: id, month: month, day: day, title: title, description: description, status: status}
  const array : TodoEntry[] = todosData;
  
  for (let i=0; i < todosData.length; i += 1) {
    let currentTodo: TodoEntry = todosData[i]
    if (currentTodo.id == id) {
      array.splice(i, 1, newTodo)
      break
    }
  }
  return newTodo
}

const deleteTodo = (id: string) => {
  let array : TodoEntry[] = todosData;
  let  deletedTodo: TodoEntry | unknown;
  
  for (let index = 0; index < array.length; index++) {
    let currentTodo: TodoEntry = array[index]
    if (currentTodo.id == id) {
      deletedTodo = currentTodo;
      array.splice(index, 1)
      break
    }
  }  
  return deletedTodo;
}

export default {
  getEntries,
  addTodo,
  changeTodo,
  deleteTodo
}