const templateService = require('../services/TemplateService');


const createTemplate = async (req, res) => {
    try {
      const data = req.body; 
      const insertedData = await templateService.createTemplate(data);
      return res.status(201).json(insertedData);
    } catch (error) {
      console.error('Error creating data:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
 
  
  module.exports={
    createTemplate

  };