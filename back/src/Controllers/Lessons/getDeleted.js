const {Op} = require('sequelize');
const {Lessons}= require('../../db');

const getDeletedLessons = async () =>{
    const deleted = await Lessons.findAll({
        where:{deletedAt: {[Op.not]: null}}
    });
    return deleted;
};
module.exports=getDeletedLessons;