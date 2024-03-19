import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { Row, Button, InputGroup, Form } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { createStudent, deleteStudent, updateStudent, getStudents } from "../../utils/marketplace";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState(0);
  const [studentEmail, setStudentEmail] = useState("");

  const addNewStudent = async () => {
    try {
      setLoading(true);
      const newStudent = {
        name: studentName,
        age: studentAge,
        email: studentEmail
      };
      await createStudent(newStudent);
      toast(<NotificationSuccess text="Student added successfully." />);
      await fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
      toast(<NotificationError text="Failed to add student." />);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const fetchedStudents = await getStudents();
      setStudents(fetchedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      setLoading(true);
      await deleteStudent(studentId);
      toast(<NotificationSuccess text="Student deleted successfully." />);
      await fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      toast(<NotificationError text="Failed to delete student." />);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStudent = async (studentId, updatedStudent) => {
    try {
      setLoading(true);
      await updateStudent(studentId, updatedStudent);
      toast(<NotificationSuccess text="Student updated successfully." />);
      await fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
      toast(<NotificationError text="Failed to update student." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Students</h1>
      <div className="mb-3">
        <Form.Group controlId="studentName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter student name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="studentAge">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" placeholder="Enter student age" value={studentAge} onChange={(e) => setStudentAge(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="studentEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter student email" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={addNewStudent} disabled={loading}>
          Add Student
        </Button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {students.map((student) => (
            <div key={student.id}>
              <StudentCard student={student} onDelete={handleDeleteStudent} onUpdate={handleUpdateStudent} />
            </div>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Students;
