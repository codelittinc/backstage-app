import axios from "axios";

export const getChannels = async (customer: Customer) => {
  const { data } = await axios.get(
    "https://api.notifications.codelitt.dev/api/channels",
    {
      headers: {
        Authorization: customer.notificationsToken,
      },
    }
  );
  return data;
};
