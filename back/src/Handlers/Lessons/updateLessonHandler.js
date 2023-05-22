const updateLesson = require("../../Controllers/Lessons/updateLessonsController");

const updateLessonHandler = async (req, res) => {
  const { 
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
} = req.body;

  try {
    const modifiedLesson = await updateLesson(
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
        branchOffice);
    res.status(200).json({ message: "Lesson updated successfully", lesson: modifiedLesson });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateLessonHandler;