//* imports
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { createClient } from "@supabase/supabase-js";

//* create client
const supabaseUrl = "https://rnleiofyyckqxppsfkyi.supabase.co";
const supabaseKey = import.meta.env.VITE_API_BASE_URL;
const supabase = createClient(supabaseUrl, supabaseKey);

//* component
const ProtectedRoute = ({ children }) => {
  //* check if there's a session
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      // get session from supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // the double ! turns session into a boolean, so
      // if there's a session: authenticated = true
      setAuthenticated(!!session);
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    if (authenticated) { // if there's a session the user can see the admin pages
      return <>{children}</>;
    } else { // if there's no session the user will be sent to the login page
      return <Navigate to="/login" />;
    }
  }
};

export default ProtectedRoute;