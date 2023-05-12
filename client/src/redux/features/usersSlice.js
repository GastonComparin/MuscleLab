import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PORT, URL, fulfilled, pending, rejected } from "../../utils/constants";
import axios from "axios";



const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers', async () => {
        try {
            const response = await axios.get(`${URL}+${PORT}/users`);
            return response.data
        } catch (error){
            // revisar como el back envia los errores
            throw new Error (error.response) 
        }
    }
)

const fetchUserByID = createAsyncThunk(
    'users/fetchUserByID', async () => {
        try {
            const response = await axios.get(`${URL}${PORT}/users/:id`);
            return response.data
        } catch (error){
            // revisar como el back envia los errores
            throw new Error (error.response) 
        }
    }
)

const initialState = {
    users: [],
    user: {},
    status: 'idle',
    error: ''
}

const usersSlice = createSlice ({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.fulfilled, ( state, action) => {
                state.status = fulfilled;
                state.error = '';
                state.users = action.payload
 
            })
            .addCase(fetchAllUsers.pending, (state, action) => {
                state.status = pending;
                state.error = '';
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.status = rejected;
                //revisar sintaxis del error
                state.error = action.error;
                
            }) 
            .addCase(fetchUserByID.fulfilled, ( state, action) => {
                state.status = fulfilled;
                state.error = '';
                state.user = action.payload
 
            })
            .addCase(fetchUserByID.pending, (state, action) => {
                state.status = pending;
                state.error = '';
            })
            .addCase(fetchUserByID.rejected, (state, action) => {
                state.status = rejected;
                //revisar sintaxis del error
                state.error = action.error;
                
            }) 
            
    }
})

export const selectAllUsers = (state) => state.users.users;
export const selectUserByID = (state) => state.users.user;
export const selectStatus = (state) => state.users.status;
export const selectError = (state) => state.users.error;
export default usersSlice.reducer;
