const { BranchOffice } = require("../../db");

const getBranchOffice = async () => {
  const branchOffice = await BranchOffice.findAll({
    where: { deletedAt: null },
  });
  return branchOffice;
};
module.exports = getBranchOffice;
