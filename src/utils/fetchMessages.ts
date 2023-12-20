import axios from "axios";
import endpoints from "../data/endpoints.json";
import checkUnsubUrl from "./checkUnsubUrl";

import { MessageObjectType } from "../types/types";

interface Message {
  id: string;
}

export default async function fetchMessages(
  token: string
): Promise<MessageObjectType[]> {
  if (!token) {
    console.error("No token found");
    return [];
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const params = {
    maxResults: 10,
    q: "Unsubscribe",
  };

  try {
    const response = await axios.get(endpoints.messages, { headers, params });

    if (response.status === 200 && response.data) {
      const { messages } = response.data;

      if (messages) {
        const idArray: string[] = messages.map(
          (message: Message) => message.id
        );
        const messageArray: MessageObjectType[] = [];

        async function getMessage(
          id: string
        ): Promise<MessageObjectType | undefined> {
          const response = await axios.get(endpoints.messages + id, {
            headers,
          });

          if (response.status === 200 && response.data) {
            const { headers } = response.data.payload;
            const messageObject: MessageObjectType = {};

            headers.forEach(
              ({ name, value }: { name: string; value: string }) => {
                messageObject["id"] = response.data.id;

                if (name === "From") {
                  messageObject["name"] = value;
                } else if (name === "List-Unsubscribe") {
                  const urlObject = checkUnsubUrl(value);

                  if (urlObject) {
                    urlObject.https.length > 0
                      ? (messageObject["webUrl"] = urlObject.https[0])
                      : null;
                    urlObject.mailto.length > 0
                      ? (messageObject["postUrl"] = urlObject.mailto[0])
                      : null;
                  }
                }
              }
            );

            if (messageObject.webUrl || messageObject.postUrl) {
              return messageObject;
            }
          }
        }

        async function processMessages(idArray: string[]): Promise<void> {
          let exists: Array<string> = [];

          for (const id of idArray) {
            const message = await getMessage(id);

            if (message?.name && !exists.includes(message.name)) {
              exists.push(message.name);
              messageArray.push(message);
            }
          }
        }

        await processMessages(idArray);
        return messageArray;
      }
    }
  } catch (error) {
    throw new Error(`${error}`);
  }

  return [];
}
