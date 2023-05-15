import { configureStore } from '@reduxjs/toolkit';
import lessonsReducer from './features/lessonsSlice';
import utilsReducer from './features/utilsSlice';
import usersReducer from './features/usersSlice';
import typesReducer from './features/typesSlice';
import filtersReducer from './features/filtersSlice';
import { cacheMiddleware } from './features/lessonsSlice';

const store = configureStore({
    reducer: {
        lessons: lessonsReducer,
        types: typesReducer,
        users: usersReducer,
        utils: utilsReducer,
        filters: filtersReducer 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cacheMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store