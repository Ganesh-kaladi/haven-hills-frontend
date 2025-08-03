import { useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useSelector } from "react-redux";
import { ISTdate } from "../assets/utiles/dateIST";

function MyDatePicker({ setBookingOption, range, setRange, bookingOption }) {
  const { availableDate } = useSelector((state) => state.booking);

  useEffect(() => {
    let amount = 0;
    if (!range?.from || !range?.to) {
      setBookingOption((cur) => ({ ...cur, nights: 0 }));
      return;
    } else if (range?.from && range?.to) {
      const to = new Date(range?.to);
      const from = new Date(range?.from);
      const days = (to - from) / (1000 * 60 * 60 * 24) + 1;
      amount = bookingOption?.price * 1 * (days * 1);
      setBookingOption((cur) => ({
        ...cur,
        nights: days,
        totalAmount: amount * 1,
      }));
    }
  }, [range, bookingOption?.price, setBookingOption]);

  return (
    <div className="col-span-4 h-full flex flex-col w-full bg-gray-900 ">
      <div className="">
        <DayPicker
          mode="range"
          numberOfMonths={2}
          selected={range}
          onSelect={setRange}
          disabled={availableDate?.map((r) => ({
            from: ISTdate(new Date(r.start)),
            to: ISTdate(new Date(r.end)),
          }))}
          classNames={{
            today: "",
            selected: "text-amber-600",
            range_start: "bg-amber-600 text-white rounded-full",
            range_end: "bg-amber-600 text-white rounded-full",
            button_next: "text-amber-700",
            button_previous: "text-amber-700",
            day: "text-amber-400 w-full",
            weekday: "text-amber-800",
            month: "text-amber-800",
            outside: "text-amber-600",
            caption_after_enter: "text-amber-600 bg-amber-400",
          }}
        />
      </div>

      <div className="mt-auto w-full">
        <div className="bg-amber-600 flex items-center justify-around py-3 ">
          <div>
            <span className="font-semibold text-xl">
              $&nbsp;{bookingOption?.price}
            </span>
            <span>/night</span>
          </div>
          <div className="">
            <span className="bg-amber-700 px-2 py-2 ">
              X {bookingOption?.nights}
            </span>
            &nbsp; night
          </div>
          <div className="flex items-center">
            total:&nbsp;
            <span className="ml-2 text-xl font-semibold">
              $&nbsp;{bookingOption?.totalAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDatePicker;
