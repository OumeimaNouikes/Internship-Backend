const express = require('express');
const router = express.Router();
const {
  createConnectedSystemInstance,
  getInstancesBySystem1,
  getInstancesBySystem2,
  countInstances,
  checkurl

}= require("../controllers/ConnectedsystemsInstanceController")
const verifyToken = require("../middleware/authorize");

router.use(verifyToken);

router.route('/create').post(createConnectedSystemInstance);

router.route('/system1-instances/:connected_system_id_1').get(getInstancesBySystem1);
 
  router.route('/system2-instances/:connected_system_id_2').get(getInstancesBySystem2);
  
router.route('/count').get(countInstances);
  
  router.route('/check-url-validity').get(checkurl);
  
module.exports = router;