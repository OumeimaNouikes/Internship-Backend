const{
    createWebConsoleSettings,
    updateWebSettingsConsoleDb,
    getwebConsoleSettingsDb
}= require("../db/webConsoleSettingsDb");

class web_console_settings {


    createWebConsoleSettings = async (web) => {
        try {
          return await createWebConsoleSettings(web);
        } catch (error) {
          console.error('Error:', error);
      throw error;
        }
      };

/////////////////Update ///////////////////
       updateWebSettingsConsole = async (web) => {
        try {
          
          const updated = await updateWebSettingsConsoleDb(web);
          return updated ;
          
        } catch (error) {
          console.error('Error in update web settings:', error);
          throw error;
        }
      };
      
      
      getWebConsoleSettings= async (access_port) =>{
        try {
          const settings = await getwebConsoleSettingsDb(access_port);
          return settings;
        } catch (error) {
          console.error('Error in getWebConsoleSettings:', error);
          throw error;
        }
      }
     
      
};
module.exports = new web_console_settings();