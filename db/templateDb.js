const pool = require("../config.js").pool2;


const createTemplate = async (description, image1, image2, connectedSystemName1, connectedSystemName2,) => {
    
    const query1 = `
        SELECT id FROM connected_systems WHERE name = $1 OR name = $2;
    `;

   
    const result1 = await pool.query(query1, [connectedSystemName1, connectedSystemName2]);

    const connectedSystemId1 = result1.rows[0].id;
    const connectedSystemId2 = result1.rows[1].id;

    
    const query2 = `
        INSERT INTO template (description, image1, image2, connected_system_id_1, connected_system_id_2)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const result2 = await pool.query(query2, [description, image1, image2, connectedSystemId1, connectedSystemId2]);
    return result2.rows[0];

};

const getTemplates = async () => {
    const query = `
        SELECT * FROM template;
    `;

    const result = await pool.query(query);
    return result.rows;
};

const deleteTemplate = async (id) => {
    const deleteQuery = "DELETE FROM template WHERE id = $1";
    await pool.query(deleteQuery, [id]);
};

module.exports = {
    createTemplate,
    getTemplates,
    deleteTemplate,
};





