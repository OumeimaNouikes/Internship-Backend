const{
   CreateConnctedSystems,
   getConnectSystems
    
    }= require("../controllers/ConnctedSystemsController");
const router = require("express").Router();

const verifyToken = require("../middleware/authorize");

router.use(verifyToken);

/////////////////////Create a connected system////////////////////////
router.route("/create").post(CreateConnctedSystems);
///////////////////get connected systems//////////////////////
router.route("/connectedsystems").get(getConnectSystems);
module.exports = router;
