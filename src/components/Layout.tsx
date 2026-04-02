import  {type ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Layout;