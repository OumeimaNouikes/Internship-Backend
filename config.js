const Pool =require("pg").Pool;


const pool=new Pool({

    user: "postgres",
    password: "root",
    host:"localhost",
    port:5432,
    database:"IDM"



});

const pool1 = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'settings',
  })

  const pool2 = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'integration',
  })

module.exports={pool, pool1, pool2};