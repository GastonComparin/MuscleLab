const { getDetailLesson } = require("../../Controllers/Lessons/getDetail");
const jwt = require("jsonwebtoken");

const getDetailLessonHandler = async (req, res) => {
  const { name } = req.params;
  let lessonDetail = await getDetailLesson(name);
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(403)
        .json({ mensaje: "Acceso denegado. Token no proporcionado." });
    } else {
      jwt.verify(token, "secretKey", (error, authData) => {
        if (!authData.isAdmin) {
          return res
            .status(403)
            .json({ mensaje: "Acceso denegado. No tienes los permisos." });
        }
        res.status(200).json({ lessonDetail, authData });
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDetailLessonHandler,
};
