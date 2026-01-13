import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    employeePopup: false,
    selectedEmployee: null,
  };
  
  export const PopupSlice = createSlice({
    name: "popup",
    initialState,
    reducers: {
      openEmployeePopup: (state, action) => {
        state.employeePopup = true;
        state.selectedEmployee = action.payload || null;
      },
      closeEmployeePopup: (state) => {
        state.employeePopup = false;
        state.selectedEmployee = null;
      },
    },
  });
  
  export const {
    openEmployeePopup,
    closeEmployeePopup,
  } = PopupSlice.actions;
  
  export default PopupSlice.reducer;
  