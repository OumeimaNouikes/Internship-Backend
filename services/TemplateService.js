const{
    createTemplate
}= require('../db/templateDb');



class templateService{



createTemplate = async (data) => {
    try {
      return await createTemplate(data);
    } catch (error) {
      console.error('Error:', error);
  throw error;
    }
  };

}
module.exports = new templateService();