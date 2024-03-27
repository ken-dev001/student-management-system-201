import React, { useState } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const PayCourseFee = ({ payCourseFee }) => {
    const [studentId, setStudentId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [amount, setAmount] = useState(0);

    const isFormFilled = () => studentId && courseId && amount > 0;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button onClick={handleShow} variant="info">Pay Course Fee</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Pay Course Fee</Modal.Title>
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
                        <Form.Group controlId="amount">
                            <FloatingLabel controlId="amount" label="Amount">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="info" onClick={() => {
                        payCourseFee(studentId, courseId, amount);
                        handleClose();
                    }} disabled={!isFormFilled()}>Pay Fee</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PayCourseFee;
