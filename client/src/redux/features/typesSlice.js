import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PORT, URL, pending, rejected, fulfilled } from "../../utils/constants";
import axios from 'axios';

const fetchAllLessonTypes = createAsyncThunk(
    'types/fetchAllLessonTypes', async () => {
        try {
            const response = await axios.get(`${URL}/types`);
            return response.data
        } catch (error) {
            throw new Error(error.response)
        }

    }
)
const initialState = {
    types: [],
    status: 'idle',
    error: ''
};

const typesSlice = createSlice({
    name: 'types',
    initialState,
    reducers: {
        // aquí van las otras acciones
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLessonTypes.fulfilled, (state, action) => {
                state.error = '';
                state.status = fulfilled;
                state.types = action.payload;
            }
            )
            .addCase(fetchAllLessonTypes.pending, (state, action) => {
                state.status = pending;
                state.error = '';
            })
            .addCase(fetchAllLessonTypes.rejected, (state, action) => {
                state.status = rejected;
                state.error = action.error;
            })
    }
})

export const selectAllLessonTypes = (state) => state.types.types;
export { fetchAllLessonTypes };
export default typesSlice.reducer;
