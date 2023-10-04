const express = require('express');
const router = express.Router();
const pool = require("../config.js").pool2; 
const axios = require('axios')

const verifyToken = require("../middleware/authorize");

router.use(verifyToken);
///////////////////////Create//////////////////////////////
router.post('/create', async (req, res) => {
    try {
      const { systemId, name, url } = req.body;
  
      
      const query = `
        INSERT INTO connected_system_instances (connected_system_id, url_path, instance_name)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
  
      const result = await pool.query(query, [ systemId, url, name]);
      const createdInstance = result.rows[0];
  
      res.status(201).json(createdInstance);
    } catch (error) {
      console.error('Error creating instance:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
//////////////////////////////////Get by system1/////////////////////////
router.get('/system1-instances/:connected_system_id_1', async (req, res) => {
    const { connected_system_id_1 } = req.params;
  
    try {
      const query = 'SELECT * FROM connected_system_instances WHERE connected_system_id = $1';
      const result = await pool.query(query, [connected_system_id_1]);
  
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching System 1 instances:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  /////////////////////////////////////get by system 2////////////////////////
  router.get('/system2-instances/:connected_system_id_2', async (req, res) => {
    const { connected_system_id_2 } = req.params;
  
    try {
      const query = 'SELECT * FROM connected_system_instances WHERE connected_system_id = $1';
      const result = await pool.query(query, [connected_system_id_2]);
  
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching System 2 instances:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  ///////////////////////////////Count///////////////////////
router.get('/count', async (req, res) => {
    try {
      
      const query = 'SELECT COUNT(*) as count FROM connected_system_instances';
      const result = await pool.query(query);
  
      
      res.json({ count: result.rows[0].count });
    } catch (error) {
      console.error('Error counting connected_system_instances:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  ////////////////////////////check validity///////////////////////
  router.get('/check-url-validity', async (req, res) => {
    const { url } = req.query;
  
    try {
     
      const response = await axios.get(url);
  
      
      if (response.status === 200) {
        res.status(200).json({ isValid: true });
      } else {
        res.status(200).json({ isValid: false });
      }
    } catch (error) {
    
      console.error('Error checking URL validity:', error);
      res.status(200).json({ isValid: false });
    }
  });
  
module.exports = router;