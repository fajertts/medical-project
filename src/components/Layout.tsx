import Navbar from "./navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";


const Layout = () => {
  return (
    <div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
       <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Layout;