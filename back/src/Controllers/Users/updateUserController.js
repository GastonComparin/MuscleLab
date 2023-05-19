const { User } = require("../../db.js");
const bcryptjs = require("bcryptjs");

const updateUser = async (id, fullName, password, email, phone, isAdmin) => {
  console.log("recibo en isAdmin: "+ isAdmin);
  try {
    const foundedUser = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!foundedUser) {
      throw new Error("El usuario que deseas modificar no existe");
    }
    if (!fullName || !email || !phone || !password) {
      throw new Error("todos los campos son obligatorios");
    }
    if (password) {
      const passwordHash = await bcryptjs.hash(password, 8);
      foundedUser.password = passwordHash;
    }
    foundedUser.fullName = fullName;
    foundedUser.email = email;
    foundedUser.phone = phone;
    foundedUser.isAdmin = isAdmin;

    await foundedUser.save();
    return "Usuario actualizado correctamente";
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = updateUser;

// const updateUser = async (id, fullName, password, email, phone) => {
//   const foundedUser = await User.findOne({
//     where: {
//       id: id,
//     },
//   });

//   if (!foundedUser) {
//     throw new Error("El usuario que deseas modificar no existe!");
//   }
//   if (!fullName || !password || !email || !phone) {
//     throw new Error("Todos los campos son obligatorios!");
//   };

//   await foundedUser.update({
//     fullName: fullName,
//     password: password,
//     email: email,
//     phone: phone
//   });

//   return("Usuario actualizado correctamente");
// };

module.exports = updateUser;
