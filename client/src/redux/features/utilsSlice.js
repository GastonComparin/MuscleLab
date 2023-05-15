import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'Light',
    plansClicked: false,
}


const utilsSlice = createSlice ({
    name: 'utils',
    initialState,
    reducers: {
        darkMode: (state) => {
            state.mode = 'Dark'
        },
        lightMode: (state) => {
            state.mode = 'Light'
        },
        setPlansCLick: (state, {payload}) => {
            state.plansClicked = payload;
        }
    }
})

export const selectMode = (state) => state.utils.mode;
export const selectPlansClicked = (state) => state.utils.plansClicked;

export default utilsSlice.reducer;
export const {darkMode, lightMode, setPlansCLick} = utilsSlice.actions;