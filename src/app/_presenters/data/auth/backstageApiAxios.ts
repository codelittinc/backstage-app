import axios from "axios";
import qs from "qs";

import { useAppStore } from "../store/store";

export const backstageApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

backstageApiClient.defaults.paramsSerializer = (p) => {
  return qs.stringify(p, { arrayFormat: "brackets" });
};

backstageApiClient.interceptors.request.use((config) => {
  const { sessionUser } = useAppStore.getState();

  if (!sessionUser) {
    throw new Error("Session user not found. Aborting request.");
  }

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
