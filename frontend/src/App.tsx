import {useEffect, useState} from 'react';
import './App.css';
import { Todo } from './types';
import axios from 'axios';
import Month from './components/Month';

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [month, setMonth] = useState<number>(1)

  useEffect(() => {
    const getData = async () => {
      axios.get('http://localhost:3001/api/todos')
      .then(response => {
        const thisMonth = new Date().getMonth();
        const thisYear = new Date().getFullYear();
        setMonth(thisMonth + 1)
        setTodos(response.data.filter((aTodo: Todo) => aTodo.month == month))
      })
    }
    getData()
    
  }, [])
  
  return (
    <div >
      <Month month={month} setMonth={setMonth} todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
