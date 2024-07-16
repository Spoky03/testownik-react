import { RootState } from "@/store";
import { Navigate, Outlet, } from "react-router-dom";
import { checkIfTokenIsValid } from "@/lib/utils";
import constants from "@/constants";
import { useSelector } from "react-redux";
export const AuthenticatedRoute = () => {
    const user = useSelector((state: RootState) => state.user.user); // Assuming state.user.user is null or undefined when not logged in
    const isLoggedIn =
      !!user.sub &&
      !!user.username &&
      !!user.exp &&
      checkIfTokenIsValid(user.exp);
    const reason = !checkIfTokenIsValid(user.exp)
      ? constants.LABELS.LOGIN.EXPIRED
      : constants.LABELS.LOGIN.LOGOUT;
    const origin = window.location.pathname;
    return isLoggedIn ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ origin: origin, reason: reason }} replace />
    );
  };