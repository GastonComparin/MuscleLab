const { Router } = require('express');
const { getMemberships } = require('../Handlers/Memberships/getMembershipsHandler');
const updateMembership = require('../Handlers/Memberships/putMembershipsHandler');
const deleteMembership = require('../Handlers/Memberships/deleteMembershipsHandler');
const restoreMembership = require('../Handlers/Memberships/restoreDeletedMembershipHandler')
const server = Router();

server.get('/', getMemberships);


server.put('/update/:id', updateMembership);

server.delete('/delete/:id', deleteMembership);

server.put('/restore/:id', restoreMembership);

module.exports = server;