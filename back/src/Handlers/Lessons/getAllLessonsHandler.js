const {getLessons} = require("../../Controllers/Lessons/getAllLessons")

const getAllLessonsHandler= async (req,res)=>{
    try {
        let lessons= await getLessons();
        res.status(200).json(lessons); 
    } catch (error) {
        res.status(400).json({err:error.msg});
    }
}

module.exports={
    getAllLessonsHandler
}
