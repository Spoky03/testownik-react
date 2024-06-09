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
const getQuestionSets = async () => {
    const response = await axios.get(`${baseUrl}/users/me`, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}
const deleteOneQuestion = async (id: string) => {
    const response = await axios.delete(`${baseUrl}/questions/${id}`, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}
const deleteOneQuestionSet = async (id: string) => {
    const response = await axios.delete(`${baseUrl}/sets/${id}`, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}
const saveProgress = async ({questionSetId, questions, time}: {questionSetId: string, questions: {id: string, repets: number | undefined}[], time: number}) => {
    console.log('saving progress')
    console.log({questionSetId, questions, time})
    const response = await axios.put(`${baseUrl}/users/save`, {questionSetId, questions, time}, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}

export default { getProfile, login, logout, setToken, createQuestionSet, createQuestion, getQuestionSets, deleteOneQuestion, deleteOneQuestionSet, saveProgress }