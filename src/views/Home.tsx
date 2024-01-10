import { useState } from "react";
import fetchMessages from "../utils/fetchMessages";
import deleteMessages from "../utils/deleteMessages";
import renderAlert from "../utils/renderAlert";
import Swal from "sweetalert2";

import Button from "../components/Button";

import { MessageObjectType } from "../types/types";
import { handleLogout } from "../services/supabase/supabase";

interface HomeProps {
  user: any;
}

interface DeleteResult {
  isConfirmed: boolean;
}

function Home({ user }: HomeProps) {
  const [messages, setMessages] = useState<MessageObjectType[]>();
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = localStorage;

  async function handleFetchMessages() {
    setLoading(true);
    try {
      const messages = await fetchMessages(
        token,
        user.user_metadata.provider_id
      );

      if (messages) {
        setMessages(messages);
      }
    } catch (error) {
      renderAlert("error", `There was an error fetching messages: ${error}`);
      console.error("error", `There was an error fetching messages: ${error}`);
    } finally {
      setLoading(false);
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
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove all selected emails from your inbox",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, you can remove them!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(result);
      }
    });
  }

  async function handleDelete(result: DeleteResult) {
    setLoading(true);
    try {
      if (result.isConfirmed) {
        const response = await deleteMessages(
          checkedIds,
          token,
          user.user_metadata.provider_id
        );

        if (response === "") {
          setMessages(
            messages?.filter(
              (message) => !checkedIds.includes(message.id ?? "")
            )
          );
          setCheckedIds([]);
          renderAlert("success", "Successfully removed emails!");
        }
      }
    } catch (error) {
      renderAlert(
        "error",
        `There was an error deleting your messages: ${error}`
      );
      console.error(
        "error",
        `There was an error deleting your messages: ${error}`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      id='home'
      className='relative min-h-screen py-10 px-5 w-full flex flex-col gap-5 items-center justify-center'>
      <div className='flex items-center gap-5'>
        <img
          src={user?.user_metadata.picture}
          alt='user'
          className='rounded-full w-20 shadow-lg border border-slate-500'
        />
      </div>

      <p className='text-lg'>
        Welcome{" "}
        <span className='font-bold'>
          {user?.user_metadata.full_name.split(" ")[0]}
        </span>
      </p>

      {messages && messages.length > 0 && (
        <p className='border p-2 rounded-md'>
          Subscriptions found: {messages.length}
        </p>
      )}

      {checkedIds.length > 0 ? (
        <Button
          onClick={batchDelete}
          text={`Delete selected: ${checkedIds.length}`}
          loading={loading}
        />
      ) : (
        <Button
          onClick={handleFetchMessages}
          text='Get subscriptions'
          loading={loading}
        />
      )}

      <div className='absolute top-5 right-5'>
        <Button onClick={handleLogout} text='Logout' />
      </div>

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
                      <p className='text-sm md:text-base'>{name}</p>
                      <p className='hidden md:block text-xs opacity-90'>
                        {email}
                      </p>
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
