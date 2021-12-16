import axios from "axios"
const baseURL = "/api/blogs"

var token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const create = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseURL, blogObject, config)

  return response.data
}

const update = async (id, blogObject) => {
  const response = await axios.put(`${baseURL}/${id}`, blogObject)

  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseURL}/${id}`, config)

  return response.data
}

const defaultExport = { create, remove, getAll, setToken, update }

export default defaultExport
