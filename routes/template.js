const {
createTemplate,
getTemplates,
deleteTemplate
}=require('../controllers/TemplateContoller')
const router = require("express").Router();

const verifyToken = require("../middleware/authorize");

router.use(verifyToken);

////////////////////create template/////////////////////
router.route("/create").post(createTemplate);

///////////////////get templates//////////////////////
router.route("/templates").get(getTemplates);
/////////////////////////delete templates///////////////////////////
router.delete("/delete/:id").delete(deleteTemplate);
module.exports = router;
