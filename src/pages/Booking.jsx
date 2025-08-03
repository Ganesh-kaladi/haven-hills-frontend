import {
  Calendar,
  LucideMessageSquare,
  MapPin,
  MessageSquare,
  Phone,
  Timer,
  User,
  Users,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
 
  clearSingleBooking,
  getSinglebooking,
} from "../slice/bookingSlice";
import { ISTdate } from "../assets/utiles/dateIST";
import DownloadTicket from "../component/DownloadTicket";
import Spinner from "../component/Spinner";

function Booking() {
  const { bookID } = useParams();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { singleBooking, isLoadingBooking } = useSelector(
    (state) => state.booking
  );

  useEffect(
    function () {
      dispatch(getSinglebooking({ bookID, token }));

      return () => {
        dispatch(clearSingleBooking());
      };
    },
    [dispatch, bookID, token]
  );
  return (
    <div>
      {isLoadingBooking && <Spinner />}
      {singleBooking && (
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-10 w-[90%] lg:w-[80%] mx-auto">
          <div className="lg:col-span-4 p-5">
            <div className="bg-slate-600 px-2 md:px-4 py-3 rounded-lg relative">
              <h6 className="font-semibold text-lg lg:text-3xl text-gray-900">
                booking confirmation
              </h6>
              <p className="text-gray-900 text-sm mt-2">
                booking id&nbsp;:&nbsp;
                <span className="text-amber-200">
                  {singleBooking?.paymentSummary.orderID}
                </span>
              </p>
              <span className="bg-green-600 text-white absolute top-3 right-4 px-3 lg:px-5 rounded-xl">
                {singleBooking?.status}
              </span>
            </div>

            <div className="bg-slate-600 mt-8 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-6 p-0 sm:p-4">
                <div className="sm:col-span-2 rounded">
                  <img
                    src={singleBooking?.cabin?.image[0].url}
                    alt="..."
                    className="w-full rounded-t-lg sm:rounded-t-none"
                  />
                </div>
                <div className="sm:col-span-4 px-2 sm:px-6 sm:py-1">
                  <h6 className="mb-1 mt-4 sm:mt-0 text-amber-300 text-center sm:text-start text-xl lg:text-2xl">
                    {singleBooking?.cabin?.title}
                  </h6>
                  <p className="text-gray-300 font-medium text-center sm:text-start">
                    {singleBooking?.cabin?.description}
                  </p>
                </div>
              </div>
              <div className="px-5 py-4">
                <h5 className="font-semibold text-gray-900 text-xl text-center md:text-start mb-2">
                  stay details
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-x-8 md:gap-y-5">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Calendar size={17} className="text-green-400" />
                      <span className="text-gray-900 font-semibold text-lg">
                        check in
                      </span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="text-gray-300 text-sm mt-1">
                        {ISTdate(singleBooking?.start)}
                      </span>
                      <span className="text-gray-300 text-sm">03:00 pm</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Timer size={17} className="text-red-600" />
                      <span className="text-gray-900 font-semibold text-lg">
                        check out
                      </span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="text-gray-300 text-sm mt-1">
                        {ISTdate(singleBooking?.checkOut)}
                      </span>
                      <span className="text-gray-300 text-sm">11:00 am</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <MapPin size={17} className="text-blue-300" />
                      <span className="text-gray-900 font-semibold text-lg">
                        location
                      </span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="text-gray-300 text-sm mt-1">
                        {singleBooking?.cabin?.location}
                      </span>
                      {/* <span className="text-gray-300 text-sm">Andhara Pradesh</span> */}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Users size={17} className="text-blue-950" />
                      <span className="text-gray-900 font-semibold text-lg">
                        guests and duration
                      </span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="text-gray-300 text-sm mt-1">
                        <b>{singleBooking?.accommodateGuestsCount}</b> - guests
                      </span>
                      <span className="text-gray-300 text-sm">
                        <b>{singleBooking?.nights}</b> - nights
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 bg-slate-600 rounded-lg p-4">
              <h5 className="text-2xl text-gray-900 font-semibold">
                guest information
              </h5>
              <ul className="ps-3">
                <li className="text-lg flex items-center gap-2">
                  <User size={17} className="text-sky-300" />
                  <span className="font-medium text-gray-900">{`${singleBooking?.user?.firstName} ${singleBooking?.user?.lastName}`}</span>
                </li>
                <li className="text-lg flex items-center gap-2">
                  <MessageSquare size={17} className="text-sky-300" />
                  <span className="font-medium text-gray-900 ">
                    {singleBooking?.user?.email}
                  </span>
                </li>
                <li className="text-lg flex items-center gap-2">
                  <Phone size={17} className="text-sky-300" />
                  <span className="font-medium text-gray-900 ">
                    +91 1234512345
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-2 p-5">
            <div className="px-4 py-4 rounded-lg bg-slate-600">
              <h5 className="text-2xl text-gray-900 font-semibold text-center">
                Payment Summary
              </h5>
              <div className="mt-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">
                    Room rate × {singleBooking?.nights} nights
                  </span>
                  <span className="text-gray-950">
                    ₹&nbsp;{singleBooking?.paymentSummary.cabinPrice}.00 ×&nbsp;
                    {singleBooking?.nights}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Subtotal</span>
                  <span className="text-gray-950">
                    ₹&nbsp;{singleBooking?.paymentSummary.subTotal}.00
                  </span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-900">Taxes & fees</span>
                  <span className="text-gray-950">
                    ₹&nbsp;{singleBooking?.paymentSummary.taxesAndFee}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-1">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-950">
                    ₹&nbsp;{singleBooking?.paymentSummary.total}.00
                  </span>
                </div>
              </div>
              <p className="text-center text-sm text-gray-400">
                Booked on {ISTdate(singleBooking?.createdAt)}
              </p>
              <DownloadTicket bookingID={singleBooking?._id} />
            </div>
            <div className="bg-slate-600 roundes-lg mt-5 p-5 rounded-lg">
              <h5 className="text-2xl text-gray-900 font-semibold text-center">
                Need help ?
              </h5>
              <div className="flex items-center gap-2 mt-2">
                <Phone size={26} className="text-green-500" />
                <div className="flex flex-col">
                  <span className="font-semibold text-xl text-gray-900">
                    call us
                  </span>
                  <span className="text-sm text-slate-950 font-medium">
                    +91 1234512345
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <LucideMessageSquare size={26} className="text-amber-400" />
                <div className="flex flex-col">
                  <span className="font-semibold text-xl text-gray-900">
                    email us
                  </span>
                  <span className="text-sm text-slate-950 font-medium">
                    +91 1234512345
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;
