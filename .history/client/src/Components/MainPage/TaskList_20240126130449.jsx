import React, {useState, useEffect} from 'react';
import EditTaskPopUp from '../EditTaskPopUp/EditTaskPopUp';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
function TaskList({title, description, id}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const onDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    if(isConfirmed) {
      axios.delete(`http://localhost:4000/task/delete/${id}`)
        .then(() => console.log("Delete successful"))
        .catch(err => console.log(err));
    }
  };
  

  const handleEdit = () => {
    setShowEditModal(true);
  };
  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <Button style={{ marginRight: "1rem" }} variant="primary" onClick={handleEdit}>
          Edit
        </Button>

        {showEditModal && (
          <EditTaskPopUp
            closeModal={() => setShowEditModal(false)}
            showEditModal={showEditModal}
            id={id}
          />
        )}
        <Button variant="primary" onClick={onDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default TaskList