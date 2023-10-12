import axios from "axios";

export const getSlackUsers = async (customer: Customer) => {
  const { data } = await axios.get(
    "https://api.notifications.codelitt.dev/api/users",
    {
      headers: {
        Authorization: customer.notificationsToken,
      },
    }
  );
  return data;
};
