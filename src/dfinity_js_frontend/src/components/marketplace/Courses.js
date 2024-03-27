import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { Row, Button, InputGroup, Form } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { addCourse, deleteCourse, updateCourse, getCourses } from "../../utils/marketplace";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseCredits, setCourseCredits] = useState(0);

  const addNewCourse = async (data) => {
    try {
      setLoading(true);
      await addCourse(data);
      toast(<NotificationSuccess text="Course added successfully." />);
      await fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error);
      toast(<NotificationError text="Failed to add course." />);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const fetchedCourses = await getCourses();
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      setLoading(true);
      await deleteCourse(courseId);
      toast(<NotificationSuccess text="Course deleted successfully." />);
      await fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      toast(<NotificationError text="Failed to delete course." />);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourse = async (courseId, updatedCourse) => {
    try {
      setLoading(true);
      await updateCourse(courseId, updatedCourse);
      toast(<NotificationSuccess text="Course updated successfully." />);
      await fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error);
      toast(<NotificationError text="Failed to update course." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      <div className="mb-3">
        <Form.Group controlId="courseTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter course title" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="courseDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter course description" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="courseCredits">
          <Form.Label>Credits</Form.Label>
          <Form.Control type="number" placeholder="Enter course credits" value={courseCredits} onChange={(e) => setCourseCredits(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={addNewCourse} disabled={loading}>
          Add Course
        </Button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {courses.map((course) => (
            <div key={course.id}>
              <CourseCard course={course} onDelete={handleDeleteCourse} onUpdate={handleUpdateCourse} />
            </div>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Courses;
