import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store";

function NonAuth() {
  const location = useLocation()
  const { user } = useAuthStore();
  if (user !== null) {
    const returnTo = new URLSearchParams(location.search).get('returnTo') || '/'
    return <Navigate to={returnTo} replace={true} />;
  }
  return (
    <div>
      <h1>NonAuth</h1>
      <Outlet />
    </div>
  );
}

export default NonAuth;
