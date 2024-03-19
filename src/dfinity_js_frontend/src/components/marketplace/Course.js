import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Stack, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { NotificationError, NotificationSuccess } from "../utils/Notifications";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";

const Course = ({ course, deleteCourse }) => {
    const { id, title, description, credits, students } = course;

    const handleDeleteCourse = () => {
        try {
            // Perform delete operation here
            deleteCourse(id);
            toast(<NotificationSuccess text="Course removed successfully." />);
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Failed to remove course." />);
        }
    };

    return (
        <Col md={4} className="mb-3">
            <Card>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Badge bg="dark" text="light" className="mx-1">
                        {id}
                    </Badge>
                    <Card.Text>
                        <p>Description: {description}</p>
                        <p>Credits: {credits}</p>
                        <p>Students: {students.join(", ")}</p>
                    </Card.Text>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Stack direction="horizontal" gap={3}>
                                <UpdateCourse courseId={id} />
                                <DeleteCourse deleteCourse={handleDeleteCourse} />
                            </Stack>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
};

Course.propTypes = {
    course: PropTypes.instanceOf(Object).isRequired,
    deleteCourse: PropTypes.func.isRequired,
};

export default Course;
