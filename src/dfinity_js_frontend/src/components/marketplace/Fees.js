import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { Row, Button, Form } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { payCourseFee, updateCourseFee, getStudentFees, getCourseFees } from "../../utils/marketplace";

const Fees = () => {
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [feeAmount, setFeeAmount] = useState(0);
  const [studentFees, setStudentFees] = useState([]);
  const [courseFees, setCourseFees] = useState([]);

  const handlePayFee = async () => {
    try {
      setLoading(true);
      await payCourseFee(studentId, { courseId, amount: feeAmount });
      toast(<NotificationSuccess text="Fee paid successfully." />);
      await fetchStudentFees(studentId);
      await fetchCourseFees(courseId);
    } catch (error) {
      console.error("Error paying fee:", error);
      toast(<NotificationError text="Failed to pay fee." />);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFee = async () => {
    try {
      setLoading(true);
      await updateCourseFee(studentId, courseId, feeAmount);
      toast(<NotificationSuccess text="Fee updated successfully." />);
      await fetchStudentFees(studentId);
      await fetchCourseFees(courseId);
    } catch (error) {
      console.error("Error updating fee:", error);
      toast(<NotificationError text="Failed to update fee." />);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentFees = async (studentId) => {
    try {
      setLoading(true);
      const fees = await getStudentFees(studentId);
      setStudentFees(fees);
    } catch (error) {
      console.error("Error fetching student fees:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseFees = async (courseId) => {
    try {
      setLoading(true);
      const fees = await getCourseFees(courseId);
      setCourseFees(fees);
    } catch (error) {
      console.error("Error fetching course fees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data (if needed)
  }, []);

  return (
    <div>
      <h1>Fees</h1>
      <div className="mb-3">
        <Form.Group controlId="studentId">
          <Form.Label>Student ID</Form.Label>
          <Form.Control type="text" placeholder="Enter student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="courseId">
          <Form.Label>Course ID</Form.Label>
          <Form.Control type="text" placeholder="Enter course ID" value={courseId} onChange={(e) => setCourseId(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="feeAmount">
          <Form.Label>Fee Amount</Form.Label>
          <Form.Control type="number" placeholder="Enter fee amount" value={feeAmount} onChange={(e) => setFeeAmount(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={handlePayFee} disabled={loading}>
          Pay Fee
        </Button>
        <Button variant="primary" onClick={handleUpdateFee} disabled={loading}>
          Update Fee
        </Button>
      </div>
      <h2>Student Fees</h2>
      {loading ? (
        <Loader />
      ) : (
        <ul>
          {studentFees.map((fee) => (
            <li key={fee.id}>
              {`Course: ${fee.courseId}, Amount: ${fee.amount}`}
            </li>
          ))}
        </ul>
      )}
      <h2>Course Fees</h2>
      {loading ? (
        <Loader />
      ) : (
        <ul>
          {courseFees.map((fee) => (
            <li key={fee.id}>
              {`Student: ${fee.studentId}, Amount: ${fee.amount}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Fees;
