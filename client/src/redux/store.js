import { configureStore } from '@reduxjs/toolkit';
import lessonsReducer from './features/lessonsSlice';
import utilsReducer from './features/utilsSlice';
import usersReducer from './features/usersSlice';
import typesReducer from './features/typesSlice';

const store = configureStore({
    reducer: {
        lessons: lessonsReducer,
        types: typesReducer,
        users: usersReducer,
        utils: utilsReducer 
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export default store