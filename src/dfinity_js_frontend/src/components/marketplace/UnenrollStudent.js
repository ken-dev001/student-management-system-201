import React, { useState } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const UnenrollStudent = ({ unenrollStudent }) => {
    const [studentId, setStudentId] = useState("");
    const [courseId, setCourseId] = useState("");

    const isFormFilled = () => studentId && courseId;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button onClick={handleShow} variant="danger">Unenroll Student</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Unenroll Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="studentId">
                            <FloatingLabel controlId="studentId" label="Student ID">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Student ID"
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group controlId="courseId">
                            <FloatingLabel controlId="courseId" label="Course ID">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Course ID"
                                    value={courseId}
                                    onChange={(e) => setCourseId(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="danger" onClick={() => {
                        unenrollStudent(studentId, courseId);
                        handleClose();
                    }} disabled={!isFormFilled()}>Unenroll</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UnenrollStudent;
