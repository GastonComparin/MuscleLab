const {DataTypes}=require('sequelize');

module.exports=(sequelize)=>{
    sequelize.define('lessons', {
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4,
            allowNull:false
        },
        image:{
            type:DataTypes.STRING,
            allowNull:true,
            defaultValue:"https://d500.epimg.net/cincodias/imagenes/2019/05/02/lifestyle/1556809482_591063_1556811610_noticia_normal.jpg"
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isAlpha:true
            }
        },
        effort: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        deletedAt:{
            type:DataTypes.DATE,
            allowNull:true,
            defaultValue:null
        },
        shortDescription:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{timestamps:false})
}