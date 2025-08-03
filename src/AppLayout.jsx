import Header from "./component/Header";
import Footer from "./component/Footer";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <Header />
      <main className={`min-h-[70vh] mt-4 transition-all duration-500 `}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
