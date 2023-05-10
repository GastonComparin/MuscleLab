const { Router } = require("express");
const server = Router();
const createNewLesson = require("../Handlers/Lessons/createLessonHandler");
const deleteMyLesson = require("../Handlers/Lessons/deleteLessonHandler");
const {getAllLessonsHandler, getDetailLessonHandler}=require('../Handlers/Lessons/lessonsHandler');


server.put("/", async (req, res) => {
  res.status(200).json({ msg: "Hola" });
});

server.get("/", getAllLessonsHandler);
server.get("/:id", getDetailLessonHandler);
server.post("/create", createNewLesson);
server.delete("/delete/:id", deleteMyLesson);

module.exports = server;
