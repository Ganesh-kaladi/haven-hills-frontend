import { Calendar, Edit, Settings, Shield, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe, updateMe } from "../slice/authSlice";
import { ISTdate } from "../assets/utiles/dateIST";
import avatar from "../assets/avatar.jpg";
import AddProfilePic from "../component/AddProfilePic";
import Spinner from "../component/Spinner";

function Profile() {
  const { user, token, isLoadingAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    contact: user?.contact,
  });

  useEffect(
    function () {
      if (user) {
        return;
      }
      dispatch(getMe(token));
    },
    [user, token, dispatch]
  );

  useEffect(
    function () {
      setFormData((cur) => ({
        ...cur,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        contact: user?.contact,
      }));
    },
    [user]
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((cur) => ({ ...cur, [name]: value }));
  }

  function handleCancelBtn() {
    setFormData((cur) => ({
      ...cur,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      contact: user?.contact,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateMe({ token, formData })).then(() => {
      setIsEdit(false);
    });
  }

  return (
    <div>
      {isLoadingAuth && <Spinner />}
      {user && (
        <div className="grid lg:grid-cols-6 gap-y-10 mt-10 w-[90%] lg:w-[80%] mx-auto">
          <div className="lg:col-span-2 px-5 flex flex-col sm:flex-row sm:gap-5 lg:block">
            <div className="bg-slate-400 p-5 rounded-lg text-center sm:w-[50%] lg:w-full">
              <div className="w-[120px] h-[120px] mx-auto">
                <div className=" w-full h-full text-white relative ">
                  <img
                    src={
                      user?.profileImage?.url ? user?.profileImage?.url : avatar
                    }
                    alt="..."
                    className="w-full rounded-full"
                  />
                  {user?.profileImage?.url ? null : <AddProfilePic />}
                </div>
              </div>
              <h6 className="mt-2 text-xl font-semibold text-center text-cyan-50">
                {`${user?.firstName} ${user?.lastName}`}
              </h6>
              <p className="text-lg text-slate-900">haven hills</p>
              <span className="text-lg text-cyan-50 mt-4 block">
                since&nbsp;{ISTdate(user?.createdAt)}
              </span>
              <div className="w-full flex justify-around border-t mt-4 pt-4">
                <div>
                  <span className="block text-3xl font-semibold text-gray-900">
                    {user?.bookings}
                  </span>
                  <span className="text-cyan-50">total bookings</span>
                </div>
                <div>
                  <span className="block text-3xl font-semibold text-gray-900">
                    4.4
                  </span>
                  <span className="text-cyan-50">Avg Rating</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-400 p-5 rounded-lg mt-10 sm:w-[50%] sm:mt-0 lg:w-full lg:mt-10">
              <h5 className="text-2xl text-cyan-50 font-semibold">
                Quick Actions
              </h5>
              <ProfileActionBtn icon={Settings}>
                Account Settings
              </ProfileActionBtn>
              <ProfileActionBtn icon={Calendar}>
                Booking History
              </ProfileActionBtn>
            </div>
          </div>

          <div className="lg:col-span-4 px-5">
            <div className="bg-slate-400 p-5 py-8 rounded-lg">
              <form onSubmit={handleSubmit}>
                <div className="flex justify-between w-full">
                  <h5 className="text-xl lg:text-2xl text-cyan-50 font-semibold">
                    Personal Information
                  </h5>

                  {isEdit ? (
                    <div className="flex gap-2">
                      <button className="flex items-center gap-x-2 text-sm px-8 bg-green-300 text-slate-700 font-semibold rounded-3xl cursor-pointer hover:bg-green-200">
                        save
                      </button>
                      <button
                        className="flex items-center gap-x-2 text-sm px-6 bg-slate-500 text-red-700 rounded-3xl cursor-pointer hover:bg-slate-300"
                        onClick={() => {
                          setIsEdit(false);
                          handleCancelBtn();
                        }}
                      >
                        <X size={15} />
                        cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="flex items-center gap-x-2 text-sm px-6 bg-slate-600 text-gray-200 rounded-3xl cursor-pointer hover:bg-slate-500"
                      type="submit"
                      onClick={() => setIsEdit(true)}
                    >
                      <Edit size={15} /> eitd profile
                    </button>
                  )}
                </div>
                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 ">
                    <InputContainer
                      inputName={"firstName"}
                      type={"text"}
                      isEdit={isEdit}
                      val={formData?.firstName}
                      handleChange={handleChange}
                      styleClass={"col-span-1"}
                    >
                      first name
                    </InputContainer>
                    <InputContainer
                      inputName={"lastName"}
                      type={"text"}
                      isEdit={isEdit}
                      val={formData?.lastName}
                      handleChange={handleChange}
                      styleClass={"col-span-1"}
                    >
                      last name
                    </InputContainer>
                    <InputContainer
                      inputName={"email"}
                      type={"email"}
                      isEdit={isEdit}
                      val={formData?.email}
                      handleChange={handleChange}
                      styleClass={"col-span-2 sm:col-span-1"}
                    >
                      email
                    </InputContainer>
                    <InputContainer
                      inputName={"phone"}
                      type={"tel"}
                      isEdit={isEdit}
                      val={formData?.contact}
                      handleChange={handleChange}
                      styleClass={"col-span-2 sm:col-span-1"}
                    >
                      phone number
                    </InputContainer>
                    <InputContainer
                      inputName={"address"}
                      type={"text"}
                      isEdit={isEdit}
                      val={"xyz-hbcb 50001"}
                      handleChange={handleChange}
                      styleClass={"col-span-2 sm:col-span-1"}
                    >
                      address
                    </InputContainer>
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-10 bg-slate-400 rounded-lg px-5 py-8">
              <h5 className="text-2xl text-cyan-50 font-semibold">
                Notification Information
              </h5>
              <div className="mt-2">
                <p className="text-lg mb-0 text-slate-700">
                  Email Notifications
                </p>
                <div className="flex justify-between">
                  <p className="text-cyan-50">
                    Receive updates about bookings and offers
                  </p>
                  <input type="checkbox" defaultChecked={true} />
                </div>
              </div>
              <div className="border-t border-gray-500 pt-2 mt-2">
                <p className="text-lg mb-0 text-slate-700">
                  SMS Notifications Notifications
                </p>
                <div className="flex justify-between">
                  <p className="text-cyan-50">
                    Get text reminders for check-in/out
                  </p>
                  <input type="checkbox" defaultChecked={true} />
                </div>
              </div>
              <div className="border-t border-gray-500 pt-2 mt-2">
                <p className="text-slate-700">Marketing Communications</p>
                <div className="flex justify-between">
                  <p className="text-cyan-50">
                    eceive promotional offers and news
                  </p>
                  <input type="checkbox" />
                </div>
              </div>
            </div>
            <div className="mt-10 bg-slate-400 rounded-lg px-5 py-8">
              <h5 className="text-2xl text-cyan-50 font-semibold">
                Preference
              </h5>
              <ProfileActionBtn icon={Settings}>
                change password
              </ProfileActionBtn>
              <ProfileActionBtn icon={Shield}>
                Two-Factor Authentication
              </ProfileActionBtn>
              <ProfileActionBtn icon={X}>Delete Account</ProfileActionBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileActionBtn({ children, icon: Icon }) {
  return (
    <button className="mt-3 flex items-center gap-2 bg-slate-800 text-gray-300 hover:text-gray-400 transition-all w-full px-4 py-2 cursor-pointer rounded">
      <Icon /> {children}
    </button>
  );
}

function InputContainer({
  children,
  inputName,
  type,
  isEdit,
  val,
  handleChange,
  styleClass,
}) {
  return (
    <div className={`${styleClass}`}>
      <label htmlFor={inputName} className="block text-xl text-amber-200">
        {children}
      </label>

      {isEdit ? (
        <input
          id={inputName}
          name={inputName}
          type={type}
          className="w-full border border-slate-800 bg-slate-800 text-cyan-50 mt-1 text-xl rounded-lg px-4 py-1 focus:outline-none"
          // placeholder="enter your first name . . ."
          value={val}
          onChange={handleChange}
        />
      ) : (
        <span className="block w-full text-cyan-50 mt-1  py-1  text-xl font-semibold">
          {val}
        </span>
      )}
    </div>
  );
}

export default Profile;
