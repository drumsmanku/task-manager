const {Client} = require('pg')

const client = new Client({
  connectionString: 'postgres://task_handler_xgqx_user:xIuqXOFhENwpC3dLP65WdCKunhVhklZz@dpg-cmpoh9mct0pc73f414t0-a.oregon-postgres.render.com/task_handler_xgqx',
  ssl: { rejectUnauthorized: false } 
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database on Render'))
  .catch(err => console.error('Connection to PostgreSQL database failed', err));

module.exports = client