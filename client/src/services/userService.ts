import axios from "axios";
import { ChatMessage, CreatedQuestion, Question, ReportExplanation } from "../types";

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
const register = async (credentials: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${authUrl}/register`, credentials);
    return response.data;
  } catch (error) {
    return error;
  }
};
const saveSettings = async (settings: {
  agreements: boolean;
  newsletter: boolean;
}) => {
  const response = await axios.put(`${baseUrl}/users/settings`, settings, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const logout = () => {
  localStorage.removeItem("loggedUserToken");
  token = null;
};

const createQuestionSet = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  const response = await axios.post(
    `${baseUrl}/sets`,
    { name: name, description },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};
const editQuestion = async (question: CreatedQuestion, id: string) => {
  //change this too
  // const response = await axios.post<Question>(`${baseUrl}/sets/appendQuestion`, {question, id}, {headers: {Authorization: token}})
  const response = await axios.put<Question>(
    `${baseUrl}/questions/${id}`,
    question,
    { headers: { Authorization: token } }
  );
  return response.data;
};
const editQuestionImage = async (form: FormData, id: string) => {
  //change this too
  // const response = await axios.post<Question>(`${baseUrl}/sets/appendQuestion`, {question, id}, {headers: {Authorization: token}})
  const response = await axios.put<Question>(
    `${baseUrl}/questions/${id}/image`,
    form,
    { headers: { Authorization: token } }
  );
  return response.data;
};
const editQuestionSet = async ({
  name,
  description,
  id,
  metaData,
}: {
  name?: string;
  description?: string;
  metaData?: { tags?: string[]; date?: Date; subject?: string };
  id: string;
}) => {
  const response = await axios.put(
    `${baseUrl}/sets/${id}`,
    { name: name, description, metaData },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};
const createQuestions = async (
  questions: CreatedQuestion[],
  id: string
): Promise<Question> => {
  //change this too
  // const response = await axios.post<Question>(`${baseUrl}/sets/appendQuestion`, {question, id}, {headers: {Authorization: token}})
  const response = await axios.post<Question>(
    `${baseUrl}/questions`,
    { questions, id },
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
  sidebar: {
    correctAnswers: number;
    incorrectAnswers: number;
    totalQuestions: number;
    masteredQuestions: number;
    time: number;
  };
}) => {
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
  const response = await axios.post(
    `${baseUrl}/users/bookmarks`,
    { id },
    {
      headers: {
        Authorization: token,
      },
    }
  );
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
};
const switchPrivacy = async (id: string) => {
  const response = await axios.put(
    `${baseUrl}/sets/${id}/privacy`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};
const saveUserData = async (data: UserData) => {
  const response = await axios.put(`${baseUrl}/users/me`, data, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const deleteUser = async () => {
  const response = await axios.delete(`${baseUrl}/users/me`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const getGlobalStats = async (startDate?: Date, endDate?: Date) => {
  const response = await axios.get(`${baseUrl}/users/globalStats`, {
    params: {
      startDate: startDate,
      endDate: endDate,
    },
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const saveWeeklyTimeGoal = async (weeklyTimeGoal: number) => {
  const response = await axios.post(
    `${baseUrl}/users/weeklyTimeGoal`,
    { weeklyTimeGoal },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};
const getWeeklyTimeGoal = async () => {
  const response = await axios.get(`${baseUrl}/users/weeklyTimeGoal`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const getFinishedSets = async () => {
  const response = await axios.get(`${baseUrl}/users/finishedSets`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const saveFinishedSet = async (setId: string) => {
  const response = await axios.post(
    `${baseUrl}/users/finishedSets`,
    { setId },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};
// ------------------------------OPENAI SERVICE FUNCTIONS------------------------------
const getQuestionExplanation = async (questionId: string) => {
  const response = await axios.post(
    `${baseUrl}/openai/ask`,
    { questionId },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};
const createChatCompletion = async (questionId: string, messages: ChatMessage[]) => {
  const response = await axios.post(
    `${baseUrl}/openai/chat`,
    { questionId, messages: messages },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
}

// ------------------------------OTHER SERVICE FUNCTIONS------------------------------
//reportExplanation
const reportExplanation = async (data: ReportExplanation) => {
  const response = await axios.post(
    `${baseUrl}/other/reportExplanation`,
    data,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};
const voteDifficulty = async (questionId: string, value: number) => {
  const response = await axios.post(
    `${baseUrl}/questions/${questionId}/voteDifficulty`,
    { value },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};
interface UserData {
  username?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}
export default {
  getProfile,
  login,
  register,
  saveSettings,
  logout,
  setToken,
  createQuestionSet,
  createQuestions,
  editQuestionSet,
  editQuestion,
  editQuestionImage,
  getAllUserData,
  deleteOneQuestion,
  deleteOneQuestionSet,
  saveProgress,
  getProgress,
  resetProgress,
  addBookmark,
  deleteBookmark,
  getForeignSets,
  switchPrivacy,
  saveUserData,
  deleteUser,
  getGlobalStats,
  saveWeeklyTimeGoal,
  getWeeklyTimeGoal,
  getFinishedSets,
  saveFinishedSet,
  getQuestionExplanation,
  reportExplanation,
  voteDifficulty,
  createChatCompletion,
};
