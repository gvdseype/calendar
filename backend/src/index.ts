import express from 'express';
import todosRouter from './routes/todos';

const app = express();
app.use(express.json());
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))


const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/todos', todosRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});