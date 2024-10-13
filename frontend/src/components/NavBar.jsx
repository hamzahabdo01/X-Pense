import { Link } from "react-router-dom";

function NavBar() {

  return (
    <div className="flex justify-center relative top-6">
      <nav className="bg-teal-500 p-4 rounded-full w-3/4">
        <div className="flex justify-between items-center">
          <div className="text-black text-lg font-semibold ml-8">
            <Link to="/" className="text-white">X-Pense</Link>
          </div>
          <div className="space-x-7 mr-8">
              <>
                <Link to="/login" className="text-white">
                  LOGIN
                </Link>
                <Link to="/register" className="text-white">
                  REGISTER
                </Link>
              </>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
