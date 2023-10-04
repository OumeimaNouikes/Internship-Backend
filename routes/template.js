const pool = require("../config.js").pool2;
const multer = require('multer');
let filenames = [];
const myStorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
        let date = Date.now();
        let f1 = date + '.' + file.mimetype.split('/')[1];
        let f2 = date + '.' + file.mimetype.split('/')[1];
        callback(null, f1);
        filenames.push({ image1: f1, image2: f2 });
    }
});
const upload = multer({ storage: myStorage });
const router = require("express").Router();

const verifyToken = require("../middleware/authorize");

router.use(verifyToken);

////////////////////create template/////////////////////
router.post("/create", upload.array('images', 2), async (req, res) => {
    try {
        const { description, connected_system_id_1, connected_system_id_2 } = req.body;
        const images = filenames;

        const query = `
            INSERT INTO template (description, image1, image2, connected_system_id_1, connected_system_id_2)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

        const result = await pool.query(query, [description, images[0].image1, images[1].image2, connected_system_id_1, connected_system_id_2]);
        const insertedData = result.rows[0];

       
        filenames = [];

        res.status(201).json(insertedData);
    } catch (error) {
        console.error('Error inserting data into the table:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
///////////////////get templates//////////////////////
router.get("/templates", async (req, res) => {
  try {
      const query = `
          SELECT * FROM template;
      `;

      const result = await pool.query(query);
      const templates = result.rows;

      res.status(200).json(templates);
  } catch (error) {
      console.error('Error fetching templates:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});
/////////////////////////delete templates///////////////////////////
router.delete("/delete/:id", async (req, res) => {
  try {
      const templateId = parseInt(req.params.id);

     
      if (isNaN(templateId)) {
          return res.status(400).json({ message: "Invalid template ID" });
      }

      
      const checkQuery = "SELECT * FROM template WHERE id = $1";
      const checkResult = await pool.query(checkQuery, [templateId]);

      if (checkResult.rows.length === 0) {
          return res.status(404).json({ message: "Template not found" });
      }

      
      const deleteQuery = "DELETE FROM template WHERE id = $1";
      await pool.query(deleteQuery, [templateId]);

      res.status(204).send(); 
  } catch (error) {
      console.error('Error deleting template:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = router;
