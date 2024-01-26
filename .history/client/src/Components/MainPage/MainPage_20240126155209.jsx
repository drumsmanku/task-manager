import React, {useState, useEffect} from 'react'
import styles from './MainPage.module.css'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import AddTaskPopUp from '../AddTaskPopUp/AddTaskPopUp';
import axios from 'axios';
import TaskList from './TaskList';



function MainPage() {
  const navigate =useNavigate();
  const [user, setUser]=useState('');
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const [task, setTask]=useState([])
  const [showAddModal, setShowAddModal] = useState(false);
  const [showButton, setShowButton]= useState(false);

  useEffect(()=>{
    const User=localStorage.getItem('user');
    if(User){
      setUser(User)
      setIsLoggedIn(true);
    }
        
  }, []);

  const handleLogin=()=>{
    navigate('/login');
  }
  const handleSignup=()=>{
    navigate('/register')
  }
  const handleLogout=()=>{
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    
  }
  const handleAdd = () => {
    setShowAddModal(true);
  };

  const refreshTasks = () => {
    axios.get('http://localhost:4000/task/get-all')
      .then(res => setTask(res.data))
      .catch(err => console.error(err));
  };
  
  const handleDeleteTask = (taskId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    if(isConfirmed) {
      axios.delete(`http://localhost:4000/task/delete/${taskId}`)
        .then(() => {
          console.log("Delete successful");
          refreshTasks(); 
        })
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    refreshTasks();
  }, [showAddModal]);
  return (
    <div className={styles.container}>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div className={styles.navbar}>
          <div className={styles.navBarContent}>
            <div>
              {isLoggedIn ? (
                <>
                  <button
                    className={styles.logoutButton}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button className={styles.loginButton} onClick={handleLogin}>
                    Login{" "}
                  </button>
                  &nbsp;|&nbsp;
                  <button
                    className={styles.signupButton}
                    onClick={handleSignup}
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {isLoggedIn ? (
          <>
            <div className={styles.mainContent}>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginTop: "2rem",
                }}
              >
                <h3>Hi {user}</h3>
                <Button
                  style={{ width: "9rem", marginBottom:'2rem' }}
                  onClick={handleAdd}
                  variant="success"
                >
                  Create Task
                </Button>{" "}
              </div>

              {showAddModal && (
                <AddTaskPopUp
                  closeModal={() => setShowAddModal(false)}
                  showAddModal={showAddModal}
                />
              )}

              {task &&
                task.map((item, idx) => (
                  <TaskList
                    key={idx}
                    title={item.title}
                    description={item.description}
                    id={item.id}
                    onDelete={handleDeleteTask} 
                    refreshTasks={refreshTasks} 
                  />
                ))}
            </div>
          </>
        ) : (
          <>
            <h1 style={{textAlign:'center', marginTop:'3rem'}}>Please login/register first</h1>
          </>
        )}
      </div>
    </div>
  );
}

export default MainPage