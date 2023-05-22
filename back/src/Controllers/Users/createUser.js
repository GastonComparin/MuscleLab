const { User } = require("../../db");

let createUser = async (
  id,
  fullName,
  password,
  email,
  phone,
  isMonitor,
  isAdmin
) => {

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
        isAdmin,
      });

      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
module.exports = createUser;
