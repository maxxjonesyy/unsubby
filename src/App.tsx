import { useEffect, useState } from "react";

import handleAuth from "./services/google-authentication/handleAuth";
import setAuthToken from "./services/google-authentication/setAuthToken";
import fetchUser from "./utils/fetchUser";

function App() {
  const [user, setUser] = useState<Record<string, string> | undefined>();
  const [loading, setLoading] = useState(false);

  const authHasRun: string | null = sessionStorage.getItem("authHasRun");
  const token: string | null = sessionStorage.getItem("token");

  // Make function to fetch all subs (combine fetching id's and then the the subs)
  // Setup homepage UI and theming (Add info text on how to use and features)

  useEffect(() => {
    async function setup() {
      setLoading(true);
      try {
        if (authHasRun && !token) {
          setAuthToken();
        } else if (authHasRun && token) {
          const userData = await fetchUser(token);
          setUser(userData);
        }
      } catch (error) {
        throw new Error(`${error}`);
      } finally {
        setLoading(false);
      }
    }
    setup();
  }, []);

  return (
    <>
      <p>Unsubby</p>
      <button onClick={handleAuth}>Test Fetch</button>
    </>
  );
}

export default App;
