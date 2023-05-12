const restoreLesson = require('../../Controllers/Lessons/restoreLesson');
const restoreDeletedLesson=async(req,res)=>{
    const {id}=req.params;
    try {
        let lesson= await restoreLesson(id);
        res.status(200).json(lesson);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports= restoreDeletedLesson;