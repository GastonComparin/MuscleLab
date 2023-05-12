const {DataTypes}=require('sequelize');

module.exports=(sequelize)=>{
    const ExercisesTypes=sequelize.define('exercisesType', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{timestamps:false});

    

    return ExercisesTypes;
}