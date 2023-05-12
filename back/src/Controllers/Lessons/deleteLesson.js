const { Lessons} = require("../../db");
let deleteLesson = async (id) => {
  let toDelete = await Lessons.findOne({ where: { id: id } });
  if (!toDelete) {
    throw new Error("Lesson not found");
  }
  await toDelete.update({deletedAt: new Date()});
  return `Lesson ${toDelete.name} has been marked as deleted`;
};
module.exports = deleteLesson;
