import { MapPin, Shield, Users } from "lucide-react";
import Reservation from "../component/Reservation";
import MyDatePicker from "../component/DatePicker";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSingleCabin, getCabin } from "../slice/cabinSlice";
import axios from "axios";
import { clearAuthError, getMe } from "../slice/authSlice";
import { bookCabin } from "../slice/bookingSlice";
import { paymentSummary } from "../assets/utiles/paymentSummary";
import CheckAvilable from "../component/CheckAvilable";
import { UTCtime } from "../assets/utiles/dateIST";
import toast from "react-hot-toast";
import Spinner from "../component/Spinner";

const url = import.meta.env.VITE_APP_BACKEND_URL;

function Cabin() {
  const { cabinID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleCabin, isLoadingCabin } = useSelector((state) => state.cabin);
  const { user, token, authenticate, errorAuth } = useSelector(
    (state) => state.auth
  );

  const [bookingOption, setBookingOption] = useState({
    nights: 1,
    price: singleCabin?.price,
    title: singleCabin?.title,
    totalAmount: 0,
  });
  const [reserveForm, setReserveForm] = useState({
    accommodateGuestsCount: "",
    specialNote: "",
  });
  const [range, setRange] = useState({ from: undefined, to: undefined });

  useEffect(function () {
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://checkout.razorpay.com/v1/checkout.js";
    scriptTag.async = true;
    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(
    function () {
      document.title = `Haven Hills | ${singleCabin?.title}`;
      return () => {
        document.title = `Haven Hills`;
      };
    },
    [singleCabin]
  );

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

  useEffect(
    function () {
      dispatch(getCabin(cabinID));

      return () => {
        dispatch(clearSingleCabin());
      };
    },
    [cabinID, dispatch]
  );

  useEffect(
    function () {
      if (token) {
        if (!user) {
          dispatch(getMe(token));
        }
      }
    },
    [user, dispatch, token]
  );

  useEffect(
    function () {
      setBookingOption((cur) => ({
        ...cur,
        price: singleCabin?.price,
        title: singleCabin?.title,
      }));
    },
    [singleCabin]
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setReserveForm((cur) => ({ ...cur, [name]: value }));
  }

  function validte() {
    let err = {};
    if (!bookingOption.nights && bookingOption.nights <= 0)
      err.nightsErr = "please select dates for you reservation.";
    if (!bookingOption.price) err.nightsErr = "required";
    if (!bookingOption.title) err.nightsErr = "required";
    if (!reserveForm.accommodateGuestsCount) err.nightsErr = "required";
    if (!reserveForm.specialNote) err.nightsErr = "required";
    return err;
  }

  async function handleReservation(e) {
    e.preventDefault();
    let amount = bookingOption.price * bookingOption.nights * 100;
    const errObj = validte();
    if (Object.keys(errObj).length > 0) {
      return;
    }

    if (!authenticate) {
      return navigate("/haven/login");
    }

    try {
      const order = await axios.post(
        `${url}/api/v1/payment/create-payment-order/${cabinID}`,
        {
          amount: amount,
          currency: "INR",
          note: {
            user: `${user?.firstName} ${user?.lastName}`,
            cabin: singleCabin?.title,
          },
          start: UTCtime(range?.from),
          end: UTCtime(range?.to),
          accommodateGuestsCount: reserveForm.accommodateGuestsCount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { paymentOrder } = order.data;

      const options = {
        key: import.meta.env.VITE_APP_RAZORPAY_KEY_ID,
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        name: "Haven Hills",
        description: "Test Transaction",
        order_id: paymentOrder.id,
        handler: async function (response) {
          console.log("4");
          const verify = await axios.post(
            `${url}/api/v1/payment/verify-payment`,
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const bookingData = {
            start: range?.from,
            end: range?.to,
            accommodateGuestsCount: reserveForm?.accommodateGuestsCount,
            specialNote: reserveForm?.specialNote,
            nights: bookingOption.nights,
            paymentSummary: paymentSummary(
              bookingOption.nights,
              singleCabin?.price,
              0,
              response.razorpay_order_id,
              response.razorpay_payment_id
            ),
          };
          if (verify.data.message === "Payment verified successfully") {
            dispatch(bookCabin({ cabinID, token, bookingData })).then((res) => {
              if (res.type === "bookCabin/fulfilled") {
                toast("cabin booked.");
                setBookingOption((cur) => ({ ...cur, nights: 1 }));
                setRange({ from: undefined, to: undefined });
                setReserveForm({
                  accommodateGuestsCount: "",
                  specialNote: "",
                });
              } else {
                alert("someting wrong");
              }
            });
          } else {
            alert("payment is not successful");
          }
        },
        prefill: {
          name: `${user?.firstName} ${user?.lastName}`,
          email: user?.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      if (err?.response?.data?.message) {
        toast(`${err?.response?.data?.message?.err}`);
      }
    }
  }

  return (
    <div className="w-[90%] mx-auto">
      {isLoadingCabin && <Spinner />}
      {singleCabin && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="col-span-1 md:col-span-1 relative">
              <img
                src={singleCabin?.image[0].url}
                alt=""
                className=" w-[100%] "
              />
              <span
                className="absolute text-amber-500 top-6 left-2 lg:top-[4rem] lg:left-auto lg:right-[-8rem] px-5 lg:px-10 text-lg lg:text-4xl font-bold py-2 lg:py-4 cursor-pointer backdrop-blur-md"
                style={{ background: "#e2e1e129" }}
              >
                {singleCabin?.title}
              </span>
            </div>

            <div className="col-span-1 md:col-span-1 lg:mt-auto">
              <div className="h-full border border-gray-800 p-5 lg:h-auto">
                <p className="text-gray-400 text-lg lg:text-xl text-center">
                  {singleCabin?.description}
                </p>
                <div className="mt-5 flex items-start gap-4">
                  <Users className="text-blue-600" />
                  <span className="text-gray-500 md:text-xl text-sm">
                    for upto {singleCabin?.capacity} guests
                  </span>
                </div>
                <div className="mt-5 flex items-start gap-4">
                  <MapPin className="text-red-500" />
                  <span className="text-gray-500 md:text-xl text-sm">
                    {singleCabin?.location}.
                  </span>
                </div>
                <div className="mt-5 flex items-start gap-4">
                  <Shield className="text-green-700" />
                  <span className="text-gray-500 md:text-xl text-sm">
                    100% privacy
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <h1 className="text-center text-xl sm:text-2xl lg:text-4xl text-gray-400 font-semibold">
              Reserver <span>{singleCabin?.title}</span>. Pay for arraival . . .
            </h1>
            <CheckAvilable />
            <div className="grid grid-cols-1 lg:grid-cols-7 mt-10">
              <MyDatePicker
                setBookingOption={setBookingOption}
                bookingOption={bookingOption}
                range={range}
                setRange={setRange}
              />
              <Reservation
                handleReservation={handleReservation}
                reserveForm={reserveForm}
                handleChange={handleChange}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cabin;
