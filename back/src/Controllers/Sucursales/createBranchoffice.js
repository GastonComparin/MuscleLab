const { BranchOffice } = require("../../db");

let createBranchOffice = async (
  id,
  name,
  location,
  scheduleDays,
  scheduleHours
) => {
  const foundedBranchOffice = await BranchOffice.findOne({
    where: { name: name },
  });

  if (foundedBranchOffice) {
    throw new Error("La sucursal con ese Nombre ya esta registrada");
  } else if (!name || !location || !scheduleDays || !scheduleHours) {
    throw new Error("Faltan datos");
  }
  const newBranchOffice = await BranchOffice.create({
    id,
    name,
    location,
    scheduleDays,
    scheduleHours,
  });
  return newBranchOffice;
};
module.exports = createBranchOffice;
