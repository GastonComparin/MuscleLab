const {getDetailLesson} = require("../../Controllers/Lessons/getDetail")

const getDetailLessonHandler= async (req,res)=>{
    const {id}=req.params;
    try {
        let lessonDetail= await getDetailLesson(id);
        res.status(200).json(lessonDetail);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports={
    getDetailLessonHandler
}
