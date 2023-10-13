const ConnectedSystemsInstanceDB = require("../db/connectedSystemInstanceDb");


///////////////Creation//////////////////////
const createConnectedSystemInstance = async (connected_system_name, name, url) => {
    return ConnectedSystemsInstanceDB.createConnectedSystemInstance(connected_system_name, name, url);
};

/////////////////////Get by System/////////////////////
const getInstancesBySystem = async (systemId) => {
    return ConnectedSystemsInstanceDB.getInstancesBySystem(systemId);
};

///////////////////Count//////////////////////////////
const countInstances = async () => {
    return ConnectedSystemsInstanceDB.countInstances();
};

module.exports = {
    createConnectedSystemInstance,
    getInstancesBySystem,
    countInstances,
};
