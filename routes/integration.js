const express = require('express');
const router = express.Router();
const pool = require('../config').pool2;


const verifyToken = require("../middleware/authorize");

router.use(verifyToken);
//////////////////////create//////////////////////////
router.post('/create', async (req, res) => {
  try {
    const { name, template_id, system_instance_id_1, system_instance_id_2 } = req.body;

   
    const query = `
      INSERT INTO integration (name, template_id, system_instance_id_1, system_instance_id_2)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await pool.query(query, [name, template_id, system_instance_id_1, system_instance_id_2]);
    const insertedData = result.rows[0];

    res.status(201).json(insertedData);
  } catch (error) {
    console.error('Error creating integration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
///////////////////////////////Count///////////////////////
router.get('/count', async (req, res) => {
    try {
      
      const query = 'SELECT COUNT(*) as count FROM integration';
      const result = await pool.query(query);
  
      
      res.json({ count: result.rows[0].count });
    } catch (error) {
      console.error('Error counting integrations:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
module.exports = router;