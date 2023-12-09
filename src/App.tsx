import { useEffect, useState } from "react";

import Login from "./views/Login";
import Home from "./views/Home";

import setAuthToken from "./services/google-authentication/setAuthToken";
import fetchUser from "./utils/fetchUser";

import { ErrorType, UserType } from "./types/types";

function App() {
  const [user, setUser] = useState<UserType>();
  const [error, setError] = useState<ErrorType>();

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
        setError(error as ErrorType);
        console.error("Error during setup:", error);
      }
    }

    setup();
  }, []);

  return <>{user ? <Home user={user} /> : <Login error={error} />}</>;
}

export default App;
