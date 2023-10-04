const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
/**
 * @swagger
 * tags:
 *  name: Authorization
 *  description: default user login and generate authorization token for other endpoints
 *
 */






const pool = require("../config.js").pool;
const jwtGenerator = require("../utilis/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");

router.post("/login", validInfo, async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
        email
      ]);
           
      if (user.rows.length === 0) {
        return res.status(401).json("Email or Password incorrect");
      }
      const validPassword= password === user.rows[0].user_password;
       
      if (!validPassword) {
        return res.status(401).json("Email or Password incorrect");
      }
      const jwtToken = jwtGenerator(user.rows[0].user_id);
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  router.post("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  module.exports= router;