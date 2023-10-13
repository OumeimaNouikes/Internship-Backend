
const TemplateService = require('../services/TemplateService');
const multer = require('multer');
let filenames = [];
const myStorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
        let date = Date.now();
        let f1 = date + '.' + file.mimetype.split('/')[1];
        let f2 = date + '.' + file.mimetype.split('/')[1];
        callback(null, f1);
        filenames.push({ image1: f1, image2: f2 });
    }
});
const upload = multer({ storage: myStorage });


////////////////////create template/////////////////////
  const createTemplate = async (req, res) => {
    try {
        const { description, connectedSystemName1, connectedSystemName2 } = req.body;
        const images = filenames;

        const insertedData = await TemplateService.createTemplate(description, images[0].image1, images[1].image2, connectedSystemName1, connectedSystemName2);

        filenames = [];

        res.status(201).json(insertedData);
    } catch (error) {
        console.error('Error inserting data into the table:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

///////////////////get templates//////////////////////
const getTemplates= async (req, res) => {
    try {
        const templates = await TemplateService.getAllTemplates();
        res.status(200).json(templates);
    } catch (error) {
        console.error('Error fetching templates:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
/////////////////////////delete templates///////////////////////////
const deleteTemplate= async (req, res) => {
    try {
        const templateId = parseInt(req.params.id);

        if (isNaN(templateId)) {
            return res.status(400).json({ message: "Invalid template ID" });
        }

        await TemplateService.deleteTemplate(templateId);

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting template:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
module.exports ={
  deleteTemplate,
  getTemplates,
  createTemplate
};

 
  
