import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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
          <li className="cursor-pointer hover:text-blue-500 transition"><a href="#Home">Home</a> </li>
          <li className="cursor-pointer hover:text-blue-500 transition"><a href="#About">About</a></li>
          <li className="cursor-pointer hover:text-blue-500 transition"><a href="#Services">Services</a></li>
          <li className="cursor-pointer hover:text-blue-500 transition"><a href="#Doctors">Doctors</a></li>
          <li className="cursor-pointer hover:text-blue-500 transition"><a href="#Contact">Contact</a></li>
        </ul>

       
      </div>
    </nav>
  );
};

export default Navbar;