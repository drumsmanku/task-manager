import React, {useState, useEffect} from 'react';
import EditTaskPopUp from '../EditTaskPopUp/EditTaskPopUp';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function TaskList({title, description}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const onDelete=()=>{
    
  }
  

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
          />
        )}
        <Button variant="primary">Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default TaskList