import { useState, useEffect, } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          SmileCare
        </h1>

        {/* Links */}
        <ul className="hidden md:flex gap-8 font-medium">
          <li className="cursor-pointer hover:text-blue-500 transition"><Link to="/">Home</Link></li>
          <li className="cursor-pointer hover:text-blue-500 transition"><Link to="/about">About</Link></li>
          <li className="cursor-pointer hover:text-blue-500 transition"><Link to="/services">Services</Link></li>
          <li className="cursor-pointer hover:text-blue-500 transition"><Link to="/Doctors">Doctors</Link></li>
          <li className="cursor-pointer hover:text-blue-500 transition"><Link to="/contact">Contact</Link></li>
        </ul>
         <button
            className="lg:hidden transform hover:scale-125 transition-transform duration-300 hover:bg-white/10 p-2 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <ul className="lg:hidden flex flex-col items-center gap-6 pb-6 text-lg">
       <li>
              <Link
                to="/"
                className="hover:text-blue-500 cursor-pointer text-lg">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="About"
                className="hover:text-blue-500 cursor-pointer text-lg">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-500 cursor-pointer text-lg"
              >
                Contact
              </Link>
            </li>
          </ul>
        )}
      </nav>
       
    
  );
};

export default Navbar;