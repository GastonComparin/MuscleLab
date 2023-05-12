const getDeleted = require('../../Controllers/Lessons/getDeleted');

const getDeletedLessons = async (req,res)=>{
    try {
        let lessons= await getDeleted();
        res.status(200).json(lessons);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports=getDeletedLessons;