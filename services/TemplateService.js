const TemplateDB = require("../db/templateDb");

async function createTemplate(description, image1, image2, connectedSystemName1, connectedSystemName2) {
    return TemplateDB.createTemplate(description, image1, image2, connectedSystemName1, connectedSystemName2);
}

async function getAllTemplates() {
    return TemplateDB.getTemplates();
}

async function deleteTemplate(id) {
    return TemplateDB.deleteTemplate(id);
}

module.exports = {
    createTemplate,
    getAllTemplates,
    deleteTemplate,
};
