const { Router } = require("express");
const server = Router();
const getAllTypesHandler=require('../Handlers/Types/getAllTypesHandler');

server.get('/', getAllTypesHandler);

module.exports = server;