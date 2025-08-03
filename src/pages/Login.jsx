import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearAuthError, getMe, login } from "../slice/authSlice";

function Login() {
  const { errorAuth, isLoadingAuth } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userDate, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({});

  useEffect(
    function () {
      if (errorAuth) {
        if (errorAuth.err === "jwt malformed") {
          toast("please login to your account");
        } else {
          toast(errorAuth.err);
        }
      }

      return () => {
        dispatch(clearAuthError());
      };
    },
    [errorAuth]
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((cur) => ({ ...cur, [name]: value }));
  }

  function validateForm() {
    let err = {};
    if (!userDate.email) err.emailErr = "email is required";
    if (!userDate.password) err.passwordErr = "password is required";
    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errObj = validateForm();
    if (Object.keys(errObj).length > 0) {
      setErrorMsg(errObj);
      return;
    }
    dispatch(login(userDate)).then((res) => {
      if (res.type === "login/fulfilled") {
        dispatch(getMe(res.payload?.data?.token));
      }
    });
  }
  return (
    <div className="flex items-center flex-col justify-center h-full mt-8">
      <div className="w-[90%] md:w-[410px]">
        <div className="text-center text-gray-200 flex gap-4 items-end justify-center">
          <span className="text-sm text-gray-500"> welcome back ,</span>
          <h4 className="text-xl md:text-2xl text-amber-500">Haven Hills</h4>
        </div>
        <p className="text-sm md:text-lg text-center mt-2 text-gray-500">
          Sign in to your account to continue
        </p>
        <div className="relative rounded-lg">
          <div
            className="absolute top-0 left-0 w-full h-full -z-10 rounded-xl"
            style={{ background: "#f3eded13" }}
          ></div>
          <form
            className="py-5 px-5 mt-5 backdrop-blur-lg rounded-lg"
            onSubmit={handleSubmit}
          >
            <h5 className="text-center text-xl lg:text-4xl text-slate-400">
              sign in
            </h5>

            <InputContainer
              type={"email"}
              inputName={"email"}
              val={userDate.email}
              handleChange={handleChange}
              err={errorMsg.emailErr}
            >
              Email Address
            </InputContainer>
            <InputContainer
              type={"password"}
              inputName={"password"}
              val={userDate.password}
              handleChange={handleChange}
              err={errorMsg.passwordErr}
            >
              Password
            </InputContainer>

            <p className="font-semibold text-end mt-4 text-blue-600">
              Forgot your password?
            </p>
            <div className="mt-5 mb-7">
              <button
                className={`w-full bg-amber-300 hover:bg-amber-400 text-slate-700 font-semibold py-[0.433rem] cursor-pointer rounded-lg`}
              >
                {isLoadingAuth ? "sing in..." : "sign in"}
              </button>
            </div>
            <p className="border-t border-gray-600 pt-5 text-center text-gray-400">
              Don't have an account?
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/haven/sign-up")}
              >
                &nbsp;sign up for free
              </span>
            </p>
          </form>
        </div>
      </div>
      <p className="w-[90%] md:w-auto text-sm mt-5 text-center text-gray-500">
        By signing in, you agree to our
        <span className="text-blue-600 font-semibold">
          &nbsp;Terms of Service
        </span>
        and
        <span className="text-blue-600 font-semibold">
          &nbsp;Privacy Policy
        </span>
      </p>
    </div>
  );
}

function InputContainer({ children, type, inputName, val, handleChange, err }) {
  return (
    <div className="mt-5">
      <div className="relative">
        <label htmlFor={inputName} className="text-gray-400 font-semibold">
          {children}
        </label>
        {err && (
          <span className="absolute top-0 right-0 text-red-500">{err}</span>
        )}
      </div>
      <input
        type={type}
        id={inputName}
        name={inputName}
        placeholder={`enter your ${inputName} . . .`}
        value={val}
        onChange={handleChange}
        className="w-full border border-gray-600 text-gray-400 bg-[rgba(24,24,22,0.64)] focus:outline-0 focus:border-gray-200 rounded-lg py-1 px-4 mt-2"
      />
    </div>
  );
}

export default Login;
