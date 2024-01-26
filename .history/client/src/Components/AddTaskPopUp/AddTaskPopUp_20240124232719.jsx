import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './AddTaskPopUp.module.css'

function AddTaskPopUp({ closeModal, showAddModal }) {
  const navigate = useNavigate();
  const[task, setTask]=useState({
    title:'',
    description : '', 
  })
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask({
      ...task,
      [name]: value,
    });
  };
  const sendTask = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/create-task', task)
      .then(res => {
        navigate('/');
        window.location.reload()
      })
      .catch(err => console.log(err));
  };

  
  const handleClickOutside = (event) => {
    event.stopPropagation();
    closeModal();
  };

  const handleClickInside = (event) => {
    event.stopPropagation();
  };
  return (
    <div className={styles.addPopupContainer}>
      <header className={styles.addPopupHeader}>
        
        {showAddModal && (
          <div className={styles.modalAdd} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} onClick={handleClickOutside}>
            <div className="modal-add-content" onClick={handleClickInside}>
              
              <div className={styles.modalAddBody}>
             
              <form className={styles.modalAddBodyLeft}>
              <h2>Add your Task </h2>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="companyName" value={task.title} onChange={handleChange} placeholder="Name of the company"/>
                </div>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="description" value={task.description} onChange={handleChange} placeholder="Add description" />
                </div>

                
                <div style={{width:'85%'}}>
                  <button className={styles.addPopupButton} type="submit" style={{ cursor:'pointer'}} onClick={sendTask}>Add+</button>
                </div>

              </form>
                <div className={styles.modalAddBodyRight}>
                  <h1 style={{fontSize:'xx-large'}}>Feedback</h1>
                  <h1 style={{fontSize:'x-large', width:'40%'}}>Add your product and rate other items.............</h1>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}

export default AddTaskPopUp