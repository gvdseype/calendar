import express from 'express';
import todosService from '../services/todosService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(todosService.getEntries());
});

router.post('/', (req, res) => {
  const {month, day, title, description, status} = req.body;
  
  const newTodo = todosService.addTodo(
    Number(month),
    Number(day),
    title,
    description,
    status
  );
  res.json(newTodo)
});

router.put('/', (req, res) => {
  const {id, month, day, title, description, status} = req.body;

  const changedTodo = todosService.changeTodo(
    id,
    Number(month),
    Number(day),
    title,
    description,
    status
  )
  res.json(changedTodo)
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const deletedTodo = todosService.deleteTodo(id)
  res.json(deletedTodo)
})

export default router;