const pool = require("../config.js").pool;



//////////Get All Users//////////
const getAllUsersDb = async () => {
  const { rows: users } = await pool.query("select * from users");
  return users;
};

/////////////Create User////////////
const createUserDb = async ({ user_name, user_email, user_password, state, country }) => {
  const { rows: user } = await pool.query(
    `INSERT INTO users(user_name, user_email, user_password, state, country ) 
    VALUES($1, $2, $3, $4, $5) 
    returning user_id, user_name, user_email, user_password, state, country, created_at`,
    [user_name, user_email, user_password, state, country]
  );
  return user[0];
};


/////////////////Get user By id////////////////////
const getUserByIdDb = async function(userId) {
    try {
      const query = {
        text: 'SELECT * FROM users WHERE user_id = $1',
        values: [userId],
      };
      console.log('Query:', query.text, 'Values:', query.values);
      const result = await pool.query(query);
  
      if (result.rows.length === 0) {
        return null;
      }
  
      return result.rows[0];
    } catch (error) {
      console.error('Error in getUserByIdDb:', error);
      throw error;
    }
  };

  ////////////////////////Get user by name////
  async function getUserByNameDb(user_name) {
    try {
      
      const query = {
        text: 'SELECT * FROM users WHERE user_name = $1',
        values: [user_name],
      };
  
     
      const result = await pool.query(query);
  
      
      if (result.rows.length === 0) {
        return null; 
      }
  
      
      return result.rows[0];
    } catch (error) {
      console.error('Error in getUserByIdDb:', error);
      throw error;
    }
  }

  ////////////////Get User by Email///////
  async function getUserByEmailDb(user_email) {
    try {
     
      const query = {
        text: 'SELECT * FROM users WHERE user_email = $1',
        values: [user_email],
      };
  
     
      const result = await pool.query(query);
  
     
      if (result.rows.length === 0) {
        return null; 
      }
  
      
      return result.rows[0];
    } catch (error) {
      console.error('Error in getUserByIdDb:', error);
      throw error;
    }
  }

  ///////////////////Update User ////////////
const updateUserDb = async ({
    user_name, user_email, state, country, user_id
}) => {
  const { rows: user } = await pool.query(
    `UPDATE users set user_name = $1, user_email = $2, state = $3, country = $4
      where user_id = $5 returning user_name, user_email, user_id, country, state`,
    [user_name, user_email, state, country, user_id]
  );
  return user[0];
};
///////////////delete user/////////////
const deleteUserDb = async (user_id) => {
  const { rows: user } = await pool.query(
    "DELETE FROM users where user_id = $1 returning *",
    [id]
  );
  return user[0];
};


///////////Change Passsword//////////
const changeUserPasswordDb = async (password, email) => {
  return await pool.query("update users set user_password = $1 where user_email = $2", [
    password,
    email,
  ]);
};

module.exports = {
  getAllUsersDb,
  getUserByIdDb,
  getUserByNameDb,
  getUserByEmailDb,
  updateUserDb,
  createUserDb,
  deleteUserDb,
  changeUserPasswordDb,
};