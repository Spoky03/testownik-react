import { Question } from '../types'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/Questions'
const getAll = async () => {
    const response = await axios.get<Question[]>(baseUrl)
    return response.data
}

export default { getAll }