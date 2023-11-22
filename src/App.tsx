import { useEffect } from "react";
import handleAuth from "./services/google-authentication/handleAuth";
import setAuthToken from "./services/google-authentication/setAuthToken";

function App() {
  const { string: token } = sessionStorage;

  useEffect(() => {}, []);

  return (
    <>
      <p>Unsubby</p>
      <button onClick={handleAuth}>Test Fetch</button>
    </>
  );
}

export default App;
