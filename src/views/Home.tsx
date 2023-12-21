import { useState } from "react";
import fetchMessages from "../utils/fetchMessages";
import logoutUser from "../utils/logoutUser";

import Button from "../components/Button";
import PrintError from "../components/PrintError";

import { UserType, ErrorType, MessageObjectType } from "../types/types";

interface HomeProps {
  user: UserType;
}

function Home({ user }: HomeProps) {
  const [messages, setMessages] = useState<MessageObjectType[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = sessionStorage;
  const [error, setError] = useState<ErrorType>();

  async function handleFetchMessages() {
    setLoading(true);
    try {
      const messages = await fetchMessages(token);

      if (messages) {
        setMessages(messages);
      }
    } catch (error) {
      setError(error as ErrorType);
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
      console.log(
        document.getElementById("home")?.classList.remove("h-screen")
      );
    }
  }

  return (
    <div
      id='home'
      className='relative h-screen py-10 px-5 w-full flex flex-col gap-10 items-center justify-center'>
      <div className='flex items-center gap-5'>
        <img
          src={user.image}
          alt='user'
          className='rounded-full w-20 shadow-lg border border-slate-500'
        />
      </div>

      {error?.message && <PrintError error={error} />}
      <Button
        onClick={handleFetchMessages}
        text={
          messages
            ? `Total Subscriptions: ${messages.length}`
            : "Get Subscriptions"
        }
        loading={loading}
      />

      <div className='absolute top-5 right-5'>
        <Button onClick={logoutUser} text='Logout' />
      </div>

      {messages && (
        <table className='w-full transition-all lg:w-2/3 lg:max-w-[1000px]'>
          <thead className='bg-slate-800'>
            <tr>
              <th className='text-lg px-5 py-3 text-left'>Name</th>
              <th className='text-lg px-5 py-3 text-center'>Unsubscribe</th>
            </tr>
          </thead>
          <tbody>
            {messages?.map((message, index) => {
              const name = message.name?.split("<")[0].replace(/"/g, "");
              const email = message.name
                ?.split("<")[1]
                .slice(0, -1)
                .toLowerCase();
              const webUrl = message?.webUrl;

              return (
                <tr
                  key={index}
                  className='text-left border border-gray-700 transition-all hover:bg-slate-800'>
                  <th className='p-3'>
                    {name}
                    <p className='text-xs opacity-90'>{email}</p>
                  </th>

                  <td className='p-3 text-center'>
                    {webUrl ? (
                      <a href={webUrl} target='_blank'>
                        <button className='font-bold  bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600 animate-text rounded-lg text-transparent shadow-lg bg-clip-text'>
                          Remove
                        </button>
                      </a>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
