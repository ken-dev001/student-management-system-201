import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { Row, Button, InputGroup, Form } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { createStudent, deleteStudent, getStudents } from "../../utils/marketplace";
import AddStudent from "./AddStudent";
import StudentCard from "./StudentCard";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState(0);
  const [studentEmail, setStudentEmail] = useState("");

  const addNewStudent = async (data) => {
    try {
      setLoading(true);
      const ageStr = data.age;
      data.age = parseInt(ageStr);
      await createStudent(data);
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

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Students</h1>
        <AddStudent save={addNewStudent} />
      </div>
       
      {loading ? (
        <Loader />
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {students.map((student) => (
            <div key={student.id}>
              <StudentCard student={student} onDelete={handleDeleteStudent} />
            </div>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Students;
