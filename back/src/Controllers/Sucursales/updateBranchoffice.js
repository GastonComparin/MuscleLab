const { BranchOffice } = require("../../db");
let updateBranchOffice = async (
  id,
  name,
  location,
  scheduleDays,
  scheduleHours
) => {
  let toUpdate = await BranchOffice.findOne({ where: { id: id } });
  if (!toUpdate) {
    throw new Error("No se encontró sucursal");
  }
  await toUpdate.update({
    name: name,
    location: location,
    scheduleDays: scheduleDays,
    scheduleHours: scheduleHours,
  });
  return `Sucursal ${toUpdate.name} fue editada con exito`;

};
module.exports = updateBranchOffice;
