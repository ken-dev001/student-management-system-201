import React from 'react';
import { Button } from 'react-bootstrap';

const DeleteStudent = ({ discard }) => {
  return (
    <Button 
      onClick={discard}
      variant='dark'
      className='rounded-pill px-0'
      style={{ width: "38px" }}
    >
      <i className="bi bi-trash-fill"></i>
    </Button>
  );
};

export default DeleteStudent;
