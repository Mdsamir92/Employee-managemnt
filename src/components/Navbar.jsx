import { Link } from "react-router-dom";
import { FiSearch, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { openEmployeePopup } from "../features/popup/popupSlice";
import AddEmployeeModal from "./AddEmployeeModal";
import { setSearchQuery } from "../features/employee/employeeSlice";

export default function Navbar() {

  const dispatch = useDispatch();

  const Popup = useSelector(
    (state) => state.popup.employeePopup);

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between  items-center h-16">

            {/* Logo */}
            <Link to="/" className="md:block hidden md:text-2xl text-lg font-bold px-2 text-indigo-600">
              MyLogo
            </Link>

            <div className="flex items-center gap-4">
              {/* SEARCH */}
              <div className="relative group">
                <FiSearch
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2
                 text-gray-400 group-focus-within:text-indigo-600"
                />
                <input
                  type="text"
                  placeholder="Search employees..."
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="w-56 sm:w-64 pl-11 pr-4 py-2 rounded-full
                 border text-sm transition-all duration-300
                 focus:w-72 focus:ring-2 focus:ring-indigo-100
                 focus:border-indigo-500 outline-none"
                />
              </div>

              {/* ADD BUTTON */}
              <button
                onClick={() => dispatch(openEmployeePopup())}
                className="flex items-center gap-1 bg-indigo-600
               text-white px-4 py-2 rounded-full
               hover:bg-indigo-700 transition"
              >
                <FiPlus size={18} />
                <span className="hidden sm:block">Add</span>
              </button>
            </div>


          </div>
        </div>
      </nav>

      {/* 🔥 MODAL HERE */}
      {Popup && <AddEmployeeModal />}
    </>
  );
}
