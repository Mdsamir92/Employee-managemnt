import {configureStore} from "@reduxjs/toolkit"
import  PopupReducer  from "../features/popup/popupSlice"
import  EmployeeReducer  from "../features/employee/employeeSlice"


export const store = configureStore({
    reducer:{
        popup:PopupReducer,
        employee:EmployeeReducer
    },
})