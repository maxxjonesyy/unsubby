import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./services/supabase/supabase";
import renderAlert from "./utils/renderAlert";

import Login from "./views/Login";
import Home from "./views/Home";

function App() {
  const user = JSON.parse(sessionStorage.getItem("user") as string);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        if (session) {
          sessionStorage.setItem("token", session?.provider_token as string);
          sessionStorage.setItem("user", JSON.stringify(session?.user));

          navigate("/home");
        } else {
          renderAlert("error", "Error logging in");
        }
      } else if (event === "SIGNED_OUT") {
        sessionStorage.clear();
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route
          path={"/"}
          element={<Login loading={loading} setLoading={setLoading} />}
        />
        <Route path={"/home"} element={<Home user={user} />} />
      </Routes>
    </>
  );
}

export default App;
