import React, { useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { updateCourseFee } from '../../utils/marketplace'; // Update with your actual import path

const UpdateCourseFee = ({ studentId, courseId }) => {
    const [newFee, setNewFee] = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isFormFilled = () => newFee > 0;

    const updateFee = async () => {
        try {
            await updateCourseFee(studentId, courseId, newFee);
            toast(<NotificationSuccess text="Course fee updated successfully." />);
            handleClose();
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Failed to update course fee." />);
        }
    }

    return (
        <>
            <Button
                onClick={handleShow}
                variant="dark"
                className="rounded-pill px-0"
                style={{ width: "38px" }}
            >
                <i className="bi-cash"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Course Fee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="newFee">
                            <FloatingLabel controlId="newFee" label="New Fee">
                                <Form.Control
                                    type="number"
                                    placeholder="New Fee"
                                    value={newFee}
                                    onChange={(e) => setNewFee(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => { updateFee() }}
                        disabled={!isFormFilled()}
                    >
                        Update Fee
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdateCourseFee;
