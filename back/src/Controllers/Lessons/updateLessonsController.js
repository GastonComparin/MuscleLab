const { Lessons, LessonDetail, ExercisesType, User, BranchOffice } = require('../../db');

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
    const existingLesson = await Lessons.findByPk(id);
    if (!existingLesson){
        throw new Error(`la clase ${existingLesson.name} no existe`);
    }

    existingLesson.name = name;
    existingLesson.effort = effort;
    existingLesson.goals = goals;
    existingLesson.shortDescription = shortDescription;
    existingLesson.image = image; 

    
    const typesToUpdate = [];
    for(const typeName of types) {
        const type = await ExercisesType.findOne({
            where:{
                name: typeName
            }
        });
        if(type){
            typesToUpdate.push(type.id);
        }else {
            console.error(`No se encontro el tipo de ejercicio "${typeName}"`);
        }
    }

    await existingLesson.setExercisesTypes(typesToUpdate);

    const lessonDetail = await LessonDetail.findOne({
        where:{
            lessonId: existingLesson.id
        }
    });
    if(lessonDetail){
        lessonDetail.name = name;
        lessonDetail.description = description;
        lessonDetail.scheduleDays = scheduleDays;
        lessonDetail.scheduleHourStart = scheduleHourStart;
        lessonDetail.scheduleHourFinish = scheduleHourFinish;

        await lessonDetail.save();
    }

    const branchOfficeIds = [];
    for(const officeName of branchOffice){
        const office = await BranchOffice.findOne({
            where: {
                name: officeName
            }
        });
        if(office){
            branchOfficeIds.push(office.id);
        }else{
            console.error(`No se encontró la sucursal "${officeName}".`);
        }
    }
    await lessonDetail.setBranchOffices(branchOfficeIds);

    const monitorUser = await User.findOne({
        where:{
            fullName: name
        }
    });
    if(monitorUser){
        await lessonDetail.setUser(monitorUser.id);
    }else{
        console.error(`No se encontró el monitor "${monitor}".`);
    }

    await existingLesson.save();

    return existingLesson;
};

module.exports = updateLesson;