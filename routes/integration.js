const express = require('express');
const router = express.Router();
const {
  createIntegration,
  countIntegrations
  
} = require('../controllers/IntegrationController');


const verifyToken = require("../middleware/authorize");

router.use(verifyToken);
router.route('/create').post(createIntegration);

router.route('/count').get(countIntegrations);
module.exports = router;