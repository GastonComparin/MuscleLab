const getBranchOffice = require("../../Controllers/BranchOffice/getBranchOffice");

const getAllBranchOffice = async (req, res) => {
  try {
    let branchOffice = await getBranchOffice();
    res.status(200).json({ branchOffice: branchOffice });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = getAllBranchOffice;
