import axios from "axios"


const baseURL = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = (personObject) => {
    const request = axios.post(baseURL, personObject)
    return request.then(response => response.data)
}

const update = (id, personObject) => {
    const request = axios.put(`${baseURL}/${id}`, personObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response)
}

const personService = { getAll, create, remove, update }

export default personService