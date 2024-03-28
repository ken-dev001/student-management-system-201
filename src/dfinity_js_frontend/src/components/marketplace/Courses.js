import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { Row, Button, InputGroup, Form } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { createCourse, deleteCourse, updateCourse, getCourses } from "../../utils/marketplace";
import AddCourse from "./AddCourse";
import CourseCard from "./CourseCard";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseCredits, setCourseCredits] = useState(0);

    const addNewCourse = async (data) => {
        try {
            setLoading(true);
            const creditsStr = data.credits;
            data.credits = parseInt(creditsStr);
            await createCourse(data);
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
            <div className="d-flex justify-content-between align-items-center">
                <h1>Courses</h1>
                <AddCourse save={addNewCourse} />
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
