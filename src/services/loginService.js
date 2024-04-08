import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    console.log("response:", response.resposne)
    return { status: response.status, data: response.data }
}

export default { login }