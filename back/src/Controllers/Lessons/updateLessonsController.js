const { Lessons, LessonDetail, User, BranchOffice } = require("../../db");
const { Op } = require("sequelize");

const updateLesson = async (
  id,
  effort,
  shortDescription,
  image,
  goals,
  name,
  description,
  scheduleDays,
  scheduleHourStart,
  scheduleHourFinish,
  isAvailable,
  monitor,
  branchOffice
) => {

  const foundedDetail = await LessonDetail.findOne({
    where: {
      id: id,
    },
  });
  const checkName = await LessonDetail.findOne({
    where: {
      name: name,
      id: { [Op.not]: id },
    },
  });
  const foundedLesson = await Lessons.findOne({
    where: {
      id: foundedDetail.lessonId,
    },
  });
  if (checkName) {
    throw new Error("Ya existe una clase con ese nombre");
  }
  if (!foundedLesson) {
    throw new Error("La clase que quieres modificar no existe");
  }
  if (
    !effort ||
    !shortDescription ||
    !image ||
    !goals ||
    !name ||
    !description ||
    !scheduleDays ||
    !scheduleHourStart ||
    !scheduleHourFinish ||
    !isAvailable ||
    !monitor ||
    !branchOffice
  ) {
    throw new Error("Todos los campos son obligatorios");
  }
  const user = await foundedDetail.getUsers();
  console.log(user);
  const currentMonitor = await User.findOne({
    where: {
      id: user[0].id,
    },
  });
  const idgeneral = user[0].id;
  console.log(idgeneral);
  if (monitor) {
    const newMonitor = await User.findOne({
      where: {
        fullName: monitor,
        isMonitor: true,
      },
    });

    if (!newMonitor) {
      throw new Error("El monitor no existe o no es monitor");
    }
    if (currentMonitor) {
      await foundedDetail.removeUser(currentMonitor);
    }  
    
    await foundedDetail.addUser(newMonitor);
  }

  const sede = await foundedDetail.getBranchOffices();
  const currentBranchOffice = await BranchOffice.findOne({
    where:{
      id: sede[0].id
    }
  });

  // const idSedes = sede[0].id;

  if(branchOffice) {
    const newBrancOffice = await BranchOffice.findOne({
      where:{
        name: branchOffice
      }
    });
    if(!newBrancOffice){
      throw new Error('La sede no existe')
    }

    if(currentBranchOffice) {
      await foundedDetail.removeBranchOffice(currentBranchOffice);
    }    
    await foundedDetail.addBranchOffice(newBrancOffice);
  }
  await foundedDetail.update({
    name: name,
    description: description,
    scheduleDays: scheduleDays,
    scheduleHourStart: scheduleHourStart,
    scheduleHourFinish: scheduleHourFinish,
    isAvailable: isAvailable,
  });
  await foundedLesson.update({
    effort: effort,
    shortDescription: shortDescription,
    image: image,
    goals: goals,
  });

  return "Datos actualizados correctamente.";
};

module.exports = updateLesson;
