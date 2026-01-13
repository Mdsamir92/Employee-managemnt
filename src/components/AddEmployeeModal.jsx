import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { closeEmployeePopup } from "../features/popup/popupSlice";
import { addEmployee, updateEmployee } from "../features/employee/employeeThunk";
import { useEffect, useState } from "react";

export default function AddEmployeeModal() {
  const dispatch = useDispatch();

  const { selectedEmployee } = useSelector((state) => state.popup);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    profileUrl: "",
  });

  useEffect(() => {
    if (selectedEmployee) {
      setFormData(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedEmployee) {
      await dispatch(
        updateEmployee({
          id: selectedEmployee.id,
          data: formData,
        })
      );
      
    } else {
      await dispatch(addEmployee(formData));
    }
    dispatch(closeEmployeePopup());
  };

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        animate-fadeIn
      "
      onClick={() => dispatch(closeEmployeePopup())}
    >
      <div
        className="
          bg-white w-full max-w-md rounded-xl p-6 relative
          animate-scaleIn
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => dispatch(closeEmployeePopup())}
          className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {selectedEmployee ? "Edit Employee" : "Add Employee"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Name"
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            name="profileUrl"
            value={formData.profileUrl}
            onChange={(e) =>
              setFormData({ ...formData, profileUrl: e.target.value })
            }
            placeholder="Profile Image URL"
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            name="bio"
            value={formData.bio}
            onChange={(e) =>
              setFormData({ ...formData, bio: e.target.value })
            }
            placeholder="Bio"
            rows="3"
            className="w-full border px-3 py-2 rounded"
          />

          <button
            type="submit"
            className="cursor-pointer w-full bg-indigo-600 text-white py-2 rounded-lg"
          >
            {selectedEmployee ? "Update Employee" : "Save Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}
