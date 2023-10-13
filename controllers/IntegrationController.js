const IntegrationService = require("../services/IntegrationService");

const createIntegration = async(req, res) =>{
    try {
        const { name, template_id, system_instance_id_1, system_instance_id_2 } = req.body;

        const insertedData = await IntegrationService.createIntegration(
            name,
            template_id,
            system_instance_id_1,
            system_instance_id_2
        );

        res.status(201).json(insertedData);
    } catch (error) {
        console.error('Error creating integration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const  countIntegrations = async(req, res) =>{
    try {
        const count = await IntegrationService.countIntegrations();
        res.json({ count });
    } catch (error) {
        console.error('Error counting integrations:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    createIntegration,
    countIntegrations,
};
