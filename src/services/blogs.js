import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null    // the authentication token

const setToken = (newToken) => {
  token = 'Bearer ' + newToken
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = axios.post(baseUrl, newBlog, config)
  return { status: response.status, data: response.data }
}

const update = async (id, updateObj) => {
  const response = axios.put(baseUrl + "/" + id, updateObj)
  return { status: response.status, data: response.data }
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(baseUrl + "/" + id, config);

  return { status: response.status, data: response.data }
}

export default { getAll }