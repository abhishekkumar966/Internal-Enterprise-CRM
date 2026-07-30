const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Internal Enterprise CRM
        </h1>
        <p className="text-sm text-gray-500">
          Multi Product Admin Panel
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-gray-800">Admin</p>
          <p className="text-xs text-gray-500">System Administrator</p>
        </div>

        <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </header>
  );
};

export default Navbar;