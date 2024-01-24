import { useState } from "react";
import { handleLogin } from "../services/supabase/supabase.ts";

import google from "../assets/icons/google.svg";
import faq from "../data/faq.ts";

import Button from "../components/Button";
import expandableArrow from "../assets/icons/expandable-arrow.svg";

interface LoginProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login({ loading, setLoading }: LoginProps): JSX.Element {
  const [showInfo, setShowInfo] = useState(false);

  function handleMenuChange(menuName: string) {
    if (menuName === "Login") {
      setShowInfo(false);
    } else if (menuName === "Info") {
      setShowInfo(true);
    }
  }

  function handleInfoClick(index: number) {
    const question = document.querySelectorAll("#question");
    const answer = question[index].childNodes[1] as HTMLElement;
    const arrow = document.querySelectorAll("#arrow");

    answer.classList.toggle("show-question");
    answer.classList.toggle("hide-question");
    arrow[index].classList.toggle("rotate-[0deg]");
  }

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center gap-5'>
      <h1 className='font-black text-6xl gradient-text'>
        Unsubby
      </h1>

      <ul className='flex gap-8'>
        <li>
          <button
            onClick={() => handleMenuChange("Login")}
            className={
              !showInfo ? "menu-active w-[70px] text-lg" : "w-[70px] text-lg"
            }>
            Login
          </button>
        </li>
        <li>
          <button
            onClick={() => handleMenuChange("Info")}
            className={
              showInfo ? "menu-active w-[70px] text-lg" : "w-[70px] text-lg"
            }>
            Info
          </button>
        </li>
      </ul>

      {!showInfo ? (
        <>
          <h2 className='text-lg text-center shadow-md'>
            A simple solution to managing your Gmail subscriptions.
          </h2>

          <Button
            onClick={() => {
              setLoading(true);
              handleLogin();
            }}
            text={"Login with Google"}
            icon={google}
            loading={loading}
          />
        </>
      ) : (
        <div className='w-full p-5 lg:w-2/3 max-w-[900px] transition-all duration-300'>
          <a href="https://www.termsfeed.com/live/13a0fa4a-7f0e-4e66-b095-f92faa2eabb0" target="_blank" className="font-bold text-lg underline">View our Privacy Policy</a>
          {faq.map((item, index) => (
            <div
              onClick={() => handleInfoClick(index)}
              key={index}
              id='question'
              className='relative overflow-hidden mt-5 border rounded-md hover:cursor-pointer'>
              <div className='flex w-full justify-between'>
                <button className='text-xl p-3 gradient-text'>
                  {item.question}
                </button>
                <img
                  id='arrow'
                  src={expandableArrow}
                  alt='menu-interact'
                  className='rotate-[-90deg] p-3 opacity-60 transition-all duration-300'
                />
              </div>
              <p className='hide-question relative'>{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Login;
