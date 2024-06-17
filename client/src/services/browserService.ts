import { QuestionSet } from "../types";
import axios from "axios";
import token from "./userService";
const baseUrl = "/api";
const authUrl = "/auth";

const getAllSets = async () => {
  const response = await axios.get<QuestionSet[]>(`${baseUrl}/sets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default { getAllSets};
