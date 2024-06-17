import { Question } from '../types'
import axios from 'axios'

const baseUrl = '/api/questions'
const authUrl = '/auth'

let token : string | null = null

const setToken = (newToken:string) => {
    localStorage.setItem('loggedUserToken', newToken)
  token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get<Question[]>(baseUrl)
    return response.data
}



export default { getAll, setToken}