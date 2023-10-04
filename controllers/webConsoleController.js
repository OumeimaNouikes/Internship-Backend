const webConsoleSetting = require("../services/webConsoleSettingsService");


////////////////Get web console by port ///////////
const getwebSettingsByPort = async (req, res) => {
    const accessPort = req.header('Access-Port');
    console.log('Access Port:', accessPort);
    const web = await webConsoleSetting.getWebConsoleSettings(accessPort);
  
    return res.json(web);
  };
/////////////////////Update Console Settings/////////////
const updateWebSettingsConsole = async (req, res) => {
    try {
       

      const https_enabled=req.body.https_enabled;
      
      const certificate_path = req.body.certificate_path;
      const certificate_key_password = req.body.certificate_key_password;
      const certificate_key_manager_password = req.body.certificate_key_manager_password;
      const access_port= req.header('Access-Port');
      
      const web = {
        
        https_enabled: https_enabled,
        certificate_path: certificate_path,
        certificate_key_password: certificate_key_password,
        certificate_key_manager_password: certificate_key_manager_password,
        access_port: access_port,
      };
       console.log('web',web);
     
      const result = await webConsoleSetting.updateWebSettingsConsole(web);
  
      if (!result) {
        return res.status(404).json({ message: "not found" });
      }
      return res.status(201).json(result);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };



  module.exports={
    getwebSettingsByPort,
    updateWebSettingsConsole
  }