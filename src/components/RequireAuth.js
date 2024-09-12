// import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  // const user = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const userRoles = Array.isArray(user?.roles) ? user.roles : [];
  console.log("user", user?.accessToken);
  console.log("user1", user);
  console.log("roles", userRoles);
  console.log("allowedRoles", allowedRoles);

  // Checking if the user has one of the allowed roles

  const hasRequiredRole = userRoles.some((role) => allowedRoles.includes(role));
  console.log("hasRequiredRole", hasRequiredRole);

  if (hasRequiredRole) {
    return <Outlet />;
  }

  // If the user exists but doesn't have the required role, redirect to Unauthorized
  if (user) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If no user, redirect to login page
  return <Navigate to="/login" state={{ from: location }} replace />;
};
export default RequireAuth;

// hasRequiredRole ? (
//   <Outlet />
// ) : user ? (
//   <Navigate to="/unauthorized" replace />
// ) : (
//   <Navigate to="/login" state={{ from: location }} replace />
// );
