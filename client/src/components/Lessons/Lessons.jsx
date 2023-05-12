import style from './Lessons.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllLessons, selectStatus, fetchAllLessons } from '../../redux/features/lessonsSlice';
import { fetchAllLessonTypes, selectAllLessonTypes } from '../../redux/features/typesSlice';
import { useEffect } from 'react';
import FilterBar from '../FilterBar/FilterBar';
import Lesson from '../Lesson/Lesson';

const Lessons = () => {
    const dispatch = useDispatch();
    const lessons = useSelector(selectAllLessons);
    const status = useSelector(selectStatus);
    const lessonTypes = useSelector(selectAllLessonTypes);
    
    
    useEffect(() => {
        window.scrollTo({top: 0, left:0, behavior: 'auto'})
        dispatch(fetchAllLessons());
        dispatch(fetchAllLessonTypes());
        
    }, [dispatch]);
    
    return (
            <div className={style.Frame}>  
            <FilterBar lessonsAtributtes= {lessonTypes}/>
            <div className={style.Container}>
                {lessons.map((lesson, index)=> {
                    return <Lesson key={lesson.id} lesson={lesson} index={index} />
                })}
            </div>
            </div>
    );
};

export default Lessons;