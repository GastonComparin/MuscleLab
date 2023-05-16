require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DATABASE_URL } = process.env;

const sequelize = new Sequelize(`${DATABASE_URL}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // En entornos de producción, debes configurar esto en `true` y proporcionar el certificado adecuado
    }
  }
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  BranchOffice,
  LessonDetail,
  Lessons,
  Membership,
  User,
  StatusMemberships,
  ExercisesType,
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

User.hasOne(Membership);
Membership.belongsToMany(User, { through: "membership_user" });

User.hasOne(StatusMemberships, { foreignKey: "user_id" });
StatusMemberships.hasOne(User);

Lessons.belongsToMany(ExercisesType, { through: "Lessons_Type" });
ExercisesType.belongsToMany(Lessons, { through: "Lessons_Type" });

User.belongsToMany(Lessons, { through: "User_Lesson" });
Lessons.belongsToMany(User, { through: "User_Lesson" });

Lessons.hasOne(LessonDetail);
LessonDetail.belongsTo(Lessons);

Lessons.belongsToMany(BranchOffice, { through: "Lesson_BranchOffice" });
BranchOffice.belongsToMany(Lessons, { through: "Lesson_BranchOffice" });

StatusMemberships.belongsToMany(BranchOffice, {
  through: "Status_BranchOffice",
});
BranchOffice.belongsToMany(StatusMemberships, {
  through: "Status_BranchOffice",
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
