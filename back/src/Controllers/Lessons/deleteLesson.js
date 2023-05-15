const { Lessons} = require("../../db");
let deleteLesson = async (id) => {
  let toDelete = await Lessons.findOne({ where: { id: id } });
  if (!toDelete) {
    throw new Error("Lesson not found");
  }
  await toDelete.update({deletedAt: new Date()});
  return `La clase ${toDelete.name} ha sido eliminada correctamente, para restaurar vea /deleted`;
};
module.exports = deleteLesson;
