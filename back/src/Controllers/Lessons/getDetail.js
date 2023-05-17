const { Lessons, LessonDetail, ExercisesType } = require("../../db");

const getDetailLesson = async (id) => {
  const lesson = await Lessons.findAll({
    include: {
      model: ExercisesType,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
    where: { id: id },
  });
  
  const types = lesson[0].dataValues.exercisesTypes.map((e) => {
    return e.dataValues.name;
  });
  const detail = await LessonDetail.findAll({ where: { lessonId: id } });
  const final = {
    name: lesson[0].name,
    image: lesson[0].image,
    effort: lesson[0].effort,
    goals: detail[0].goals,
    description: detail[0].description,
    shortDescription: lesson[0].shortDescription,
    scheduleDays: detail[0].scheduleDays,
    scheduleHourStart: detail[0].scheduleHourStart,
    scheduleHourFinish: detail[0].scheduleHourFinish,
    types: types,
  };
  return final;
};

module.exports = {
  getDetailLesson,
};
