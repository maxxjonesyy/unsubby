import axios from "axios";
import { batchDelete } from "../data/endpoints.json";
import renderAlert from "./renderAlert";
import getHeaders from "./getHeaders";

export default async function deleteMessages(
  messageIdArray: string[],
  token: string
) {
  const headers = getHeaders(token);

  if (messageIdArray.length === 0) {
    renderAlert("error", "No messages to delete");
    console.error("error", "No messages to delete");
    return;
  }

  try {
    const response = await axios.post(
      batchDelete,
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
