import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons/'

const getAll = () => {
    const persons = axios.get(baseUrl)
    return persons.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response)
}

const update = (index, updatedObject) => {
    const request = axios.put(baseUrl + index, updatedObject)
    return request.then(response => response)
}

const remove = (id) => {
    const request = axios.delete(baseUrl + id)
    return request.then(response => response)
}

export default { getAll, create, update, remove }