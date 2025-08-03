import { Calendar, Timer, User, Users } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserBookings } from "../slice/bookingSlice";
import { ISTdate } from "../assets/utiles/dateIST";
import Spinner from "../component/Spinner";

function Bookings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { bookings, isLoadingBooking } = useSelector((state) => state.booking);

  useEffect(
    function () {
      dispatch(getUserBookings(token));
    },
    [dispatch, token]
  );

  return (
    <div className="w-[90%] lg:w-[80%] mx-auto">
      <div className="flex justify-between items-center pb-2">
        <h3 className="text-xl lg:text-2xl text-slate-500">my bookings</h3>
        <span className="text-gray-400 text-xl">
          showing&nbsp;
          <b className="text-amber-200">
            {bookings?.length > 0 ? bookings?.length : "no"}
          </b>
          &nbsp; bookings
        </span>
      </div>
      <div className="mt-2 min-h-[70vh] border-t border-gray-800">
        {isLoadingBooking && <Spinner />}
        <div className="pt-8 grid grid-cols-1 gap-8 w-full lg:w-[80%] mx-auto">
          {bookings?.length > 0 &&
            bookings.map((el, i) => <BookingCard booking={el} key={i} />)}
          {bookings?.length <= 0 && (
            <div className="mx-auto text-center mt-5">
              <p className="text-gray-500 text-3xl">
                no bookings..! your not experience the haven
                hills&nbsp;.&nbsp;.&nbsp;.&nbsp;,
              </p>
              <button
                className="mt-8 bg-amber-400 px-6 py-2 rounded hover:bg-amber-300"
                onClick={() => navigate("/haven/cabins")}
              >
                book your cabin...
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BookingCard({ booking }) {
  const navigate = useNavigate();
  return (
    <div className="border border-gray-800 p-5 relative rounded-lg">
      <span className="absolute top-4 right-6 block bg-green-800 px-5 py-[0.177rem] rounded-2xl font-medium text-white">
        {booking?.status}
      </span>
      <div>
        <h5 className="text-xl lg:text-4xl text-amber-500">
          {booking?.cabin.title}
        </h5>
        <div className="flex flex-col mt-2">
          <div className="flex gap-2 items-center text-gray-500 h-full">
            <Calendar size={17} className="text-gray-700 mt-[-2px]" />
            <span className="text-md">
              &nbsp;booked on {ISTdate(booking?.createdAt)}
            </span>
          </div>
          <div className="flex gap-2 items-center text-gray-500 h-full">
            <Users size={17} className="text-blue-600" />
            <span className="text-lg">
              &nbsp;{booking?.accommodateGuestsCount} guests
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="flex flex-col text-gray-500">
          <div className="flex items-center gap-1 font-medium">
            <Calendar size={18} className="text-green-600" />
            <span className="text-xl">&nbsp;check in</span>
          </div>
          <div className="flex gap-4 items-center md:flex-col md:items-start md:gap-0">
            <span className="text-sm md:text-lg text-gray-400">
              {ISTdate(booking?.start)}
            </span>
            <span className="text-sm md:text-lg text-gray-400">
              03:00 pm onwards
            </span>
          </div>
        </div>
        <div className="flex flex-col text-gray-500">
          <div className="flex items-center gap-1 font-medium">
            <Timer size={18} className="text-red-600" />
            <span className="text-xl">&nbsp;check out</span>
          </div>
          <div className="flex gap-4 items-center md:flex-col md:items-start md:gap-0">
            <span className="text-sm md:text-lg text-gray-400">
              {ISTdate(booking?.checkOut)}
            </span>
            <span className="text-sm md:text-lg text-gray-400">
              03:00 pm onwards
            </span>
          </div>
        </div>
        <div className="flex flex-col text-gray-500">
          <div className="flex items-center gap-1 font-medium">
            <User size={18} className="text-blue-700" />
            <span className="text-xl">&nbsp;guset details</span>
          </div>
          <div className="flex gap-4 items-center md:flex-col md:items-start md:gap-0">
            <span className="text-sm md:text-lg text-gray-400 ">{`${booking?.user.firstName} ${booking?.user.lastName}`}</span>
            <span className="text-sm md:text-lg text-gray-400 ">
              {booking?.user.email}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          className=" bg-amber-400 hover:bg-amber-600 font-medium px-5 py-1 rounded-lg cursor-pointer"
          onClick={() => navigate(`${booking?._id}`)}
        >
          view booking
        </button>
      </div>
    </div>
  );
}

export default Bookings;
