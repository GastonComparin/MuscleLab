const { BranchOffice } = require("../../db");
let deleteBranchOffice = async (id) => {
  let toDelete = await BranchOffice.findOne({ where: { id: id } });
  if (!toDelete) {
    throw new Error("No se encontró sucursal ");
  }
  await toDelete.update({ deletedAt: new Date() });
  return `Sucursal ${toDelete.name} fue eliminada con exito`;
};
module.exports = deleteBranchOffice;
