import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

const FeeCard = ({ fee }) => {
  const { id, studentId, courseId, amount } = fee;
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{id}</Card.Title>
        <Card.Text>
          Student ID: {studentId}
        </Card.Text>
        <Card.Text>
          Course ID: {courseId}
        </Card.Text>
        <Card.Text>
          Amount: {amount.toString()}
        </Card.Text>
        <Stack direction="horizontal" gap={3}>
            <Button variant="danger" onClick={() => onDelete(id)}>Delete</Button>
            </Stack>
      </Card.Body>
    </Card>
  );
};

FeeCard.propTypes = {
  fee: PropTypes.object.isRequired,
};

export default FeeCard;
