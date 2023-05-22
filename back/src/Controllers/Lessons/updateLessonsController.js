const { Lessons, LessonDetail } = require("../../db");
const {Op}= require("sequelize");

const updateLesson = async (id, effort, shortDescription, image, goals, name, description, scheduleDays, scheduleHourStart, scheduleHourFinish, isAvailable) => {
  const foundedDetail = await LessonDetail.findOne({
    where: {
      id: id,
    },
  });
  const checkName = await LessonDetail.findOne({
    where:{
      name:name,
      id:{[Op.not]:id}
    }
  });  
  const foundedLesson = await Lessons.findOne({
    where:{
      id:foundedDetail.lessonId
    }
  });
  if(checkName){
    throw new Error("Ya existe una clase con ese nombre");
  }
  if (!foundedLesson) {
    throw new Error("La clase que quieres modificar no existe");
  }
  if (!effort || !shortDescription || !image || !goals || !name || !description || !scheduleDays || !scheduleHourStart || !scheduleHourFinish || !isAvailable) {
    throw new Error("Todos los campos son obligatorios");
  }
  await foundedDetail.update({
    name: name,
    description: description,
    scheduleDays: scheduleDays,
    scheduleHourStart: scheduleHourStart,
    scheduleHourFinish: scheduleHourFinish,
    isAvailable: isAvailable
});
  await foundedLesson.update({
    effort:effort,
    shortDescription:shortDescription,
    image:image,
    goals:goals
  })
  return "Datos actualizados correctamente.";
};

module.exports = updateLesson;
