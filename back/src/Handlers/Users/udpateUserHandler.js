const updateUser = require("../../Controllers/Users/updateUserController.js");

const updateUsers = async (req, res) => {
  const { id } = req.params;
  const { fullName, password, email, phone, isAdmin, lessons } = req.body;
  try {
    console.log("en el handler tengo: " + isAdmin);
    const updatedUser = await updateUser(
      id,
      fullName,
      password,
      email,
      phone,
      isAdmin,
      lessons
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateUsers;
