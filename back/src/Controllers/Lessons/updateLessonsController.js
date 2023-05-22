const {
  Lessons,
  LessonDetail,
  ExercisesType,
  User,
  BranchOffice,
} = require("../../db");
const getTypes = require("../Types/getTypes");
const getGoals = require("../Goals/getGoals");
const getBranchOffice = require("../BranchOffice/getBranchOffice");

const updateLesson = async (
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
) => {
  console.log(id);
  // Buscar la lección existente
  const existingLesson = await Lessons.findByPk(id);
  if (!existingLesson) {
    throw new Error("La lección no existe");
  }

  // Actualizar la lección
  existingLesson.name = name;
  existingLesson.effort = effort;
  existingLesson.goals = goals;
  existingLesson.shortDescription = shortDescription;
  existingLesson.image = image;
  await existingLesson.save();

  // Buscar el detalle de la lección existente
  const existingLessonDetail = await LessonDetail.findOne({
    where: { lessonId: id },
  });
  if (!existingLessonDetail) {
    throw new Error("El detalle de la lección no existe");
  }

  // Actualizar el detalle de la lección
  existingLessonDetail.name = name;
  existingLessonDetail.description = description;
  existingLessonDetail.scheduleDays = scheduleDays;
  existingLessonDetail.scheduleHourStart = scheduleHourStart;
  existingLessonDetail.scheduleHourFinish = scheduleHourFinish;
  await existingLessonDetail.save();

  // Obtener los types existentes
  const existingTypes = await getTypes();
  // Filtrar los types proporcionados para asegurarse de que solo se usen los existentes
  const filteredTypes = types.filter((t) =>
    existingTypes.some((existingType) => existingType.name === t)
  );

  // Agregar los nuevos types a la lección
  for (const type of filteredTypes) {
    const t = await ExercisesType.findOne({ where: { name: type } });
    if (t) {
      await existingLesson.addExercisesType(t);
    }
  }

  // Obtener las goals existentes
  const existingGoals = await getGoals();
  // Filtrar las goals proporcionadas para asegurarse de que solo se usen las existentes
  const filteredGoals = goals.filter((g) =>
    existingGoals.some((existingGoal) => existingGoal.name === g)
  );

  // Actualizar las goals de la lección
  existingLesson.goals = filteredGoals;
  await existingLesson.save();

  // Obtener el monitor existente
  const existingMonitor = await User.findOne({
    where: { fullName: monitor, isMonitor: true },
  });
  if (!existingMonitor) {
    throw new Error("El monitor no existe o no es válido");
  }

  // Actualizar el monitor de la lección
  await existingLessonDetail.setUser(existingMonitor);

  // Obtener las branchOffice existentes
  const existingBranchOffices = await getBranchOffice();
  // Filtrar las branchOffice proporcionadas para asegurarse de que solo se usen las existentes
  const filteredBranchOffices = branchOffice.filter((b) =>
    existingBranchOffices.some(
      (existingBranchOffice) => existingBranchOffice.name === b
    )
  );
  // Agregar las nuevas branchOffice a la lección
  for (const office of filteredBranchOffices) {
    const b = await BranchOffice.findOne({ where: { name: office } });
    if (b) {
      await existingLessonDetail.addBranchOffice(b);
    }
  }

  // Obtener la lección modificada con los nuevos datos
  const modifiedLesson = await Lessons.findByPk(id, {
    include: [
      {
        model: ExercisesType,
        attributes: ["name"],
        through: { attributes: [] },
      },
      {
        model: User,
        attributes: ["fullName"],
        include: { 
          model: LessonDetail, 
          attributes: [] },
      },
      {
        model: BranchOffice,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });

  return modifiedLesson;
};

module.exports = updateLesson;
