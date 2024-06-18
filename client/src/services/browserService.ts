import { QuestionSet } from "../types";
import axios from "axios";

const baseUrl = "/api";
let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
}

const getAllSets = async () => {
  const response = await axios.get<QuestionSet[]>(`${baseUrl}/sets`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
const switchLike = async (id: string) => {
  const response = await axios.post(
    `${baseUrl}/sets/${id}/like`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

export default { setToken, getAllSets, switchLike };
