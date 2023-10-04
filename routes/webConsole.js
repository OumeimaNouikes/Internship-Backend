const{
getwebSettingsByPort,
updateWebSettingsConsole

}= require("../controllers/webConsoleController");


const router = require("express").Router();
  
  const verifyToken = require("../middleware/authorize");
  
  router.use(verifyToken);
  
  router.route("/web").get(getwebSettingsByPort);
  
  router.route("/update").put(updateWebSettingsConsole);
  
  module.exports=router;