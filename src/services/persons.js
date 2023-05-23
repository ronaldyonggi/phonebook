import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newPersonObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newPersonObject)
  return request.then(response => response.data)
}

const create = newPersonObject => {
  const request = axios.post(baseUrl, newPersonObject)
  return request.then(response => response.data)
}

export default {getAll, deletePerson, update, create}