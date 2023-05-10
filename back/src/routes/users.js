const { Router } = require("express");
const server = Router();

const createNewUser = require("../Handlers/Users/createUserHandler");
const deleteMyUser = require("../Handlers/Users/deleteUserHandler");
const getAllUsers = require("../Handlers/Users/getAllUsersHandler");

server.get("/ping", (req, res) => {
  res.send("pong");
});

server.get("/:id", async (req, res) => {
  res.status(200);
});

server.get("/", getAllUsers);
server.post("/create", createNewUser);

server.delete("/delete/:id", deleteMyUser);

module.exports = server;
