const getMonitor = require("../../Controllers/Users/getMonitor");

const getAllMonitor = async (req, res) => {
  try {
    let monitor = await getMonitor();
    res.status(200).json({ monitor: monitor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = getAllMonitor;
