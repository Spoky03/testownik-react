import { RootState } from "@/store";
import { Navigate, Outlet, } from "react-router-dom";
import { checkIfTokenIsValid } from "@/lib/utils";
import { useSelector } from "react-redux";
export const AuthenticatedRoute = () => {
    const user = useSelector((state: RootState) => state.user.user); // Assuming state.user.user is null or undefined when not logged in
    const isLoggedIn =
      !!user.sub &&
      !!user.username &&
      !!user.exp &&
      checkIfTokenIsValid(user.exp);
    const origin = window.location.pathname;
    const reason = "You need to be logged in to access this page";
    return isLoggedIn ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ origin: origin, reason: reason }} replace />
    );
  };