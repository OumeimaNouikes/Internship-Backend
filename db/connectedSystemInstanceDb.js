const pool = require("../config.js").pool2;
//////////////////////Create instance////////////////////////////
const createConnectedSystemInstance = async (connected_system_name, instance_name, url_path) => {
    const query1 = `
    SELECT id FROM connected_systems WHERE name = $1;
`;


const result1 = await pool.query(query1, [connected_system_name]);

const connectedSystemId = result1.rows[0].id;

    const query = `
        INSERT INTO connected_system_instances (connected_system_id, instance_name, url_path)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    const result = await pool.query(query, [connectedSystemId, instance_name, url_path]);
    return result.rows[0];
};


////////////////Get instance by system//////////////////////////////
const getInstancesBySystem = async (systemId) => {
    const query = 'SELECT * FROM connected_system_instances WHERE connected_system_id = $1';
    const result = await pool.query(query, [systemId]);
    return result.rows;
};
//////////////////////////Count systems instance///////////////////////////
const countInstances = async () => {
    const query = 'SELECT COUNT(*) as count FROM connected_system_instances';
    const result = await pool.query(query);
    return result.rows[0].count;
};

module.exports = {
    createConnectedSystemInstance,
    getInstancesBySystem,
    countInstances,
};
