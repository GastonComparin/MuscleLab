const {Lessons}=require('../../db');

const getLessons= async ()=>{
    const lessons= await Lessons.findAll({where: {deletedAt:null}});
    return lessons;
}

module.exports={
    getLessons
}