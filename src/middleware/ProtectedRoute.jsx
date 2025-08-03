import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { token, authenticate } = useSelector((state) => state.auth);
  if (!token || !authenticate) {
    return <Navigate to="/haven/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
