const Pool= require("pg").Pool;
// Connecting to postgresql
require("dotenv").config();


const pool= new Pool({
    user:"postgres",
    password:"sumit123",
    database:"user_database",
    host:"localhost",
    port:5432
})

module.exports =pool;