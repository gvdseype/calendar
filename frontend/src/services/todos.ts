import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/todos'

const getAll = async () => {
  fetch(baseUrl)
  .then(response => response.json)
  .then(res => res)
  .catch(err => console.log(err))
}

export {getAll}