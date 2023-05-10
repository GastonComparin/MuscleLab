const { User } = require("../../db");
const { Op } = require("sequelize");

let createUser = async (id, fullName, password, email, phone, isMonitor) => {
  const foundedUser = await User.findOne({ where: { email: email } });
  if (foundedUser) {
    throw new Error("That email has already been registered ");
  } else {
    try {
      const newUser = await User.create({
        id,
        fullName,
        password,
        email,
        phone,
        isMonitor,
      });

      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
module.exports = createUser;
