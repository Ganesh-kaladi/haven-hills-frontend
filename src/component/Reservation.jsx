function Reservation({ handleReservation, reserveForm, handleChange }) {
  return (
    <div className="col-span-3 bg-gray-800">
      <p className="bg-slate-700 text-gray-400 px-4 py-2">Reserve This Room</p>

      <form action="" className="p-4" onSubmit={handleReservation}>
        <div className="flex flex-col space-y-1">
          <label htmlFor="guests" className="text-gray-400 text-xl">
            Number of Guests
          </label>
          <select
            id="guests"
            name="accommodateGuestsCount"
            value={reserveForm?.accommodateGuestsCount}
            className="px-3 py-1 rounded mt-2 border-slate-200 bg-sky-300 text-2xl text-gray-800 focus:outline-none"
            required
            onChange={handleChange}
          >
            <option value="">--select--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="flex flex-col space-y-1 mt-5">
          <label htmlFor="comfortNeeds" className="text-gray-400 text-xl">
            Anything to make your stay more comfortable?
          </label>
          <textarea
            id="comfortNeeds"
            name="specialNote"
            value={reserveForm?.specialNote}
            className="px-3 py-1 mt-2 border-slate-200 rounded bg-sky-300 text-2xl text-gray-800 focus:outline-0"
            placeholder="e.g. Need extra pillows, prefer mountain view, etc."
            rows={3}
            onChange={handleChange}
          />
        </div>
        <div className="text-end mt-5">
          <button
            // disabled
            type="submit"
            className="text-lg text-gray-200 cursor-pointer border border-gray-200 px-5 py-1 rounded-lg hover:text-gray-400 hover:border-gray-400 hover:scale-[0.9] transition-all"
          >
            reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Reservation;
