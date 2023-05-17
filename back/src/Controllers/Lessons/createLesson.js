const { Lessons, LessonDetail, ExercisesType, Goals} = require("../../db");
const getTypes = require("../Types/getTypes")
let createLesson = async (id, name, effort, goals, shortDescription, description, scheduleDays, scheduleHours, image, types) => {
  /** Validations To Create*/
  const foundedClass = await Lessons.findOne({ where: { name: name } });
  const areTypes = await ExercisesType.findAll();
  const needed = [
    ["name", name],
    ["effort", effort],
    ["goals", goals],
    ["shortDescription", shortDescription],
    ["description", description],
    ["scheduleDays", scheduleDays],
    ["scheduleHours", scheduleHours],
    ["types", types]
  ];
  let regexHours=/\d\d\:\d\d-\d\d\:\d\d/i;
  if(areTypes.length===0){
    await getTypes();
  }
  if (!effort || !goals || !name || !description || !scheduleDays || !scheduleHours || !types || !shortDescription) {
    let missing = [];
    for (let i = 0; i < needed.length; i++) {
      if (!needed[i][1]) {
        missing.push(needed[i][0]);
      }
    }
    let message = "Falta informacion: ";
    for (let i = 0; i < missing.length; i++) {
      message = message + " " + missing[i];
    }
    throw new Error(message);
  }
  if (foundedClass) {
    throw new Error("La clase con ese Nombre ya existe");
  }
  if(isNaN(effort)){
    throw new Error("El esfuerzo tiene que ser un numero");
  }
  if(!Array.isArray(scheduleDays)){
    throw new Error("Los dias deben ser un array de strings");
  }
  if(!regexHours.test(scheduleHours)){
    throw new Error ("Las horas deben tener el siguiente formato: xx:xx-xx:xx (x:numero)");
  }else{
    let start=(scheduleHours.split('-'))[0];
    let finish =(scheduleHours.split('-'))[1];
    start=start.split(':');
    finish=finish.split(':');
    let checkStart= (0 <= Number(start[0]) && Number(start[0]) <= 24) && (0 <= Number(start[1]) && Number(start[1]) < 60);
    let checkFinish= (0 <= Number(finish[0]) && Number(finish[0]) <= 24) && (0 <= Number(finish[1]) && Number(finish[1]) < 60);
    start=start.join('');
    finish=finish.join('');
    if(!checkStart){
      throw new Error ("La hora de inicio no es valida, siga el fromato 24hs con los minutos entre 0 y 60");
    }
    if(!checkFinish){
      throw new Error ("La hora de finalizacion no es valida, siga el fromato 24hs con los minutos entre 0 y 60");
    }
    if(Number(start)>Number(finish)){
      throw new Error ("La hora de inicio debe ser antes de la hora de finalizacion");
    }
  }
  if(!Array.isArray(types)){
    throw new Error ("Los tipos debe ser un array de strings");
  }
  const newLesson = await Lessons.create({
    id,
    name,
    image,
    effort,
    shortDescription
  });
  types.map(async (type) => {
    const t = await ExercisesType.findOne({
      attributes: ["id"],
      where: { name: type }
    });
    newLesson.addExercisesType(t?.id);
  });
  const scheduleHourFinish = (scheduleHours.split('-'))[1];
  const scheduleHourStart = (scheduleHours.split('-'))[0];
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

};
module.exports = createLesson;
