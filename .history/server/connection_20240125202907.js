const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 8000,
    password: "Mankubro@4444",
    database: "postgres"
})
module.exports = client