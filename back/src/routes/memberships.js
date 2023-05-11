const { Router } = require('express');
const {getMemberships, getDetailMemberships} = require('../Handlers/Memberships/getMembershipsHandler');
const postNewMembership = require('../Handlers/Memberships/postMembershipsHandler');
const updateMembership = require('../Handlers/Memberships/putMembershipsHandler');
const deleteMembership = require('../Handlers/Memberships/deleteMembershipsHandler');
const server = Router();

server.get('/', getMemberships);

server.get("/:id", getDetailMemberships);

server.post('/create', postNewMembership);

server.put('/update', updateMembership);

server.delete('/delete', deleteMembership);

module.exports = server;