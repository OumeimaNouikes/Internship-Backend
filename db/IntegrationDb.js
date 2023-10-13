const pool = require("../config.js").pool2;

const createIntegration = async (name, templateId, systemInstanceId1, systemInstanceId2) => {
    const query = `
        INSERT INTO integration (name, template_id, system_instance_id_1, system_instance_id_2)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const result = await pool.query(query, [name, templateId, systemInstanceId1, systemInstanceId2]);
    return result.rows[0];
};

const countIntegrations = async () => {
    const query = 'SELECT COUNT(*) as count FROM integration';
    const result = await pool.query(query);
    return result.rows[0].count;
};

module.exports = {
    createIntegration,
    countIntegrations,
};
