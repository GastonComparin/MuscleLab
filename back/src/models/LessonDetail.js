const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "lessonDetail",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      goals: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      scheduleDays: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      scheduleHourStart: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      scheduleHourFinish: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lessonId: {
        type: DataTypes.UUID,
        allowNull: false,
        foreignKey: true,
      },
      shortDescription:{
        type:DataTypes.STRING,
        allowNull:true
    }
    },
    { timestamps: false }
  );
};
