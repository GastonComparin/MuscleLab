const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const userLogin = async (email, password) => {
  if (!email) {
    throw new Error("Email is undefined");
  }
  let toLogin = await User.findOne({ where: { email: email } });
  if (!toLogin) {
    return {
      success: false,
      message: "No se encontró un usuario con ese email",
    };
  } else {
    const match = await bcryptjs.compare(password, toLogin.password);
    if (match) {
      const token = generateToken(toLogin);
      return "logeado con exito, tu token es: " + token;
    } else {
      return {
        success: false,
        message: "La contraseña ingresada es incorrecta",
      };
    }
  }
};
const generateToken = (usuario) => {
  const token = jwt.sign(
    {
      id: usuario.id,
      nombre: usuario.fullName,
      isAdmin: usuario.isAdmin,
    },
    "secretKey"
  );
  return token;
};
module.exports = userLogin;
