


const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    getUserProfile,
    changeUserPassword,
  } = require("../controllers/userController");
 
 
 

  const router = require("express").Router();
  
  const verifyToken = require("../middleware/authorize");
  
  router.use(verifyToken);
  router.route("/profile").get(getUserProfile);
  router.route("/:id").get(getUserById).put(updateUser);
  router.route('/password-reset').post(changeUserPassword);
  module.exports = router;