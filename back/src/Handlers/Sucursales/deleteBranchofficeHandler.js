const deleteBranchOffice = require("../../Controllers/Sucursales/deleteBranchoffice");
const deleteMyBranchOffice = async (req, res) => {
  const { id } = req.params;
  try {
    const toDelete = await deleteBranchOffice(id);
    res.status(200).json(toDelete);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = deleteMyBranchOffice;
