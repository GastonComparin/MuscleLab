const updateLesson = require('../../Controllers/Lessons/updateLessonsController');

const updateLessonHandler = async (req, res) => {
    const { id } = req.params;
    const { 
        name, 
        effort, 
        goals, 
        shortDescription, 
        description, 
        scheduleDays, 
        scheduleHourStart, 
        scheduleHourFinish, 
        image, 
        types, 
        monitor, 
        branchOffice } = req.body;

        try {
            const updatedLesson = await updateLesson(
                id,
                name, 
                effort, 
                goals, 
                shortDescription, 
                description, 
                scheduleDays, 
                scheduleHourStart, 
                scheduleHourFinish, 
                image, 
                types, 
                monitor, 
                branchOffice 
            );
            res.status(200).json({ message: "Clase modificada correctamente", lesson: updateLesson});
        } catch (error) {
            res.status(400).json({ error: error.message});
        }
};

module.exports = updateLessonHandler;