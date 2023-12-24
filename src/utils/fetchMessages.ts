import axios, { AxiosResponse } from "axios";
import endpoints from "../data/endpoints.json";
import checkUnsubUrl from "./checkUnsubUrl";
import renderAlert from "./renderAlert";

import { MessageObjectType } from "../types/types";

interface Message {
  id: string;
}

interface MessageHeader {
  name: string;
  value: string;
}

async function getMessage(
  id: string,
  headers: Record<string, string>
): Promise<MessageObjectType | undefined> {
  try {
    const response = await axios.get(endpoints.messages + id, { headers });

    if (response.status === 200 && response.data) {
      const { payload, id: messageId } = response.data;
      const { headers } = payload;

      const messageObject: MessageObjectType = { id: messageId };

      headers.forEach(({ name, value }: MessageHeader) => {
        if (name === "From") {
          messageObject.name = value;
        } else if (name === "List-Unsubscribe") {
          const urlObject = checkUnsubUrl(value);

          if (urlObject) {
            if (urlObject.https.length > 0)
              messageObject.webUrl = urlObject.https[0];
            if (urlObject.mailto.length > 0)
              messageObject.postUrl = urlObject.mailto[0];
          }
        }
      });

      if (messageObject.webUrl) {
        return messageObject;
      }
    }
  } catch (error) {
    renderAlert(
      "error",
      `There was an error fetching the messade ID, ${error}`
    );
  }
}

async function fetchMessages(token: string): Promise<MessageObjectType[]> {
  const maxResults = 10;

  if (!token) {
    renderAlert("error", "No Token found");
    return [];
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const params = {
    maxResults: maxResults,
    q: "Unsubscribe",
  };

  try {
    const response: AxiosResponse<{ messages?: Message[] }> = await axios.get(
      endpoints.messages,
      {
        headers,
        params,
      }
    );

    if (response.status === 200 && response.data && response.data.messages) {
      const { messages } = response.data;
      const idArray: string[] = messages.map((message: Message) => message.id);
      const messageArray: MessageObjectType[] = await processMessages(
        idArray,
        headers
      );
      return messageArray;
    }
  } catch (error) {
    renderAlert("error", `Error fetching messages: ${error}`);
  }

  return [];
}

async function processMessages(
  idArray: string[],
  headers: Record<string, string>
): Promise<MessageObjectType[]> {
  const exists: Set<string> = new Set();
  const messageArray: MessageObjectType[] = [];

  for (const id of idArray) {
    const message = await getMessage(id, headers);

    if (message?.name && !exists.has(message.name)) {
      exists.add(message.name);
      messageArray.push(message);
    }
  }

  return messageArray;
}

export default fetchMessages;
