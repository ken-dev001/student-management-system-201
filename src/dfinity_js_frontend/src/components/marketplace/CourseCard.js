import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Col, Stack, Row, Modal, Form, InputGroup} from "react-bootstrap";
import { toast } from "react-toastify";

const CourseCard = ({ course, onDelete, onUpdate }) => {
    const { id, title, description, credits, students } = course;

    return (
        <Card className="mb-3">
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
            Credits: {credits.toString()}
            </Card.Text>
            <Card.Text>
            Description: {description}
            </Card.Text>
            <Card.Text>
            Students: {students && students.map((student) => student.title).join(", ")}
            </Card.Text>
            <Stack direction="horizontal" gap={3}>
            <Button variant="primary" onClick={() => onUpdate(id)}>Update</Button>
            <Button variant="danger" onClick={() => onDelete(id)}>Delete</Button>
            </Stack>
        </Card.Body>
    </Card>
    );
};

export default CourseCard;
