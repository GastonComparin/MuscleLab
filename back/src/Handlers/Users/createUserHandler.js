const createUser = require("../../Controllers/Users/createUser");
const bcryptjs = require("bcryptjs");
const createNewUser = async (req, res) => {
  
  const { id, fullName, email, phone, isMonitor, isAdmin } = req.body;
  const password = req.body.password;
  try {
    let passwordHash = await bcryptjs.hash(password, 8);
    const newUser = await createUser(
      id,
      fullName,
      passwordHash,
      email,
      phone,
      isMonitor,
      isAdmin
    );
    res.status(201).json({
      message: "Usuario creado correctamente",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = createNewUser;
