const userService = require("../services/userService");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'opshubcommunity@gmail.com',
    pass: 'jwra mgln tink wkaa',
  },
});

/////////////get all users///////
const getAllUsers = async (req, res) => {
  const results = await userService.getAllUsers();
  res.status(200).json(results);
};
/////////////////////Create user//////////////////////
const createUser = async (req, res) => {
  const { user_name, user_email, user_password, state, country } = req.body;
  

  const user = await userService.createUser({
    user_name, user_email, user_password, state, country
  });

  res.status(201).json({
    status: "success",
    user,
  });
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    if (+id === req.user.id ) {
      try {
        const user = await userService.getUserById(id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
    return res.status(401).json({ message: "Unauthorized" });
  };
  
////////////////User Profile///////////////
const getUserProfile = async (req, res) => {
    console.log('req.user:', req.user);
    const user = await userService.getUserById(req.user);
  
    return res.json(user);
};
///////////////////////Update user///////////
const updateUser = async (req, res) => {
    const { user_name, user_email, state, country } = req.body;
    const userId = req.params.id;
      try {
        console.log('Received userId:', userId);
        const results = await userService.updateUser({
          user_name,
          user_email,
          state,
          country,
          user_id: userId,
        });
        console.log('Results:', results);
        if (!results) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(201).json(results);
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    
   
  };
  ////////////////////Passowrd Reset /////////////
  const changeUserPassword = async (req, res) => {
    const { password, user_email } = req.body;
    console.log('Received password:', password);
    console.log('Received email:', user_email);
    try {
      const result = await userService.changeUserPassword(password, user_email);
  
      if (result) {
        const mailOptions = {
          from: 'opshubcommunity@gmail.com',
          to: user_email,
          subject: 'Password Change Notification',
          text: 'Your password has been changed successfully.',
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
        return res.status(200).json({ message: 'Password updated successfully' });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
 
  


module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  getUserProfile,
  changeUserPassword,
};