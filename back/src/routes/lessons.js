const { Router } = require("express");
const server = Router();
const createNewLesson = require("../Handlers/Lessons/createLessonHandler");
const deleteMyLesson = require("../Handlers/Lessons/deleteLessonHandler");
const {getAllLessonsHandler}=require('../Handlers/Lessons/getAllLessonsHandler');
const {getDetailLessonHandler}=require('../Handlers/Lessons/getDetailLessonHandler');
const getDeletedLessons=require('../Handlers/Lessons/getDeletedLessonsHandler');
const restoreDeletedLesson = require("../Handlers/Lessons/restoreDeletedLessonsHandler");


server.put('/', async (req,res)=>{
    res.status(200).json({msg:'Hola'})
})

server.get('/', getAllLessonsHandler);
server.get('/deleted', getDeletedLessons)
server.post("/create", createNewLesson);
server.delete("/delete/:id", deleteMyLesson);
server.put('/restore/:id', restoreDeletedLesson)
server.get('/:id', getDetailLessonHandler);

module.exports = server;

