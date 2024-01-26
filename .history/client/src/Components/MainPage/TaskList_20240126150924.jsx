import React, {useState, useEffect} from 'react';
import EditTaskPopUp from '../EditTaskPopUp/EditTaskPopUp';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
function TaskList({title, description, id, onDelete, refreshTasks}) {
  const [showEditModal, setShowEditModal] = useState(false);
  
  

  const handleEdit = () => {
    setShowEditModal(true);
  };
  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Button
          style={{ marginRight: "1rem", marginBottom:'1rem' }}
          variant="primary"
          onClick={handleEdit}
        >
          Edit
        </Button>

        {showEditModal && (
          <EditTaskPopUp
            closeModal={() => setShowEditModal(false)}
            showEditModal={showEditModal}
            id={id}
            refreshTasks={refreshTasks} // Pass the refreshTasks function to EditTaskPopUp
          />
        )}
        <Button variant="primary" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TaskList