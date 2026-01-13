import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { openEmployeePopup } from "../features/popup/popupSlice";
import AddEmployeeModal from "./AddEmployeeModal";
import { useEffect } from "react";
import { getEmployees } from "../features/employee/employeeThunk";
import { deleteEmployee } from "../features/employee/employeeThunk";


// const employeesData = [
//   {
//     id: 1,
//     name: "Samir Khan",
//     email: "samir@gmail.com",
//     bio: "Frontend Developer with React & Tailwind experience.",
//     image: "https://i.pravatar.cc/150?img=3",
//   },
//   {
//     id: 2,
//     name: "Aman Verma",
//     email: "aman@gmail.com",
//     bio: "Backend Developer skilled in Node.js & MongoDB.",
//     image: "https://i.pravatar.cc/150?img=5",
//   },
//   {
//     id: 3,
//     name: "Rohit Sharma",
//     email: "rohit@gmail.com",
//     bio: "Full Stack Developer passionate about clean UI.",
//     image: "https://i.pravatar.cc/150?img=7",
//   },
// ];



 function Employees() {

  const dispatch = useDispatch();

  const { employees, loading, error ,searchQuery} = useSelector((state) => state.employee);

  
  
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery) ||
    emp.email.toLowerCase().includes(searchQuery) ||
    emp.bio.toLowerCase().includes(searchQuery)
  );
  
  const popup = useSelector((state) => state.popup.employeePopup);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!Array.isArray(employees)) return <p>Invalid data</p>;
  if (employees.length === 0) return <p>No employees found</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredEmployees.map((emp) => (
        <div
          key={emp.id}
          className="bg-white rounded-xl shadow-md p-5 relative"
        >
          {/* Buttons */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
               onClick={() => dispatch(openEmployeePopup(emp))}
              className="cursor-pointer p-2 rounded-full bg-gray-100 hover:bg-indigo-100 text-indigo-600"
            >
              <FiEdit2 size={16} />
            </button>

            <button className="cursor-pointer p-2 rounded-full bg-gray-100 hover:bg-red-100 text-red-600">
              <FiTrash2 size={16} 
                 onClick={() => dispatch(deleteEmployee(emp.id))}
              />
            </button>
          </div>

          {/* Image */}
          <img
            src={emp.profileUrl}
            alt={emp.name}
            className="w-20 h-20 rounded-full object-cover mx-auto"
            onError={(e) => {
              e.target.src = "https://i.pravatar.cc/150?img=3";
            }}
          />

          {/* Info */}
          <div className="text-center mt-4">
            <h2 className="text-lg font-semibold">{emp.name}</h2>
            <p className="text-sm text-gray-500">{emp.email}</p>
            <p className="text-sm text-gray-600 mt-2">{emp.bio}</p>
          </div>
        </div>
      ))}

      {popup && <AddEmployeeModal />}
    </div>
  );
}


export default Employees