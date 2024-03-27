import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Col, Stack, Row, Modal, Form, InputGroup} from "react-bootstrap";
import { toast } from "react-toastify";


const StudentCard = ({student, onDelete, onUpdate}) => {
    const { id, name, age, email, courses } = student;
  return (
    <Card className="mb-3">
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
            Age: {age.toString()}
            </Card.Text>
            <Card.Text>
            Email: {email}
            </Card.Text>
            <Card.Text>
            Courses: {courses && courses.map((course) => course.title).join(", ")}
            </Card.Text>
            <Stack direction="horizontal" gap={3}>
            <Button variant="primary" onClick={() => onUpdate(id)}>Update</Button>
            <Button variant="danger" onClick={() => onDelete(id)}>Delete</Button>
            </Stack>
        </Card.Body>
    </Card>
  )
}

export default StudentCard