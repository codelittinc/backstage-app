import axios from "axios";
import { useAppStore } from "../store/store";

export const backstageApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

backstageApiClient.interceptors.request.use((config) => {
  const { sessionUser } = useAppStore.getState();

  try {
    const authorizationData = {
      user: {
        google_id: sessionUser!.google_id,
        email: sessionUser!.email,
        first_name: sessionUser!.name?.split(" ")[0],
        last_name: sessionUser!.name?.split(" ")[1],
        image_url: sessionUser!.image,
      },
    };
    const authorizationDataJson = JSON.stringify(authorizationData);
    const authorization = btoa(authorizationDataJson);

    config.headers["Authorization"] = `Bearer ${authorization}`;
  } catch (e) {
    console.log(e, config);
  }

  return config;
});
