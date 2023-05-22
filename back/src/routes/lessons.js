const { Router } = require("express");
const server = Router();
const createNewLesson = require("../Handlers/Lessons/createLessonHandler");
const deleteMyLesson = require("../Handlers/Lessons/deleteLessonHandler");
const {getAllLessonsHandler}=require('../Handlers/Lessons/getAllLessonsHandler');
const {getDetailLessonHandler}=require('../Handlers/Lessons/getDetailLessonHandler');
const getDeletedLessons=require('../Handlers/Lessons/getDeletedLessonsHandler');
const restoreDeletedLesson = require("../Handlers/Lessons/restoreDeletedLessonsHandler");
const updateLessonHandler = require('../Handlers/Lessons/updateLessonHandler');
//const updateLessonsDetails = require('../Handlers/Lessons/updateDetailLessonsHandler');
const getLessonById = require('../Handlers/Lessons/getLessonById');
const getEveryLesson = require('../Handlers/Lessons/getEveryLessonHandler');


server.get('/', getAllLessonsHandler);
server.get('/all', getEveryLesson);
server.get('/deleted', getDeletedLessons);
server.post("/create", createNewLesson);
server.get('/detail/:id', getLessonById);
server.delete("/delete/:id", deleteMyLesson);
server.put('/restore/:id', restoreDeletedLesson);
server.put('/update/:id', updateLessonHandler);
//server.put('/updateDetail/:id', updateLessonsDetails);
server.get('/:name', getDetailLessonHandler);


module.exports = server;

