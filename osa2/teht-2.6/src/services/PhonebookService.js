import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () => axios.get(url).then(res => res.data)

const create = newObject => axios.post(url, newObject).then(res => res.data)

const patch = (id, newObject) => axios.patch(`${url}/${id}`, newObject).then(res => res.data)

const remove = id => axios.delete(`${url}/${id}`).then(res => res)

export default { getAll, create, patch, remove }