const cleaner = (data) => {
    const cleanedData = data.map((lesson) => {
        const exercises = lesson.exercisesTypes;
        const exercisesTypes = exercises.map((exercise) => exercise.name);
        return {...lesson, exercisesTypes}
    })
    return cleanedData;
};

const individualLessonCleaner = (data) => {
    const cleanedData = {
        ...data,
        exercisesTypes: data.exercisesTypes.map((exercise) => exercise.name)
    }
    return cleanedData;
};
export { cleaner, individualLessonCleaner}