import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from  './EditTaskPopUp.module.css';

function EditTaskPopUp({closeModal, showEditModal, id}) {
  const[task, setTask]=useState({
    title:'',
    description : '', 
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/task/get-one/${id}`) 
      .then(res => {
        console.log(res.data);
        setTask({
          title: res.data.title,
          description: res.data.description,
         
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (event) => {
    
    const { name, value } = event.target;
    setTask({
      ...task,
      [name]: value,
    });
  };
  const handleEditTask = (event) => {
    event.preventDefault();
    axios
      .patch(`http://localhost:4000/edit-task/${id}`, task)
      .then(() => {
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClickOutside = (event) => {
    event.stopPropagation();
    closeModal();
  };

  const handleClickInside = (event) => {
    event.stopPropagation();
  };
  return (
    <div className={styles.editPopupContainer}>
      <header className={styles.editPopupHeader}>
        
        {showEditModal && (
          <div className={styles.modalEdit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} onClick={handleClickOutside}>
            <div className={styles.modalEditContent} onClick={handleClickInside}>
              
              <div className={styles.modalEditBody}>
             
              <form className={styles.modalEditBodyLeft}>
              <h2>edit your product </h2>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="title" value={task&&task.title} onChange={handleChange} placeholder="Title"/>
                </div>

                <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
                  <input type="text" name="description" value={task&&task.description} onChange={handleChange} placeholder="edit description" />
                </div>

                
                <div style={{width:'85%'}}>
                  <button className={styles.editPopupButton} type="submit" style={{ cursor:'pointer'}} onClick={handleEditTask}>Edit</button>
                </div>

              </form>
                <div className={styles.modalEditBodyRight}>
                  <h1 style={{fontSize:'xx-large'}}>Feedback</h1>
                  <h1 style={{fontSize:'x-large', width:'40%'}}>edit your product and rate other items.............</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}

export default EditTaskPopUp