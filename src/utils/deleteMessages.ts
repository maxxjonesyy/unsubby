import axios from "axios";
import renderAlert from "./renderAlert";
import getHeaders from "./getHeaders";

export default async function deleteMessages(
  messageIdArray: string[],
  token: string,
  userId: string
) {
  const headers = getHeaders(token);

  if (messageIdArray.length === 0) {
    renderAlert("error", "No messages to delete");
    console.error("error", "No messages to delete");
    return;
  }

  try {
    const response = await axios.post(
      `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/batchDelete`,
      { ids: messageIdArray },
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    renderAlert("error", `Error deleting messages: ${error}`);
    console.error("error", `Error deleting messages: ${error}`);
  }
}
