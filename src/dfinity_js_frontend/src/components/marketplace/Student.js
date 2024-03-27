import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Stack, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { NotificationError, NotificationSuccess } from "../utils/Notifications";
import UpdateStudent from "./UpdateStudent";
import DeleteStudent from "./DeleteStudent";

const Student = ({ student, deleteStudent }) => {
    const { id, name, age, email, courses } = student;

    const handleDeleteStudent = () => {
        try {
            // Perform delete operation here
            deleteStudent(id);
            toast(<NotificationSuccess text="Student removed successfully." />);
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Failed to remove student." />);
        }
    };

    return (
        <Col md={4} className="mb-3">
            <Card>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Badge bg="dark" text="light" className="mx-1">
                        {id}
                    </Badge>
                    <Card.Text>
                        <p>Age: {age}</p>
                        <p>Email: {email}</p>
                        <p>Courses: {courses.join(", ")}</p>
                    </Card.Text>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Stack direction="horizontal" gap={3}>
                                <UpdateStudent studentId={id} />
                                <DeleteStudent deleteStudent={handleDeleteStudent} />
                            </Stack>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
};

Student.propTypes = {
    student: PropTypes.instanceOf(Object).isRequired,
    deleteStudent: PropTypes.func.isRequired,
};

export default Student;
