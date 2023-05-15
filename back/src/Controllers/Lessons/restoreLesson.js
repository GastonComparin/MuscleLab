const { Lessons } = require("../../db");

let restoreLesson = async (id) => {
  let toRestore = await Lessons.findOne({ where: { id: id } });
  if (!toRestore) {
    throw new Error("Clase no encontrada");
  }
  await toRestore.update({ deletedAt: null });
  return `La clase ${toRestore.name} ha sido restaurada`;
};
module.exports = restoreLesson;