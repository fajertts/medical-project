const Navbar = () => {
  return (
    <header className="h-20 bg-white shadow flex items-center justify-between px-8">
      <div>
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center">
          A
        </div>

        <div>
          <p className="font-semibold">
            Admin
          </p>

          <span className="text-gray-500 text-sm">
            SmileCare
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;