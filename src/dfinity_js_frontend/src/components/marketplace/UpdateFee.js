import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { getFeeById, updateFee } from '../../utils/marketplace'; // Import getFeeById and updateFee functions

const UpdateFee = ({ feeId }) => {
    const [studentId, setStudentId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [amount, setAmount] = useState(0);

    const isFormFilled = () => studentId && courseId && amount;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchFeeDetails = async () => {
            try {
                // Fetch fee details by ID
                const feeDetails = await getFeeById(feeId);
                setStudentId(feeDetails.studentId);
                setCourseId(feeDetails.courseId);
                setAmount(feeDetails.amount);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFeeDetails();
    }, [feeId]);

    const updateFeeDetails = async () => {
        try {
            // Call the updateFee function with the updated fee details
            await updateFee(feeId, { studentId, courseId, amount });
            toast(<NotificationSuccess text="Fee updated successfully." />);
            handleClose();
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Failed to update the fee." />);
        }
    };

    return (
        <>
            {/* Button to trigger the modal */}
            <Button onClick={handleShow} variant="dark" className="rounded-pill px-0" style={{ width: "38px" }}>
                <i className="bi-pencil-square"></i>
            </Button>

            {/* Modal for updating fee */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Fee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Form to update fee details */}
                    <Form>
                        <Form.Group className="mb-3" controlId="studentId">
                            <FloatingLabel controlId="studentId" label="Student ID">
                                <Form.Control
                                    type="text"
                                    placeholder="Student ID"
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="courseId">
                            <FloatingLabel controlId="courseId" label="Course ID">
                                <Form.Control
                                    type="text"
                                    placeholder="Course ID"
                                    value={courseId}
                                    onChange={(e) => setCourseId(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="amount">
                            <FloatingLabel controlId="amount" label="Amount">
                                <Form.Control
                                    type="number"
                                    placeholder="Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
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
                        onClick={() => { updateFeeDetails(); }}
                        disabled={!isFormFilled()}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpdateFee;
