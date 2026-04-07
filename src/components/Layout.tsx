
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router";




const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet/>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Layout;