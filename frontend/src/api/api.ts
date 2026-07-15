import axios from "axios";

const api = axios.create({
  baseURL: "https://researchgenie.onrender.com/api/v1",
});

export default api;