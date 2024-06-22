import { Question } from '../types'
import axios from 'axios'

const baseUrl = '/api/questions'

const getAll = async () => {
    const response = await axios.get<Question[]>(baseUrl)
    return response.data
}



export default { getAll }