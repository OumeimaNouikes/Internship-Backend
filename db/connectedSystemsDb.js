const pool = require("../config.js").pool2;



/////////////////////////Get by name///////////////////////
const getConnectedSystemByName = async (name) => {
    const query = `
        SELECT * FROM connected_systems WHERE name = $1;
    `;

    const result = await pool.query(query, [name]);
    return result.rows[0];
};
////////////////////////Creation///////////////////////////
const createConnectedSystem = async (name, image) => {
    
    const existingSystem = await getConnectedSystemByName(name);

    if (existingSystem) {
        return "name already exists";
    }

    
    const insertQuery = `
        INSERT INTO connected_systems (name, image)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const result = await pool.query(insertQuery, [name, image]);
    return result.rows[0];
};
///////////////////Get All/////////////////////
const getConnectedSystems = async () => {
    const query = `
        SELECT * FROM connected_systems;
    `;

    const result = await pool.query(query);
    return result.rows;
};
module.exports = {
    createConnectedSystem,
    getConnectedSystemByName,
    getConnectedSystems
};
