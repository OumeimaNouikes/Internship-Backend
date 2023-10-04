const pool1 = require("../config.js").pool1;

/////////////// Create Certificate/////////
const createWebConsoleSettings = async ({  access_port,
    https_enabled,
    certificate_path,
    certificate_key_password,
    certificate_key_manager_password }) => {
    const { rows: web } = await pool1.query(
      `INSERT INTO web_console_settings (
        access_port,
        https_enabled,
        certificate_path,
        certificate_key_password,
        certificate_key_manager_password
      )
      VALUES ($1, $2, $3, $4, $5) RETURNING access_port,
      https_enabled,
      certificate_path,
      certificate_key_password,
      certificate_key_manager_password;`,[access_port,
        https_enabled,
        certificate_path,
        certificate_key_password,
        certificate_key_manager_password]
    
    );
    return web[0];
    };
    //////////////////////Get by acces Port//////////////////
    async function getwebConsoleSettingsDb(access_port) {
        try {
          
          const query = {
            text: 'SELECT * FROM web_console_settings WHERE access_port = $1',
            values: [access_port],
          };
      
         
          const result = await pool1.query(query);
      
          
          if (result.rows.length === 0) {
            return null; 
          }
      
          
          return result.rows[0];
        } catch (error) {
          console.error('Error in getwebSettingsByIdDb:', error);
          throw error;
        }
      }

       ///////////////////Update Web Settings ////////////
       const updateWebSettingsConsoleDb = async ({
        
        https_enabled,
        certificate_path,
        certificate_key_password,
        certificate_key_manager_password,
        access_port
      }) => {
        const { rows: web } = await pool1.query(
          `UPDATE web_console_settings
           SET
             https_enabled = $1,
             certificate_path = $2,
             certificate_key_password = $3,
             certificate_key_manager_password = $4
           WHERE access_port = $5
           RETURNING
             
             https_enabled,
             certificate_path,
             certificate_key_password,
             certificate_key_manager_password,
             access_port`,
          [
            
            https_enabled,
            certificate_path,
            certificate_key_password,
            certificate_key_manager_password,
            access_port
            
          ]
        );
        console.log('web0:',web[0]);
        return web[0];
        
      };
      
  module.exports ={
    getwebConsoleSettingsDb,
    updateWebSettingsConsoleDb,
    createWebConsoleSettings
  };