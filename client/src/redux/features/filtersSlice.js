import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alphabetFilter: false,
    intensityFilter: false,
    selectedTypes: [],
    selectedIntensities: [] 
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setAlphabetFilter: (state, {payload}) => {
            state.alphabetFilter = payload;
        },
        setIntensityFilter: (state, {payload}) => {
            state.intensityFilter = payload;
        },
        setSelectedTypes: (state, {payload}) => {
            state.selectedTypes = payload;
        },
        setSelectedIntensities: (state, {payload}) => {
            state.selectedIntensities = payload;
        }

    }
})

export const selectAlphabetFilter = (state) => state.filters.alphabetFilter;
export const selectIntensityFilter = (state) => state.filters.intensityFilter;
export const selectSelectedTypes = (state) => state.filters.selectedTypes;
export const selectSelectedIntensities = (state) => state.filters.selectedIntensities;

export default filtersSlice.reducer;
export const {setAlphabetFilter, setIntensityFilter, setSelectedTypes, setSelectedIntensities} = filtersSlice.actions;