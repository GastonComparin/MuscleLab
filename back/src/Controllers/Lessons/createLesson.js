const { Lessons, LessonDetail, ExercisesType } = require("../../db");
let createLesson = async (id, name, effort, goals, description, scheduleDays, scheduleHours, image, types) => {
  const foundedClass = await Lessons.findOne({ where: { name: name } });
  console.log(types);
  if (foundedClass) {
    throw new Error("That class already exist");
  } else {
    if(!effort || !goals || !name  || !description || !scheduleDays || !scheduleHours || !types){
      throw new Error("Missing data");
    }
    const newLesson = await Lessons.create({
      id,
      name,
      image
    });
    types.map(async(type)=>{
      const t= await ExercisesType.findOne({
        attributes:["id"],
        where:{name:type}
      });
      newLesson.addExercisesType(t?.id);
    });
    const details = await LessonDetail.create({
      id,
      effort,
      goals,
      description,
      scheduleDays,
      scheduleHours,
      lessonId: newLesson.id
    });
    return `id: ${newLesson.id} name: ${newLesson.name} details: ${details.effort}`;
  }
};
module.exports = createLesson;
