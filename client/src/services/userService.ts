import axios from "axios";
import { CreatedQuestion, Question } from "../types";

const authUrl = "/auth";
const baseUrl = "/api";
let token: string | null = null;

const setToken = (newToken: string) => {
  localStorage.setItem("loggedUserToken", newToken);
  token = `Bearer ${newToken}`;
};

const getProfile = async () => {
  const response = await axios.get(`${authUrl}/profile`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const login = async (credentials: { username: string; password: string }) => {
  try {
    const response = await axios.post(`${authUrl}/login`, credentials);
    return response.data;
  } catch (error) {
    return error;
  }
};
const logout = () => {
  localStorage.removeItem("loggedUserToken");
  token = null;
};

const createQuestionSet = async (questionSetName: string) => {
  const response = await axios.post(
    `${baseUrl}/sets`,
    { name: questionSetName },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};
const createQuestion = async (question: CreatedQuestion, id: string) => {
  //change this too
  // const response = await axios.post<Question>(`${baseUrl}/sets/appendQuestion`, {question, id}, {headers: {Authorization: token}})
  const response = await axios.post<Question>(
    `${baseUrl}/questions`,
    { question, id },
    { headers: { Authorization: token } }
  );
  return response.data;
};
const editQuestion = async (question: CreatedQuestion, id: string) => {
  //change this too
  // const response = await axios.post<Question>(`${baseUrl}/sets/appendQuestion`, {question, id}, {headers: {Authorization: token}})
  const response = await axios.put<Question>(
    `${baseUrl}/questions/${id}`,
     question ,
    { headers: { Authorization: token } }
  );
  return response.data;
};
const getAllUserData = async () => {
  const response = await axios.get(`${baseUrl}/users/me`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const deleteOneQuestion = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/questions/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const deleteOneQuestionSet = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/sets/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const saveProgress = async ({
  questionSetId,
  questions,
  sidebar,
}: {
  questionSetId: string;
  questions: { id: string; repeats: number | undefined }[];
  sidebar: { correctAnswers: number; incorrectAnswers: number; totalQuestions: number; masteredQuestions: number; time: number };
}) => {
  console.log("saving progress");
  console.log({ questionSetId, questions, sidebar });
  const response = await axios.put(
    `${baseUrl}/users/progress`,
    { questionSetId, questions, sidebar },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};
const getProgress = async () => {
  const response = await axios.get(`${baseUrl}/users/progress/`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const resetProgress = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/users/progress/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const addBookmark = async (id?: string) => {
  const response = await axios.post(`${baseUrl}/users/bookmarks`, {id}, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const deleteBookmark = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/users/bookmarks/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const getForeignSets = async () => {
  const response = await axios.get(`${baseUrl}/users/foreign`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
}

export default {
  getProfile,
  login,
  logout,
  setToken,
  createQuestionSet,
  createQuestion,
  editQuestion,
  getAllUserData,
  deleteOneQuestion,
  deleteOneQuestionSet,
  saveProgress,
  getProgress,
  resetProgress,
  addBookmark,
  deleteBookmark,
  getForeignSets,
};
