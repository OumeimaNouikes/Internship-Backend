const {
    createUserDb,
    getUserByEmailDb,
    getUserByNameDb,
    changeUserPasswordDb,
    getUserByIdDb,
    updateUserDb,
    deleteUserDb,
    getAllUsersDb,
    
  } = require("../db/userDb");
 
  class UserService {

    ////////Create user////
    createUser = async (user) => {
      try {
        return await createUserDb(user);
      } catch (error) {
        console.error('Error:', error);
    throw error;
      }
    };

    ///////Get user by email///////
    getUserByEmail = async (email) => {
      try {
        const user = await getUserByEmailDb(email);
        return user;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    };
    //////////////Get user by username/////
    getUserByUsername = async (username) => {
      try {
        const user = await getUserByNameDb(username);
        return user;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    };
    ////////////Get user by id ///////////
    
    getUserById = async ( userId ) => {
      try {
         
         const user = await getUserByIdDb(userId);
       
        
        return user;
      } catch (error) {
         console.error('Error:', error);
          throw error;
      }
    };
    /////////////Change Passowrd////////////
    changeUserPassword = async (password, email) => {
      try {
        return await changeUserPasswordDb(password, email);
      } catch (error) {
        console.error('Error:', error);
    throw error;
      }
    };
    //////////Update user///////////////
    updateUser = async (user) => {
        const { email, username, id } = user;
        const errors = {};
        try {
          const getUser = await getUserByIdDb(id);
          const findUserByEmail = await getUserByEmailDb(email);
          const findUserByUsername = await getUserByNameDb(username);
          const emailChanged =
            email && getUser.email.toLowerCase() !== email.toLowerCase();
          const usernameChanged =
            username && getUser.username.toLowerCase() !== username.toLowerCase();
      
          if (emailChanged && typeof findUserByEmail === "object") {
            errors["email"] = "Email is already taken";
          }
          if (usernameChanged && typeof findUserByUsername === "object") {
            errors["username"] = "Username is already taken";
          }
      
          if (Object.keys(errors).length > 0) {
            const error = new Error("Validation error");
            error.statusCode = 403; 
            error.errors = errors;
            throw error;
          }
      
          return await updateUserDb(user);
        } catch (error) {
          
          console.error('Error:', error);
          throw error; 
        }
      };
      
  ///////////////Delete user//////////
    deleteUser = async (id) => {
      try {
        return await deleteUserDb(id);
      } catch (error) {
        console.error('Error:', error);
    throw error;
      }
    };
  /////////////////Get all users//////
    getAllUsers = async () => {
      try {
        return await getAllUsersDb();
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    };
  }
  
  module.exports = new UserService();