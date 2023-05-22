const updateLesson = require("../../Controllers/Lessons/updateLessonsController");
const { LessonDetail } = require("../../db");
const updateLessons = async (req, res) => {
  const { id } = req.params;
  const { 
    effort, 
    shortDescription, 
    image, 
    goals, 
    name, 
    description, 
    scheduleDays , 
    scheduleHourStart, 
    scheduleHourFinish, 
    isAvailable, 
    monitor, 
    branchOffice } = req.body;
  try {
    const updatedLesson = await updateLesson(
      id,
      effort,
      shortDescription,
      image,
      goals,
      name, 
      description, 
      scheduleDays , 
      scheduleHourStart, 
      scheduleHourFinish,
      isAvailable,
      monitor,
      branchOffice
    );
    res.status(200).json(updatedLesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateLessons;
