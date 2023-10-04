const pool = require("../config.js").pool2;
const multer = require('multer');





const createTemplate = ({ description, images }) => {
    return new Promise((resolve, reject) => {
       
        const query = `
            INSERT INTO template (description, image1, image2)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;

        pool.query(query,  [description, images[0].image1, images[1].image2], (error, result) => {
            if (error) {
                console.error('Error inserting data into the table:', error);
                reject(error);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};
module.exports={
    createTemplate
}