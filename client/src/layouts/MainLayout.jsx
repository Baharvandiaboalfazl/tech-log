import { Outlet } from "react-router-dom";
import Navbar from "../components/main/Navbar";
import Footer from "../components/main/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen mt-20 bg-color">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
