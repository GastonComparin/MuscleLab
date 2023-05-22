const { Router } = require("express");
const server = Router();
const createNewBranchOffice = require("../Handlers/Sucursales/createBranchofficeHandler");
const getAllBranchOffice = require("../Handlers/Sucursales/getBranchofficeHandler.js");
const getBranchOfficeDetail = require("../Handlers/Sucursales/getBranchofficeDetailHandler.js");
const deleteMyBranchOffice = require("../Handlers/Sucursales/deleteBranchofficeHandler.js");
const updateMyBranchOffice = require("../Handlers/Sucursales/updateBranchofficeHandler.js");

server.post("/create", createNewBranchOffice);
server.get("/", getAllBranchOffice);
server.get("/:id", getBranchOfficeDetail);
server.delete("/delete/:id", deleteMyBranchOffice);
server.put("/update/:id", updateMyBranchOffice);

module.exports = server;
