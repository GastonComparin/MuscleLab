const createBranchOffice = require("../../Controllers/Sucursales/createBranchoffice.js")

const createNewBranchOffice = async (req, res) => {
  const { id, name, location, scheduleDays, scheduleHours } = req.body;
  try {
    const newBranchOffice = await createBranchOffice(
      id,
      name,
      location,
      scheduleDays,
      scheduleHours
    );
    res.status(201).json({
      message: "sucursal creada correctamente",
      branchOffice: newBranchOffice,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = createNewBranchOffice;