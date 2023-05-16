import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PORT, URL, pending, rejected, fulfilled } from "../../utils/constants";
import { sortAtoZ,sortZtoA, sortEasiestToHardest, sortHardestToEasiest } from "../../utils/sorterUtils";
import { cleaner } from "../../utils/cleanerUtils";
import  axios  from 'axios';



const fetchAllLessons = createAsyncThunk(
    'lessons/fetchAllLessons', async () => {
        
        try {
            const response = await axios.get(`${URL}/lessons`);

            return response.data
        } catch (error){
            throw new Error (error.response) 
        }

    }
)
const fetchLessonsByID = createAsyncThunk(
    'lessons/fetchAllLessonsByID', async (id) => {
        try {
            const response = await axios.get(`${URL}/lessons/${id}`);
            return response.data
        } catch (error){
            // revisar como el back envia los errores
            throw new Error (error.response) 
        }

    }
)
export const cacheMiddleware = store => next => action => {
    if (action.type === 'lessons/fetchAllLessons/fulfilled' && store.getState().lessons.lessons.length > 0) {
        return Promise.resolve();
    }
    return next(action);
};

const initialState = {
    lessons: [],
    lesson: {},
    status: 'idle',
    error: ''
}

const lessonsSlice = createSlice({
    name: 'lessons',
    initialState,
    reducers: {
        // aquí van las otras acciones
        orderFromAtoZ: (state) => {
            state.lessons = sortAtoZ(state.lessons);
        },
        orderFromZtoA: (state) => {
            state.lessons = sortZtoA(state.lessons);
        },
        orderFomHardestToEasiest: (state) => {
            state.lessons = sortHardestToEasiest(state.lessons);
        },
        orderFromEasiestToHardest: (state) => {
            state.lessons = sortEasiestToHardest(state.lessons);
        },
        sortByType: (state,action) => {
            const typesArray = action.payload;
            const lessons = state.lessons;
            const filteredLessons = lessons.filter((lesson) => {
                const lessonTypes = lesson.exercisesTypes;
                return typesArray.every((type) => lessonTypes.includes(type))});

            state.lessons = filteredLessons;
            if (filteredLessons.length === 0) state.error = `No se encontraron clases con los tipos: ${typesArray.join(', ')}.`;
            if (filteredLessons.length > 0) state.error = '';
            
        },
        sortByIntensity: (state,action) => {
            const intensity = action.payload;
            const lessons = state.lessons;
            const filteredLessons = lessons.filter((lesson) => {
                return intensity.some((int) => int === lesson.effort)
            });
            state.lessons = filteredLessons;
            if (filteredLessons.length === 0) state.error = `No se encontraron clases con los filtros seleccionados: ${intensity.join(', ')}`;
            if (filteredLessons.length > 0) state.error = '';
        },

        sortByIntensityandType: (state, action) => {
            const {selectedTypes, selectedIntensities} = action.payload;
            const lessons = state.lessons;
            const filteredLessons = lessons.filter((lesson) => {
                const lessonTypes = lesson.exercisesTypes;
                return selectedTypes.every((type) => lessonTypes.includes(type)) && selectedIntensities.some((int) => int === lesson.effort)});
            
            state.lessons = filteredLessons;
            if (filteredLessons.length === 0) state.error = `No se encontraron clases de tipo de ejercicio ${selectedTypes.join(', ')} y de intensidad ${selectedIntensities.join(', ')}`;
            if (filteredLessons.length > 0) state.error = '';
            
        },
        clearLessons: (state) => {
            state.lessons = [];
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLessons.fulfilled, (state, {payload}) => {
                const cleanedData = cleaner(payload);
                const orderedData = sortAtoZ(cleanedData);
                state.error = '';
                state.status = fulfilled;
                state.lessons = orderedData;
            }
            )
            .addCase(fetchAllLessons.pending, (state, action) => {
                state.status = pending;
                state.error = '';
            })
            .addCase(fetchAllLessons.rejected, (state, action) => {
                state.status = rejected;
                //revisar sintaxis del error
                state.error = action.error;
            })
            .addCase(fetchLessonsByID.fulfilled, (state, {payload}) => {
                state.lesson = payload;
                state.error = '';
                state.status = fulfilled;
            })
            .addCase(fetchLessonsByID.pending, (state, action) => {
                state.status = pending;
                state.error = '' 
            })
            .addCase (fetchLessonsByID.rejected, (state, action) => {
                state.status = rejected;
                //revisar sintaxis del error
                state.error = action.error
            })
    }
})


export const selectAllLessons = (state) => state.lessons.lessons;
export const selectLesson = (state) => state.lessons.lesson;
export const selectStatus = (state) => state.lessons.status;
export const selectError = (state) => state.lessons.error;
export default lessonsSlice.reducer;
export const { orderFromAtoZ, orderFromZtoA, orderFomHardestToEasiest, orderFromEasiestToHardest, sortByType, sortByIntensityandType, sortByIntensity, clearLessons } = lessonsSlice.actions;
export { fetchAllLessons, fetchLessonsByID }