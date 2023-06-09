const {Lessons,ExercisesType}=require('../../db');

const getLessons= async ()=>{
    const lessons= await Lessons.findAll({include:{
        model: ExercisesType,
        attributes:["name"],
        through:{
            attributes:[]
        }
    }});
    return lessons;
}

module.exports={
    getLessons
}