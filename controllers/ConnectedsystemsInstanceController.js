
const ConnectedSystemsInstanceService = require("../services/ConnectedSystemsInstanceService");
const axios = require('axios')
///////////////////////Create//////////////////////////////
const createConnectedSystemInstance = async (req, res) => {
    try {
        const { connected_system_name, instance_name, url_path } = req.body;
        const createdInstance = await ConnectedSystemsInstanceService.createConnectedSystemInstance(connected_system_name, instance_name, url_path);
        res.status(201).json(createdInstance);
    } catch (error) {
        console.error('Error creating instance:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//////////////////////////////////Get by system1/////////////////////////
const getInstancesBySystem1 =async (req, res) => {
    const { connected_system_id_1 } = req.params;
    try {
        const instances = await ConnectedSystemsInstanceService.getInstancesBySystem(connected_system_id_1);
        res.json(instances);
    } catch (error) {
        console.error('Error fetching System 1 instances:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

///////////////////////////////////get by system 2////////////////////////
const getInstancesBySystem2 = async (req, res) => {
    const { connected_system_id_2 } = req.params;
    try {
        const instances = await ConnectedSystemsInstanceService.getInstancesBySystem(connected_system_id_2);
        res.json(instances);
    } catch (error) {
        console.error('Error fetching System 2 instances:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

///////////////////////////////Count///////////////////////
const countInstances= async (req, res) => {
    try {
        const count = await ConnectedSystemsInstanceService.countInstances();
        res.json({ count });
    } catch (error) {
        console.error('Error counting connected_system_instances:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//////////////////////////check validity///////////////////////
const checkurl = async (req, res) => {
    const { url } = req.query;
    try {
     
        const response = await axios.get(url);
    
        
        if (response.status === 200) {
          res.status(200).json({ isValid: true });
        } else {
          res.status(200).json({ isValid: false });
        }
      } catch (error) {
      
        console.error('Error checking URL validity:', error);
        res.status(200).json({ isValid: false });
      }
    };

module.exports = {
    createConnectedSystemInstance,
getInstancesBySystem1,
getInstancesBySystem2,
countInstances,
checkurl}
