import axios from "axios";
import endpoints from "../data/endpoints.json";
import formatLink from "./formatLink.ts";
import renderAlert from "./renderAlert";
import getHeaders from "./getHeaders.ts";

import { MessageObjectType } from "../types/types";

async function fetchMessageIDs(token: string) {
  const MAX_RESULTS = 5;
  const QUERY_STRING = "Unsubscribe";

  const headers = getHeaders(token);

  const params = {
    maxResults: MAX_RESULTS,
    q: QUERY_STRING,
  };

  try {
    const response = await axios.get(endpoints.messages, { headers, params });

    if (response.status === 200 && response.data.messages) {
      const { messages } = response.data;
      return messages.map((message: { id: string }) => message.id);
    }
  } catch (error) {
    renderAlert("error", `There was an error fetching message ids: ${error}`);
    console.error("error", `There was an error fetching message ids: ${error}`);
  }
}

async function fetchMessages(token: string) {
  const messageIdArray = await fetchMessageIDs(token);

  const headers = getHeaders(token);

  if (messageIdArray.length === 0) {
    renderAlert("error", "No messages found");
    console.error("error", "No messages found");
    return [];
  }

  const messagePromises = messageIdArray.map(async (messageId: string) => {
    try {
      const response = await axios.get(endpoints.messages + messageId, {
        headers,
      });

      if (response.status === 200 && response.data) {
        const { payload, id } = response.data;
        const { headers } = payload;

        const tempObject: MessageObjectType = { id: id };

        headers.find((item: { name: string; value: string }) => {
          if (item.name === "From") {
            tempObject.name = item.value;
          } else if (item.name === "List-Unsubscribe") {
            const cleanLink = formatLink(item.value);

            tempObject.webUrl = cleanLink?.https[0];
          }
        });

        return tempObject;
      }
    } catch (error) {
      renderAlert("error", `There was an error fetching messages: ${error}`);
      console.error("error", `There was an error fetching messages: ${error}`);
    }
  });

  const exists: Set<string> = new Set();

  const messageArray = (await Promise.all(messagePromises)).filter((item) => {
    if (!exists.has(item.name) && item.webUrl && item !== undefined) {
      exists.add(item.name);
      return item;
    }
  });

  return messageArray;
}

export default fetchMessages;
