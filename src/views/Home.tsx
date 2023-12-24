import { useState } from "react";
import fetchMessages from "../utils/fetchMessages";
import deleteMessages from "../utils/deleteMessages";
import logoutUser from "../utils/logoutUser";
import renderAlert from "../utils/renderAlert";

import Button from "../components/Button";

import { UserType, MessageObjectType } from "../types/types";

interface HomeProps {
  user: UserType;
}

function Home({ user }: HomeProps) {
  const [messages, setMessages] = useState<MessageObjectType[]>();
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = sessionStorage;

  async function handleFetchMessages() {
    setLoading(true);
    try {
      const messages = await fetchMessages(token);

      if (messages) {
        setMessages(messages);
      }
    } catch (error) {
      renderAlert("error", `There was an error fetching messages: ${error}`);
    } finally {
      setLoading(false);

      if (messages && messages.length > 0) {
        document.getElementById("home")?.classList.remove("h-screen");
      }
    }
  }

  function handleCheckedIds(id: any) {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((existingIds) => existingIds !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  }

  function handleCheckAllIds() {
    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const tempArray: Array<string> = [];

    if (checkAll.checked) {
      setCheckedIds([]);

      messages?.forEach((message) => {
        if (message?.id) {
          tempArray.push(message.id);
        }
      });

      setCheckedIds(tempArray);
    } else {
      setCheckedIds([]);
    }
  }

  async function batchDelete() {
    try {
      const response = await deleteMessages(checkedIds, token);

      if (response === "") {
        setMessages(
          messages?.filter((message) => !checkedIds.includes(message.id ?? ""))
        );
        setCheckedIds([]);
        renderAlert("success", "Messages have been cleaned from your inbox!");
      }
    } catch (error) {
      renderAlert(
        "error",
        `There was an error deleting your messages: ${error}`
      );
    }
  }

  return (
    <div
      id='home'
      className='relative h-screen py-10 px-5 w-full flex flex-col gap-5 items-center justify-center'>
      <div className='flex items-center gap-5'>
        <img
          src={user.image}
          alt='user'
          className='rounded-full w-20 shadow-lg border border-slate-500'
        />
      </div>

      <Button
        onClick={handleFetchMessages}
        text={
          messages
            ? `Total subscriptions: ${messages.length}`
            : "Get subscriptions"
        }
        loading={loading}
      />

      <div className='absolute top-5 right-5'>
        <Button onClick={logoutUser} text='Logout' />
      </div>

      {checkedIds.length > 0 && (
        <Button
          onClick={batchDelete}
          text={`Delete selected: ${checkedIds.length}`}
        />
      )}

      {messages && messages.length > 0 && (
        <table className='w-full transition-all lg:w-2/3 lg:max-w-[1000px]'>
          <thead className='bg-slate-800'>
            <tr>
              <th className='text-lg px-5 py-3 text-left'>
                <input
                  id='checkAll'
                  onChange={handleCheckAllIds}
                  type='checkbox'
                  className='w-5 h-5 mx-1'
                />
              </th>
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
                    <input
                      type='checkbox'
                      className='mx-3 w-5 h-5'
                      checked={checkedIds.includes(message.id ?? "")}
                      onChange={() => handleCheckedIds(message.id)}
                    />
                  </th>

                  <th className='p-3'>
                    <div>
                      <p>{name}</p>
                      <p className='text-xs opacity-90'>{email}</p>
                    </div>
                  </th>

                  <td className='p-3 text-center'>
                    {webUrl ? (
                      <a href={webUrl} target='_blank'>
                        <button className='font-bold  bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600 animate-text rounded-lg text-transparent shadow-lg bg-clip-text'>
                          View Link
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
