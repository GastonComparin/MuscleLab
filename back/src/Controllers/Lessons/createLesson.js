const { Lessons, LessonDetail, ExercisesType } = require("../../db");
let createLesson = async (id, name, effort, goals, shortDescription, description, scheduleDays, scheduleHours, image, types) => {
  const foundedClass = await Lessons.findOne({ where: { name: name } });
  if (foundedClass) {
    throw new Error("La clase con ese Nombre ya existe");
  } else {
    if(!effort || !goals || !name  || !description || !scheduleDays || !scheduleHours || !types || !shortDescription){
      throw new Error("Falta informacion");
    }
    const newLesson = await Lessons.create({
      id,
      name,
      image,
      effort,
      shortDescription
    });
    types.map(async(type)=>{
      const t= await ExercisesType.findOne({
        attributes:["id"],
        where:{name:type}
      });
      newLesson.addExercisesType(t?.id);
    });
    let scheduleHourFinish=(scheduleHours.split('-'))[1];
    let scheduleHourStart=(scheduleHours.split('-'))[0];
    const details = await LessonDetail.create({
      id,
      goals,
      description,
      scheduleDays,
      scheduleHourStart,
      scheduleHourFinish,
      lessonId: newLesson.id
    });
    return `id: ${newLesson.id} name: ${newLesson.name} details: ${details.effort}`;
  }
};
module.exports = createLesson;
