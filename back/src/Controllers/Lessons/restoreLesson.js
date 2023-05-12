const { Lesson } = require("../../db");

let restoreLesson = async (id) => {
  let toRestore = await Lesson.findOne({ where: { id: id } });
  if (!toRestore) {
    throw new Error("Lesson not found");
  }
  await toRestore.update({ deletedAt: null });
  return `Lesson ${toRestore.name} has been restored`;
};
module.exports = restoreLesson;