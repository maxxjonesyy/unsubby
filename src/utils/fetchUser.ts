import axios from "axios";
import endpoints from "../data/endpoints.json";

export default async function fetchUser(token: string) {
  if (!token) {
    console.error("No token found");
    return;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(endpoints.userInfo, { headers });

    if (response.status === 200 && response.data) {
      const { sub, name, picture } = response.data;
      const userData = {
        id: sub,
        name,
        image: picture,
      };

      return userData;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }

  return;
}
