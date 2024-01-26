const express = require('express');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const router=express.Router();
const client=require('../connection.js')


router.post('/task/add', async(req, res)=>{
  const { title, description } = req.body;
  try{
    const newTaskQuery = {
      text: 'INSERT INTO tasks(title, description) VALUES($1, $2)',
      values: [title, description],
    };
    client.query(newTaskQuery, (err, result)=>{
      if(!err){
        res.json({ message: 'Task created successfully!' });
      }
    })
  }
  catch(error){  
    res.status(500).json({ error: error.message });
  }
})
router.get('/task/get-all', async (req, res) => {
  

  let query = 'SELECT * FROM tasks';


  client.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Server error' });
    } else {
      res.status(200).json(result.rows);
    }
  });

});


module.exports=router