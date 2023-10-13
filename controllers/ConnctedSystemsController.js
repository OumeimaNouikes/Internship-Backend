

const ConnectedSystemsService = require("../services/ConnectedSystemsService");

const multer = require('multer');

const myStorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
        let date = Date.now();
        let filename = date + '.' + file.mimetype.split('/')[1];
        callback(null, filename);
    }
});
const upload = multer({ storage: myStorage }).single('image'); 

/////////////////////Create a connected system////////////////////////
 const CreateConnctedSystems = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            const { name } = req.body;
            const image = req.file.filename;

            const insertedData = await ConnectedSystemsService.createConnectedSystem(name, image);

            res.status(201).json(insertedData);
        });
    } catch (error) {
        console.error('Error inserting data into the table:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

///////////////////get connected systems//////////////////////
 const getConnectSystems =async (req, res) => {
    try {
        const connectedSystems = await ConnectedSystemsService.getAllConnectedSystems();
        res.status(200).json(connectedSystems);
    } catch (error) {
        console.error('Error fetching connected systems:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports={
    getConnectSystems,
    CreateConnctedSystems
  }
