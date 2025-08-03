import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuthError, createUser } from "../slice/authSlice";
import toast from "react-hot-toast";

function SignUp() {
  const { errorAuth, isLoadingAuth } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "@example.com",
    password: "",
    confirmPassword: "",
    termsAndPrivacyPolicy: false,
    contact: "9999999999",
  });
  const [formErr, setFormErr] = useState({});

  useEffect(
    function () {
      if (errorAuth) {
        toast(errorAuth.err);
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

  function handleCheckBox(e) {
    const { name, checked } = e.target;
    setUserData((cur) => ({ ...cur, [name]: checked }));
  }

  function handleErrors() {
    let err = {};
    if (!userData.firstName) err.firstNameErr = "required";
    if (!userData.lastName) err.lastNameErr = "required";
    if (!userData.email) err.emailErr = "required";
    if (!userData.password) err.passwordErr = "required";
    if (!userData.confirmPassword) err.confirmPasswordErr = "required";
    if (!userData.termsAndPrivacyPolicy) {
      err.termsAndPrivacyPolicyErr = "required";
      toast("accept terms and conditions");
    }
    if (!userData.contact) err.contactErr = "required";
    if (userData.password !== userData.confirmPassword)
      err.confirmPasswordErr = "password is not match";
    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const resErr = handleErrors();
    if (Object.keys(resErr).length > 0) {
      setFormErr(resErr);
      return;
    }

    dispatch(createUser(userData)).then((res) => {
      console.log(res);
      if (res.type === "createUser/fulfilled") {
        setUserData((cur) => ({
          ...cur,
          firstName: "",
          lastName: "",
          email: "@example.com",
          password: "",
          confirmPassword: "",
          termsAndPrivacyPolicy: false,
          contact: "9999999999",
        }));
      }
    });
  }
  return (
    <div className="flex items-center flex-col justify-center h-full mt-8">
      <div className="w-[90%] md:w-[420px]">
        <div className="text-center text-gray-200 flex gap-4 items-end justify-center">
          <span className="text-sm text-gray-500"> Join Our Community ,</span>
          <h4 className="text-xl md:text-2xl text-amber-500">Haven Hills</h4>
        </div>
        <p className="text-sm md:text-lg text-center mt-2 text-gray-500">
          Create your account to start your journey
        </p>
        <div className="relative rounded-lg">
          <div
            className="absolute top-0 left-0 w-full h-full -z-10 rounded-xl "
            style={{ background: "#ffffff13" }}
          ></div>
          <form
            className="py-5 px-5 mt-5 backdrop-blur-xl rounded-lg"
            onSubmit={handleSubmit}
          >
            <h5 className="text-center text-xl lg:text-4xl text-slate-400">
              sign up
            </h5>
            <div className=" grid grid-cols-2 gap-4">
              <InputContainer
                type={"text"}
                inputName={"firstName"}
                handleChange={handleChange}
                err={formErr.firstNameErr}
                val={userData.firstName}
                place={"first name"}
              >
                first name
              </InputContainer>
              <InputContainer
                type={"text"}
                inputName={"lastName"}
                handleChange={handleChange}
                err={formErr.lastNameErr}
                val={userData.lastName}
                place={"last name"}
              >
                last name
              </InputContainer>
            </div>
            <InputContainer
              type={"email"}
              inputName={"email"}
              handleChange={handleChange}
              err={formErr.emailErr}
              val={userData.email}
              place={"email"}
            >
              email
            </InputContainer>
            <InputContainer
              type={"password"}
              inputName={"password"}
              handleChange={handleChange}
              err={formErr.passwordErr}
              val={userData.password}
              place={"password"}
            >
              Password
            </InputContainer>
            <InputContainer
              type={"password"}
              inputName={"confirmPassword"}
              handleChange={handleChange}
              err={formErr.confirmPasswordErr}
              val={userData.confirmPassword}
              place={"confirm password"}
            >
              Confirm Password
            </InputContainer>
            <InputContainer
              type={"tel"}
              inputName={"contact"}
              place={"contact"}
              handleChange={handleChange}
              err={formErr.contactErr}
              val={userData.contact}
            >
              contact
            </InputContainer>
            <p className="font-semibold mt-4 text-gray-400 text-sm">
              <input
                type="checkbox"
                className="me-3"
                name="termsAndPrivacyPolicy"
                onChange={handleCheckBox}
                checked={userData.termsAndPrivacyPolicy}
              />
              I agree to the&nbsp;
              <span className="text-blue-600">Terms of Service&nbsp;</span> and
              <span className="text-blue-600">&nbsp;Privacy Policy</span>
            </p>
            <div className="mt-5 mb-5">
              <button
                type="submit"
                className="w-full bg-amber-300 hover:bg-amber-400 text-slate-700 font-semibold py-[0.433rem] cursor-pointer rounded-lg"
              >
                {isLoadingAuth ? "sing up..." : "sign up"}
              </button>
            </div>
            <p className="border-t border-gray-600 text-gray-400 pt-5 text-center">
              Already have an account?
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/haven/login")}
              >
                &nbsp;sign in here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputContainer({
  children,
  type,
  inputName,
  handleChange,
  err,
  val,
  place,
}) {
  return (
    <div className="mt-5 w-full">
      <label
        htmlFor={inputName}
        className="text-gray-400 font-semibold w-full flex justify-between"
      >
        {children}
        {err && <span className="text-red-600">{err}</span>}
      </label>
      <input
        id={inputName}
        type={type}
        placeholder={`${place}`}
        name={inputName}
        className="w-full border border-gray-900 text-white bg-[rgba(24,24,22,0.64)] focus:outline-0 focus:border-gray-200 rounded-lg py-1 px-4 mt-2"
        onChange={handleChange}
        value={val}
      />
    </div>
  );
}

export default SignUp;
