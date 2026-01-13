import { createSlice } from "@reduxjs/toolkit";
import {  addEmployee, getEmployees, updateEmployee, deleteEmployee } from "./employeeThunk";

const initialState = {
    employees: [],
    loading: false,
    error: null,
    searchQuery: "",
};

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload.toLowerCase();
          },
    },

    extraReducers: (builder) => {
        builder

          // ✅ POST employees
          
          .addCase(addEmployee.pending, (state) => {
            state.loading = true;
        })
        .addCase(addEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.employees.unshift(action.payload); // 🔥 instant UI update
        })
        .addCase(addEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

            // ✅ GET
            .addCase(getEmployees.pending, (state) => {
                state.loading = true;
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            //    Edit employee
            .addCase(updateEmployee.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false;

                const index = state.employees.findIndex(
                    (emp) => emp.id === action.payload.id
                );

                if (index !== -1) {
                    state.employees[index] = action.payload; // 🔥 update in place
                }
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

           
            // 🔴 DELETE
            .addCase(deleteEmployee.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.loading = false;

                state.employees = state.employees.filter(
                    (emp) => emp.id !== action.payload
                );
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});
export const { setSearchQuery } = employeeSlice.actions;

export default employeeSlice.reducer;