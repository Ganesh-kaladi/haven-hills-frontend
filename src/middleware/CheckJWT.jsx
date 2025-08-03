import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CheckJWT({ children }) {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  useEffect(
    function () {
      if (token) {
        navigate("/haven/cabins");
      }
    },
    [navigate, token]
  );

  if (token) {
    return null;
  }

  return children;
}

export default CheckJWT;
