import axios from 'axios';

const url = '/api/persons';

const getAll = () => axios.get(url).then(res => res.data);

const create = newObject => axios.post(url, newObject).then(res => res.data);

const put = (id, newObject) => axios.put(`${url}/${id}`, newObject).then(res => res.data);

const remove = id => axios.delete(`${url}/${id}`).then(res => res);

export default {
  getAll, create, put, remove,
};
