import { configureStore } from "@reduxjs/toolkit";
import taskReducer from '../store/slice/tasksSlice'

export const store = configureStore({
    reducer : {
        tasks : taskReducer
    }
})