import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addEmployee = createAsyncThunk(
    "employee/addEmployee",
    async (employeeData, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          "https://694be186da5ddabf00358006.mockapi.io/employee",
          employeeData
        );
  
        return response.data; // ✅ newly created employee
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


export const getEmployees = createAsyncThunk(
  "employee/getEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://694be186da5ddabf00358006.mockapi.io/employee"
      );
      return response.data; // ✅ VERY IMPORTANT
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
    "employee/updateEmployee",
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          `https://694be186da5ddabf00358006.mockapi.io/employee/${id}`,
          data
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

  
export const deleteEmployee = createAsyncThunk(
    "employee/deleteEmployee",
    async (id, { rejectWithValue }) => {
      try {
        await axios.delete(
          `https://694be186da5ddabf00358006.mockapi.io/employee/${id}`
        );
  
        return id; // 🔥 sirf id return karni hai
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );