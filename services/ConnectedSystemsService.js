const ConnectedSystemsDB = require("../db/connectedSystemsDb");

const createConnectedSystem = async (name, image) =>  {
    return ConnectedSystemsDB.createConnectedSystem(name, image);
}

const getAllConnectedSystems =  async () => {
    return ConnectedSystemsDB.getConnectedSystems();
}

module.exports = {
    createConnectedSystem,
    getAllConnectedSystems,
};
