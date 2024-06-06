import axios from 'axios'
import { Question } from '../types'

const authUrl = '/auth'
const baseUrl = '/api'
let token : string | null = null

const setToken = (newToken:string) => {
    localStorage.setItem('loggedUserToken', newToken)
  token = `Bearer ${newToken}`
}

const getProfile = async () => {
    const response = await axios.get(`${authUrl}/profile`, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}
const login = async (credentials: {username: string, password: string}) => {
    try {
        const response = await axios.post(`${authUrl}/login`, credentials)
        return response.data
    } catch (error) {
        return error
    }
}
const logout = () => {
    localStorage.removeItem('loggedUserToken')
    token = null
}

const createQuestionSet = async (questionSetName: string) => {
    const response = await axios.post(`${baseUrl}/sets`, {name: questionSetName}, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}
const createQuestion = async (question: Question, id: string) => {
    //change this too
    // const response = await axios.post<Question>(`${baseUrl}/sets/appendQuestion`, {question, id}, {headers: {Authorization: token}})
    const response = await axios.post<Question>(`${baseUrl}/questions`, {question, id}, {headers: {Authorization: token}})
    return response.data
}

export default { getProfile, login, logout, setToken, createQuestionSet, createQuestion}