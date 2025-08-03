import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../slice/authSlice";
import { clearBooking } from "../slice/bookingSlice";

function JWTexpiry({ children }) {
  const dispatch = useDispatch();

  const { errorAuth } = useSelector((state) => state.auth);
  const { errorBooking } = useSelector((state) => state.booking);

  async function clearStore(params) {
    await dispatch(clearAuth());
    await dispatch(clearBooking());
  }

  if (
    errorAuth?.errName === "JsonWebTokenError" ||
    errorAuth?.errName === "TokenExpiredError" ||
    errorBooking?.errName === "JsonWebTokenError" ||
    errorBooking?.errName === "TokenExpiredError"
  ) {
    clearStore();
  }

  return children;
}

export default JWTexpiry;
