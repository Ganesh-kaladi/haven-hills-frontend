import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkDates } from "../slice/bookingSlice";
import { useParams } from "react-router-dom";
import { UTCtime } from "../assets/utiles/dateIST";

function CheckAvilable() {
  const dispatch = useDispatch();
  const { cabinID } = useParams();

  const [checkDate, setCheckDate] = useState({
    start: "",
    end: "",
  });

  function handleChenge(e) {
    const { name, value } = e.target;
    setCheckDate((cur) => ({ ...cur, [name]: value }));
  }

  function handleCheckBtn() {
    if (!checkDate.start || !checkDate.end) {
      return;
    }
    dispatch(
      checkDates({
        cabinID,
        start: UTCtime(checkDate.start),
        end: UTCtime(checkDate.end),
      })
    );
  }
  return (
    <div className="mt-6">
      <div className="flex flex-col lg:flex-row lg:justify-end md:items-end gap-6 p-4">
        <div className="flex gap-2 items-center">
          <label
            htmlFor="start"
            className="text-gray-500 text-xl font-semibold w-[40%] sm:w-[28%] md:w-[auto]"
          >
            start date&nbsp;&nbsp;<b>:</b>
          </label>
          <input
            type="date"
            id="start"
            name="start"
            onChange={handleChenge}
            className="border border-gray-600 rounded bg-gray-800 px-4 py-1 text-gray-400 focus:outline-none w-[60%] sm:w-[72%] md:w-[auto]"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label
            htmlFor="end"
            className="text-gray-500 text-xl font-semibold w-[40%] sm:w-[28%] md:w-[auto]"
          >
            end date&nbsp;&nbsp;<b>:</b>
          </label>
          <input
            type="date"
            id="end"
            name="end"
            onChange={handleChenge}
            className="border border-gray-600 rounded bg-gray-800 px-4 py-1 text-gray-400 focus:outline-none w-[60%] sm:w-[72%] md:w-[auto]"
          />
        </div>
        <div>
          <button
            className="border w-full md:w-auto border-gray-600 text-gray-300 px-4 py-1 rounded cursor-pointer hover:bg-gray-800 hover:text-gray-400 duration-300"
            onClick={handleCheckBtn}
          >
            check availab cabins
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckAvilable;
