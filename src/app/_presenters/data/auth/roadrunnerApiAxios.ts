import axios from "axios";

export const roadrunnerApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ROADRUNNER_API_URL,
});
