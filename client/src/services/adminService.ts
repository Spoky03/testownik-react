import axios from "axios";

const baseUrl = "/api";
let token: string | null = null;

const setToken = (newToken: string) => {
  localStorage.setItem("loggedUserToken", newToken);
  token = `Bearer ${newToken}`;
};

const fetchAllUsers = async () => {
    const res = await axios.get(`${baseUrl}/users`, {
        headers: {
        Authorization: token,
        },
    });
    return res.data;
    };

export default { setToken, fetchAllUsers };