const { Router } = require("express");
const server = Router();
const getGoalsHandler=require('../Handlers/Goals/getGoalsHandler');

server.get('/', getGoalsHandler);

module.exports = server;