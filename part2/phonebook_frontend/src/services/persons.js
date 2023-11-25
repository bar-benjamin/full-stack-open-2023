import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (personObject) => {
  const response = await axios.post(baseUrl, personObject)
  return response.data
}

const update = async (id, personObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, personObject)
  return response.data
}

const deletePerson = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

export default { 
    getAll,
    create,
    update,
    deletePerson
}