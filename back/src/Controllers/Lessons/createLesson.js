const {
  Lessons,
  LessonDetail,
  ExercisesType,
  User,
  BranchOffice,
} = require("../../db");
const getTypes = require("../Types/getTypes");
const getGoals = require("../Goals/getGoals");
let createLesson = async (
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
  branchoffice
) => {
  /** Validations To Create*/
  const mon = await User.findOne({ where: { fullName: monitor } });
  const office = await BranchOffice.findOne({
    where: { name: branchoffice },
  });
  let existingName = name.split("-");
  existingName = existingName[0];
  const existingClass = await Lessons.findOne({
    where: { name: existingName },
  });
  const foundedClass = await LessonDetail.findOne({ where: { name: name } });
  const areTypes = await ExercisesType.findAll();
  const needed = [
    ["name", name],
    ["effort", effort],
    ["goals", goals],
    ["shortDescription", shortDescription],
    ["description", description],
    ["scheduleDays", scheduleDays],
    ["scheduleHourStart", scheduleHourStart],
    ["scheduleHourFinish", scheduleHourFinish],
    ["types", types],
    ["monitor", monitor],
    ["branchoffice", branchoffice]
  ];
  const dbGoals = await getGoals();
  let checkGoals = true;
  let newLesson = 0;
  let lessonid;
  if (areTypes.length === 0) {
    await getTypes();
  }
  if (
    !effort ||
    !goals ||
    !name ||
    !description ||
    !scheduleDays ||
    !scheduleHourStart ||
    !scheduleHourFinish ||
    !types ||
    !shortDescription ||
    !monitor ||
    !branchoffice
    ) {
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
  if (isNaN(effort)) {
    throw new Error("El esfuerzo tiene que ser un numero");
  }
  if (!Array.isArray(scheduleDays)) {
    throw new Error("Los dias deben ser un array de strings");
  }
  if (!Array.isArray(types)) {
    throw new Error("Los tipos debe ser un array de strings");
  }
  for (let i = 0; i < goals.length; i++) {
    for (let j = 0; j < dbGoals.length; j++) {
      if (dbGoals[j].name === goals[i]) {
        checkGoals = false;
      }
    }
  }
  if (checkGoals) {
    throw new Error("No existe ese objetivo");
  }
  if (!mon) {
    throw new Error("Ese monitor no existe");
  }
  if(!office){
    throw new Error("La sucursal no existe");
  }
  /**Finish validations */
  if (!existingClass) {
    newLesson = await Lessons.create({
      id,
      name: existingName,
      image,
      effort,
      goals,
      shortDescription,
    });
    types.map(async (type) => {
      const t = await ExercisesType.findOne({
        attributes: ["id"],
        where: { name: type },
      });
      newLesson.addExercisesType(t?.id);
    });
  }
  newLesson ? (lessonid = newLesson.id) : (lessonid = existingClass.id);
  const details = await LessonDetail.create({
    id,
    name,
    description,
    scheduleDays,
    scheduleHourStart,
    scheduleHourFinish,
    lessonId: lessonid,
  });
  details.addBranchOffice(office?.id);
  details.addUser(mon?.id);
  return `id: ${details.id} name: ${details.name}`;
};
module.exports = createLesson;
