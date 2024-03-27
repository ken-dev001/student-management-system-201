import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { getStudentById, updateStudent } from '../../utils/marketplace'; // Import getStudentById function

const UpdateStudent = ({ studentId }) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");

    const isFormFilled = () => name && age && email;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                // Fetch student details by ID
                const studentDetails = await getStudentById(studentId);
                setName(studentDetails.name);
                setAge(studentDetails.age);
                setEmail(studentDetails.email);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStudentDetails();
    }, [studentId]);

    const updateStudentDetails = async () => {
        try {
            // Call the updateStudent function with the updated student details
            const updatedStudent = await updateStudent(studentId, { name, age, email });
            toast(<NotificationSuccess text="Student updated successfully." />);
            handleClose();
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Failed to update the student." />);
        }
    };

    return (
        <>
            {/* Button to trigger the modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <FloatingLabel controlId="name" label="Name">
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="age">
                            <FloatingLabel controlId="age" label="Age">
                                <Form.Control
                                    type="number"
                                    placeholder="Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <FloatingLabel controlId="email" label="Email">
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                        onClick={() => { updateStudentDetails(); }}
                        disabled={!isFormFilled()}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpdateStudent;
