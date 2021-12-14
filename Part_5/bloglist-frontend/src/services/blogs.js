import axios from "axios"
const baseURL = "/api/blogs"

var token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const create = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseURL, blogObject, config)
  
  return response.data
}

const defaultExport = { getAll, create, setToken }

export default defaultExport
