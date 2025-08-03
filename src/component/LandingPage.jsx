import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0 bg__image"></div>

      <div className="relative z-10 h-[10vh] flex items-center container mx-auto px-4">
        <div className="w-12 h-12">
          <img src={logo} className="w-full rounded-lg" alt="..." />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-amber-500 ms-3">
          Haven Hills
        </h1>
      </div>

      <div className="relative z-10 h-[90vh] flex justify-center items-center">
        <div className="w-full max-w-[680px] text-center  p-6">
          <h1 className="text-xl md:text-4xl text-amber-500  font-bold mb-4">
            Heaven Hills
          </h1>
          <p className="text-sm md:text-xl text-white mb-6 ">
            Discover the perfect stay nestled in the heart of nature. Our
            platform connects travelers, students, and professionals with
            comfortable rooms located near serene hill destinations. Whether
            you're seeking a weekend escape, a peaceful work retreat, or
            long-term accommodation, we make finding hillside stays easy,
            affordable, and reliable. Start your journey to the hills
            today—comfort, views, and fresh air await.
          </p>
          <button
            className=" bg-amber-400 text-amber-900 font-bold cursor-pointer px-5 py-2 rounded-sm hover:bg-amber-500 transition"
            onClick={() => navigate("haven")}
          >
            Explore Heaven Hills
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
