import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer/Footer";

const RootRoutes = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-156px)] px-20">
        <Outlet />
      </div>
      <div className="px-20">
        <Footer />
      </div>
    </div>
  );
};

export default RootRoutes;
