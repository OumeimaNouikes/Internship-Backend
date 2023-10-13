const Pool =require("pg").Pool;


const pool=new Pool({

    user: "postgres",
    password: "Coral2023_",
    host:"147.135.247.54",
    port:5432,
    database:"idm"



});

const pool1 = new Pool({
    user: 'postgres',
    password: 'Coral2023_',
    host: '147.135.247.54',
    port: 5432,
    database: 'settings',
  })

  const pool2 = new Pool({
    user: 'postgres',
    password: 'Coral2023_',
    host: '147.135.247.54',
    port: 5432,
    database: 'integration',
  })

module.exports={pool, pool1, pool2};