import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { Bed, Calendar, Info, Menu, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearAuth } from "../slice/authSlice";
import { clearBooking } from "../slice/bookingSlice";

function Header() {
  const dispatch = useDispatch();

  const { authenticate } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);

  function handleLogout() {
    dispatch(clearAuth());
    dispatch(clearBooking());
  }

  function toggeleNav() {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => setShowNav(false), 140);
    } else {
      setIsOpen(true);
      setShowNav(true);
    }
  }

  return (
    <header className="text-slate-100 sticky top-0 w-[100%] z-50">
      <div>
        <div className="bg-[#030616f3]">
          <div className="w-[90%] mx-auto h-16 flex justify-between items-center bg-[#030616f3]">
            {/* logo  */}
            <div className="z-8 flex items-center px-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10">
                <img src={logo} className="w-full rounded-lg" alt="..." />
              </div>
              <h1 className="text-xl lg:text-2xl font-bold text-amber-400 ms-3 bg">
                Haven Hills
              </h1>
            </div>

            <nav className="hidden md:flex md:gap-5 lg:gap-8">
              <Links val={"cabins"} icon={Bed}>
                cabins
              </Links>
              <Links val={authenticate ? "bookings" : "login"} icon={Calendar}>
                Bookings
              </Links>
              <Links val={"about"} icon={Info}>
                About
              </Links>
            </nav>
            <div className="hidden md:flex gap-3 lg:gap-6 items-center">
              <Links val={authenticate ? "profile" : "login"} icon={User}>
                Profile
              </Links>
              <Link to="login">
                {authenticate ? (
                  <button
                    className="text-[1rem] lg:text-lg flex gap-4 items-center border border-slate-700 hover:bg-gray-700 duration-300 px-4 py-[0.2rem] rounded-lg cursor-pointer text-slate-400 hover:text-slate-600"
                    onClick={handleLogout}
                  >
                    log out
                  </button>
                ) : (
                  <button className=" text-[1rem] lg:text-lg flex gap-4 items-center border border-slate-700 hover:bg-gray-700 duration-300 px-4 py-[0.2rem] rounded-lg cursor-pointer text-slate-400">
                    login
                  </button>
                )}
              </Link>
            </div>
            <div className="md:hidden">
              <button className="ms-auto" onClick={toggeleNav}>
                <Menu />
              </button>
            </div>
          </div>
        </div>

        {/* nav links */}
        {showNav && (
          <div className={`z-0 bg-[#030616f3]  ${isOpen ? "nav" : "nav_anti"}`}>
            <nav className="md:hidden pt-2 w-[84%] mx-auto flex flex-col gap-4 py-4">
              <Links val={"cabins"} icon={Bed} toggeleNav={toggeleNav}>
                cabins
              </Links>
              <Links
                val={authenticate ? "bookings" : "login"}
                icon={Calendar}
                toggeleNav={toggeleNav}
              >
                Bookings
              </Links>
              <Links val={"about"} icon={Info} toggeleNav={toggeleNav}>
                About
              </Links>
              <Links
                val={authenticate ? "profile" : "login"}
                icon={User}
                toggeleNav={toggeleNav}
              >
                Profile
              </Links>
              <Link to="login">
                {authenticate ? (
                  <button
                    className="text-xl flex gap-4 items-center border border-gray-700 hover:bg-gray-700 duration-300 px-4 py-[0.2rem] rounded-lg cursor-pointer text-slate-500 hover:text-slate-400"
                    onClick={() => {
                      handleLogout();
                      toggeleNav();
                    }}
                  >
                    log out
                  </button>
                ) : (
                  <button
                    onClick={() => toggeleNav()}
                    className="text-xl flex gap-4 items-center duration-300 px-4 py-[0.2rem] rounded-lg cursor-pointer border border-gray-700 hover:bg-gray-700 text-slate-500 hover:text-slate-400"
                  >
                    login
                  </button>
                )}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function Links({ children, val, icon: Icon, toggeleNav }) {
  return (
    <NavLink
      to={val}
      className="flex gap-2 text-slate-400 hover:text-slate-600"
      onClick={toggeleNav}
    >
      <Icon />
      <span className="text-[1rem] lg:text-lg font-semibold">{children}</span>
    </NavLink>
  );
}

export default Header;
