import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { getCourseById, updateCourse } from '../../utils/marketplace'; // Import getCourseById and updateCourse functions

const UpdateCourse = ({ courseId }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [credits, setCredits] = useState(0);

    const isFormFilled = () => title && description && credits;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                // Fetch course details by ID
                const courseDetails = await getCourseById(courseId);
                setTitle(courseDetails.title);
                setDescription(courseDetails.description);
                setCredits(courseDetails.credits);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    const updateCourseDetails = async () => {
        try {
            // Call the updateCourse function with the updated course details
            await updateCourse(courseId, { title, description, credits });
            toast(<NotificationSuccess text="Course updated successfully." />);
            handleClose();
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Failed to update the course." />);
        }
    };

    return (
        <>
            {/* Button to trigger the modal */}
            <Button onClick={handleShow} variant="dark" className="rounded-pill px-0" style={{ width: "38px" }}>
                <i className="bi-pencil-square"></i>
            </Button>

            {/* Modal for updating course */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Form to update course details */}
                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <FloatingLabel controlId="title" label="Title">
                                <Form.Control
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <FloatingLabel controlId="description" label="Description">
                                <Form.Control
                                    type="text"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="credits">
                            <FloatingLabel controlId="credits" label="Credits">
                                <Form.Control
                                    type="number"
                                    placeholder="Credits"
                                    value={credits}
                                    onChange={(e) => setCredits(e.target.value)}
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
                        onClick={() => { updateCourseDetails(); }}
                        disabled={!isFormFilled()}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpdateCourse;
