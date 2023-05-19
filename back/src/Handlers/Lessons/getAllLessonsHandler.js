const { getLessons } = require("../../Controllers/Lessons/getAllLessons");
const jwt = require("jsonwebtoken");

const getAllLessonsHandler = async (req, res) => {
  let lessons = await getLessons();

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .json({ mensaje: "acceso denegado, token no proporcionado" });
    } else {
      jwt.verify(token, "secretKey", (error, authData) => {
        if (!authData.isAdmin) {
          return res.status(403).json({
            mensaje: "Acceso denegado, no tienes permisos correspondientes",
          });
        }
        res.status(200).json({ lessons, authData });
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllLessonsHandler,
};
