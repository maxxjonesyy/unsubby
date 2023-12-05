import { useEffect, useState } from "react";

import setAuthToken from "./services/google-authentication/setAuthToken";
import fetchUser from "./utils/fetchUser";
import Login from "./views/Login";

function App() {
  const [user, setUser] = useState<Record<string, string> | undefined>();

  const authHasRun: string = sessionStorage.getItem("authHasRun") || "";
  const token: string = sessionStorage.getItem("token") || "";

  useEffect(() => {
    async function setup() {
      try {
        if (authHasRun && !token) {
          setAuthToken();
        } else if (authHasRun && token && !user) {
          const userData = await fetchUser(token);
          setUser(userData);
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
    setup();
  }, []);

  return (
    <>
      <Login />
    </>
  );
}

export default App;
