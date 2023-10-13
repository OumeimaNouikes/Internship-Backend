const IntegrationDB = require("../db/IntegrationDb");

const createIntegration = async(name, templateId, systemInstanceId1, systemInstanceId2) => {
    return IntegrationDB.createIntegration(name, templateId, systemInstanceId1, systemInstanceId2);
}

const  countIntegrations = async() =>{
    return IntegrationDB.countIntegrations();
}

module.exports = {
    createIntegration,
    countIntegrations,
};
