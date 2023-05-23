const updateBranchOffice = require("../../Controllers/Sucursales/updateBranchoffice");
const updateMyBranchOffice = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    location,
    scheduleDays,
    scheduleHourStart,
    scheduleHourFinish,
  } = req.body;
  try {
    const toUpdate = await updateBranchOffice(
      id,
      name,
      location,
      scheduleDays,
      scheduleHourStart,
      scheduleHourFinish
    );
    res.status(200).json(toUpdate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = updateMyBranchOffice;
