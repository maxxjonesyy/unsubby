import axios from "axios";
import endpoints from "../data/endpoints.json";
import checkUnsubUrl from "./checkUnsubUrl";

interface Message {
  id: string;
}

interface MessageObject {
  id?: string;
  name?: string;
  webUrl?: string;
  postUrl?: string;
}

const fetchMessages = async (token: string): Promise<MessageObject[]> => {
  if (!token) {
    console.error("No token found");
    return [];
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const params = {
    maxResults: 3,
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
        const messageArray: MessageObject[] = [];

        async function getMessage(
          id: string
        ): Promise<MessageObject | undefined> {
          const response = await axios.get(endpoints.messages + id, {
            headers,
          });

          if (response.status === 200 && response.data) {
            const { headers } = response.data.payload;
            const messageObject: MessageObject = {};

            headers.forEach(
              ({ name, value }: { name: string; value: string }) => {
                messageObject["id"] = response.data.id;

                if (name === "From") {
                  messageObject["name"] = value;
                } else if (name === "List-Unsubscribe") {
                  const urlObject = checkUnsubUrl(value);
                  if (urlObject) {
                    urlObject.https.length > 0
                      ? (messageObject["webUrl"] = value)
                      : null;
                    urlObject.mailto.length > 0
                      ? (messageObject["postUrl"] = value)
                      : null;
                  }
                }
              }
            );

            if (Object.keys(messageObject).length > 2) {
              return messageObject;
            }
          }
        }

        async function processMessages(idArray: string[]): Promise<void> {
          for (const id of idArray) {
            const message = await getMessage(id);

            if (message) {
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
};

export default fetchMessages;
