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

            {/* Right */}
            <div className="flex items-center   gap-4">
              <input
                type="text"
                placeholder="Search employee..."
                className="border px-3 py-1 rounded-full text-sm outline-none"
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              />


              {/* ADD BUTTON */}
              <button
                onClick={() => dispatch(openEmployeePopup())}
                className="flex cursor-pointer items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700"
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
