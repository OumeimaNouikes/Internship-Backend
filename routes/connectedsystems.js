


const pool = require("../config.js").pool2;
const multer = require('multer');
const myStorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
        let date = Date.now();
        let filename = date + '.' + file.mimetype.split('/')[1];
        callback(null, filename);
    }
});
const upload = multer({ storage: myStorage }).single('image'); 
const router = require("express").Router();

const verifyToken = require("../middleware/authorize");

router.use(verifyToken);

/////////////////////Create a connected system////////////////////////
router.post("/create", async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            const { name } = req.body;
            const image = req.file.filename; 

            const query = `
                INSERT INTO connected_systems (name, image)
                VALUES ($1, $2)
                RETURNING *;
            `;

            const result = await pool.query(query, [name, image]);
            const insertedData = result.rows[0];

            res.status(201).json(insertedData);
        });
    } catch (error) {
        console.error('Error inserting data into the table:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
///////////////////get connected systems//////////////////////
router.get("/connectedsystems", async (req, res) => {
    try {
        const query = `
            SELECT * FROM connected_systems;
        `;
  
        const result = await pool.query(query);
        const templates = result.rows;
  
        res.status(200).json(templates);
    } catch (error) {
        console.error('Error fetching templates:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  });
module.exports = router;
