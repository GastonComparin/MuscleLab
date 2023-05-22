const { BranchOffice } = require("../../db");
const getDetail = async (id) => {
  const detail = await BranchOffice.findOne({ where: { id: id } });
  return detail;
};
module.exports = getDetail;
