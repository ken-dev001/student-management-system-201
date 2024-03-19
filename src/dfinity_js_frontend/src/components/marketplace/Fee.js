import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Stack, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { NotificationError, NotificationSuccess } from "../utils/Notifications";
import UpdateFee from "./UpdateFee";
import DeleteFee from "./DeleteFee";

const Fee = ({ fee, deleteFee }) => {
    const { id, studentId, courseId, amount } = fee;

    const handleDeleteFee = () => {
        try {
            // Perform delete operation here
            deleteFee(id);
            toast(<NotificationSuccess text="Fee removed successfully." />);
        } catch (error) {
            console.log({ error });
            toast(<NotificationError text="Failed to remove fee." />);
        }
    };

    return (
        <Col md={4} className="mb-3">
            <Card>
                <Card.Body>
                    <Card.Title>{`Fee ID: ${id}`}</Card.Title>
                    <Badge bg="dark" text="light" className="mx-1">
                        {`Student ID: ${studentId}`}
                    </Badge>
                    <Card.Text>
                        <p>{`Course ID: ${courseId}`}</p>
                        <p>{`Amount: ${amount}`}</p>
                    </Card.Text>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Stack direction="horizontal" gap={3}>
                                <UpdateFee feeId={id} />
                                <DeleteFee deleteFee={handleDeleteFee} />
                            </Stack>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
};

Fee.propTypes = {
    fee: PropTypes.instanceOf(Object).isRequired,
    deleteFee: PropTypes.func.isRequired,
};

export default Fee;
