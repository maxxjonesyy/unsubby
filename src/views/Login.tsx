import handleAuth from "../services/google-authentication/handleAuth";
import Button from "../components/Button";
import google from "../assets/icons/google.svg";

function Login() {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-5'>
      <h1 className='font-black text-6xl bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600 animate-text rounded-lg text-transparent shadow-lg bg-clip-text'>
        Unsubby
      </h1>
      <h2 className='text-lg text-center shadow-md'>
        A simple solution to managing your Gmail subscriptions.
      </h2>
      {error?.message && <PrintError error={error} />}
      <Button onClick={handleAuth} text={"Login with Google"} icon={google} />
    </div>
  );
}

export default Login;
