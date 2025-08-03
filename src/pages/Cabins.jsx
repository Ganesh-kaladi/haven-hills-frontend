import { ArrowRightIcon, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCabins, getAllCabinsUsingFilter } from "../slice/cabinSlice";
import Spinner from "../component/Spinner";

function Cabins() {
  const dispatch = useDispatch();

  const { allCabins, isLoadingCabin } = useSelector((state) => state.cabin);

  const [query, setQuery] = useState({
    price: "",
    guests: "",
  });

  useEffect(
    function () {
      if (!query.price & !query.guests) {
        if (allCabins?.length > 0) {
          return;
        }
        dispatch(getAllCabins());
      } else {
        let queryOptions = query.price === "" ? "" : `?${query.price}`;
        queryOptions =
          queryOptions === ""
            ? `?${query.guests}`
            : `${queryOptions}&${query.guests}`;
        dispatch(getAllCabinsUsingFilter(queryOptions));
      }
    },
    [dispatch, query]
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setQuery((cur) => ({ ...cur, [name]: value }));
  }

  return (
    <div className="w-[80%] mx-auto">
      <div className="text-center lg:text-start">
        <h1 className="text-amber-200 text-xl md:text-2xl pt-4">
          Stay Where Comfort Meets the Hills
        </h1>
        <p className=" mx-auto text-slate-400 text-sm  md:text-lg mt-3">
          Each of our rooms is thoughtfully selected to offer not just a place
          to sleep, but an experience to remember. Wake up to breathtaking hill
          views, enjoy fresh air away from city noise, and relax in cozy,
          well-equipped spaces designed for all kinds of travelers. Whether
          you're on a solo trip, a work visit, or a family getaway, our hillside
          rooms combine comfort, convenience, and nature in perfect harmony.
        </p>
      </div>
      <div className="mt-10 border-t py-10 border-slate-600">
        <div className="w-full flex flex-col gap-4 sm:items-end md:flex-row md:justify-end">
          <span className="text-gray-400 text-xl block ">sort by :</span>
          <select
            name="guests"
            onChange={handleChange}
            className="w-full sm:w-[240px] border border-slate-100 py-2 rounded-sm px-4 text-gray-400 text-lg bg-[#030616f3]  cursor-pointer"
          >
            <option value="">-- select --</option>
            <option value="capacity[lte]=2">up to 2 guests</option>
            <option value="capacity[lte]=4">up to 4 guests</option>
            <option value="capacity[lte]=6">up to 6 guests</option>
            <option value="capacity[lte]=8">up to 8 guests</option>
            <option value="capacity[gt]=8">above 8 guests</option>
          </select>
          <select
            name="price"
            onChange={handleChange}
            className="w-full sm:w-[240px] border border-slate-100 py-2 rounded-sm px-4 text-gray-400 text-lg bg-[#030616f3]  cursor-pointer"
          >
            <option value="">-- select --</option>
            <option value="price[lte]=3000">below 3000</option>
            <option value="price[gte]=3000&price[lte]=4000">3000-4000</option>
            <option value="price[gt]=4000">above 4000</option>
          </select>
        </div>
      </div>

      <div className="min-h-[60vh]">
        {isLoadingCabin && <Spinner />}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 mt-6">
          {allCabins?.length > 0 &&
            allCabins?.map((el) => {
              return <CabinCard el={el} key={el._id} />;
            })}
          {allCabins?.length <= 0 && (
            <div className="lg:col-span-2 mx-auto text-3xl text-amber-200">
              cabins not found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CabinCard({ el }) {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col sm:flex-row gap-4 border border-gray-800">
      <div className="w-full sm:w-[280px]">
        <img
          src={el?.image[0].url}
          alt=""
          className="w-full h-full  rounded-lg"
        />
      </div>
      <div className="px-4 py-5 w-full">
        <h5 className="text-amber-600 text-2xl">{el.title}</h5>
        <p className="flex gap-4 items-center mt-1">
          <Users size={14} className="text-blue-900" />
          <span className="text-gray-500 text-sm">
            for up to {el.capacity} guests
          </span>
        </p>
        <div className="text-gray-400 text-end mt-2">
          <span className="text-3xl text-gray-300">
            &#8377;&nbsp;{el.price}
          </span>
          / night
        </div>
        <div className=" flex justify-end align-center border-t border-gray-800 pt-3 mt-2">
          <button
            className="flex text-gray-400 text-sm items-center cursor-pointer hover:text-gray-600"
            onClick={() => navigate(`${el._id}`)}
          >
            details & reservation <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cabins;
