import { useEffect, useState } from "react";

import Login from "./views/Login";
import Home from "./views/Home";

import setAuthToken from "./services/google-authentication/setAuthToken";
import fetchUser from "./utils/fetchUser";

function App() {
  const [user, setUser] = useState<Record<string, string> | undefined>();

  useEffect(() => {
    const authHasRun: string | undefined =
      sessionStorage.getItem("authHasRun") ?? undefined;

    const token: string | undefined =
      sessionStorage.getItem("token") ?? undefined;

    async function setup() {
      try {
        if (authHasRun && !token) {
          setAuthToken();
        } else if (authHasRun && token && !user) {
          const userData = await fetchUser(token);
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Error during setup:", error);
      }
    }

    setup();
  }, []);

  return <>{user ? <Home user={user} /> : <Login />}</>;
}

export default App;
