import { MapPin, Phone, Mail, Facebook, Instagram, X } from "lucide-react";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className=" pb-6 mt-18 pt-10 bg-[#030616f3]">
      <div className="w-[80%] mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
          <div>
            <div className="flex gap-1 justify-center md:justify-start">
              <div className="w-8 h-8">
                <img src={logo} className="w-full rounded-lg" alt="..." />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-amber-500 ms-3">
                Haven Hills
              </h1>
            </div>
            {/* <h5 className="text-slate-400 text-xl md:text-2xl mt-4 text-center md:text-start">
              About Haven Hills
            </h5> */}
            <p className="text-slate-400 text-sm md:text-lg mt-2 text-center md:text-start">
              Escape to serenity at Haven Hills — where luxury meets nature. Our
              hillside rooms offer breathtaking views, peaceful surroundings,
              and the perfect blend of comfort and beauty.
            </p>
          </div>

          <div className="md:px-8">
            <div>
              <h5 className="text-slate-400 text-xl md:text-2xl text-center md:text-start mb-2">
                Contact us
              </h5>
              <ul>
                <li className="flex gap-4 mb-3">
                  <span className="text-blue-500">
                    <MapPin />
                  </span>
                  <span className="text-slate-400">
                    123 Hostel Street, City Center
                  </span>
                </li>
                <li className="flex gap-4 mb-3">
                  <span className="text-blue-500">
                    <Phone />
                  </span>
                  <span className="text-slate-400">+1 (555) 123-4567</span>
                </li>
                <li className="flex gap-4 mb-3">
                  <span className="text-blue-500">
                    <Mail />
                  </span>
                  <span className="text-slate-400">info@lovableai.com</span>
                </li>
              </ul>
            </div>
            <div className="flex gap-4 text-slate-100 mt-5">
              <span>
                <Facebook size={30} />
              </span>
              <span>
                <Instagram size={30} />
              </span>
              <span>
                <X size={30} />
              </span>
              <span></span>
            </div>
          </div>
        </div>
        <hr className="text-gray-800" />

        <p className="text-center text-slate-400 mt-6">
          © 2025 Haven Hills. All rights reserved. Made with ❤️ for travelers.
          tis is a educational project.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
