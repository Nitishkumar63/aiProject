import axios from "axios";

const API = axios.create({
  baseURL: "https://aiproject-8jxx.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

export const askAI = (prompt) => API.post("/ask-ai", { prompt });
export const saveChat = (data) => API.post("/save", data);