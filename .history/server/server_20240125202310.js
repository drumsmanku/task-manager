const express= require('express');
const client = require('./connection.js');
const dotenv=require('dotenv');
const bodyParser = require('body-parser');
const cors=require('cors');
const authenticationRoutes=require('./Routes/AuthenticationRoutes.js')
const taskRoutes=require('./Routes/TaskRoutes.js')

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(authenticationRoutes);
app.use(taskRoutes);

app.listen(4000, () => {
  console.log("Server is now listening at port 4000");
});


