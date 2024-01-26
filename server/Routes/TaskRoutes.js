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
router.get('/task/get-one/:id', async (req, res) => {


  client.query(`Select * from tasks where id=${req.params.id}`, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
    else{
      console.log(err);
    }
});

});

router.patch('/task/edit-task/:id', async (req, res) => {

  const updateQuery = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *';


  const { title, description } = req.body;


  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }


  try {

    const result = await client.query(updateQuery, [title, description, req.params.id]);


    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }


    res.json(result.rows[0]);
  } catch (err) {

    console.error('Error running query', err.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.delete('/task/delete/:id', async (req, res) => {


  client.query(`Delete from tasks where id=${req.params.id}`, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
    else{
      console.log(err);
    }
});

});


module.exports=router