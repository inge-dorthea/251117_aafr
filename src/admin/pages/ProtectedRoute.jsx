//* imports
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { createSupabaseClient } from "../../data/functions";

//* component
const ProtectedRoute = ({ children }) => {

  const supabase = createSupabaseClient();

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