// Import necessary modules and libraries
import { query, update, text, Record, StableBTreeMap, Variant, Vec, None, Some, Ok, Err, ic, Principal, Opt, nat64, Duration, Result, bool, Canister } from "azle";
import { Ledger, binaryAddressFromAddress, binaryAddressFromPrincipal, hexAddressFromPrincipal } from "azle/canisters/ledger";
import { v4 as uuidv4 } from "uuid";

// Define Record types for Student and Course
const Student = Record({
    id: text,
    name: text,
    age: nat64,
    email: text,
    courses: Vec(text), // List of course IDs
    balance: nat64 // Added balance field
});

const Course = Record({
    id: text,
    title: text,
    description: text,
    credits: nat64,
    students: Vec(text) // List of student IDs
});

// Define Record types for payload
const StudentPayload = Record({
    name: text,
    age: nat64,
    email: text
});

const CoursePayload = Record({
    title: text,
    description: text,
    credits: nat64
});

// Define Message variants
const Message = Variant({
    NotFound: text,
    InvalidPayload: text,
    OperationFailed: text,
    OperationCompleted: text
});

// Define Record types for Fee
const Fee = Record({
    id: text,
    studentId: text,
    courseId: text,
    amount: nat64
});

// Define Record types for payload
const FeePayload = Record({
    studentId: text,
    courseId: text,
    amount: nat64
});

// Define Message variants for fee-related operations
const FeeMessage = Variant({
    FeeNotFound: text,
    InsufficientBalance: text,
    FeePaid: text
});

// Define StableBTreeMaps for students and courses
const studentsStorage = StableBTreeMap(2, text, Student);
const coursesStorage = StableBTreeMap(3, text, Course);
const feesStorage = StableBTreeMap(4, text, Fee);

// Define Ledger canister initialization
const icpCanister = Ledger(Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai"));

// Export Canister
export default Canister({
    // Query methods

    // Get all students
    getStudents: query([], Vec(Student), () => studentsStorage.values()),

    // Get student by ID
    getStudent: query([text], Result(Student, text), (id) => {
        const studentOpt = studentsStorage.get(id);
        return studentOpt.match({
            Some: (student) => Ok(student),
            None: () => Err("Student not found")
        });
    }),

    // Get course by ID
    getCourse: query([text], Result(Course, text), (id) => {
        const courseOpt = coursesStorage.get(id);
        return courseOpt.match({
            Some: (course) => Ok(course),
            None: () => Err("Course not found")
        });
    }),

    // Update methods

    // Add a new student
    addStudent: update([StudentPayload], Result(Student, Message), (payload) => {
        if (typeof payload !== "object" || Object.keys(payload).length === 0) {
            return Err({ InvalidPayload: "Invalid payload" });
        }
        const student = { id: uuidv4(), ...payload, courses: [], balance: 0 }; // Added balance initialization
        studentsStorage.insert(student.id, student);
        return Ok(student);
    }),

    // Add a new course
    addCourse: update([CoursePayload], Result(Course, Message), (payload) => {
        if (typeof payload !== "object" || Object.keys(payload).length === 0) {
            return Err({ InvalidPayload: "Invalid payload" });
        }
        const course = { id: uuidv4(), ...payload, students: [] };
        coursesStorage.insert(course.id, course);
        return Ok(course);
    }),

    // Enroll a student to a course
    enrollStudent: update([text, text], Result(text, Message), (studentId, courseId) => {
        const studentOpt = studentsStorage.get(studentId);
        const courseOpt = coursesStorage.get(courseId);
        if (None.has(studentOpt) || None.has(courseOpt)) {
            return Err({ NotFound: "Student or Course not found" });
        }
        const student = studentOpt.get;
        const course = courseOpt.get;

        // Check if the student is already enrolled
        if (student.courses.includes(courseId)) {
            return Err({ OperationFailed: "Student is already enrolled in this course" });
        }

        // Update student and course records
        student.courses.push(courseId);
        studentsStorage.insert(studentId, student);
        course.students.push(studentId);
        coursesStorage.insert(courseId, course);

        return Ok(`Student ${studentId} enrolled in course ${courseId}`);
    }),

    // Unenroll a student from a course
    unenrollStudent: update([text, text], Result(text, Message), (studentId, courseId) => {
        const studentOpt = studentsStorage.get(studentId);
        const courseOpt = coursesStorage.get(courseId);
        if (None.has(studentOpt) || None.has(courseOpt)) {
            return Err({ NotFound: "Student or Course not found" });
        }
        const student = studentOpt.get;
        const course = courseOpt.get;

        // Check if the student is enrolled in the course
        const courseIndex = student.courses.indexOf(courseId);
        if (courseIndex === -1) {
            return Err({ OperationFailed: "Student is not enrolled in this course" });
        }

        // Update student and course records
        student.courses.splice(courseIndex, 1);
        studentsStorage.insert(studentId, student);
        const studentIndex = course.students.indexOf(studentId);
        course.students.splice(studentIndex, 1);
        coursesStorage.insert(courseId, course);

        return Ok(`Student ${studentId} unenrolled from course ${courseId}`);
    }),

    // Delete methods

    // Delete a student by ID
    deleteStudent: update([text], Result(text, Message), (id) => {
        const deletedStudentOpt = studentsStorage.remove(id);
        if (None.has(deletedStudentOpt)) {
            return Err({ NotFound: `Student with ID ${id} not found` });
        }
        return Ok(`Student with ID ${id} deleted successfully`);
    }),

    // Delete a course by ID
    deleteCourse: update([text], Result(text, Message), (id) => {
        const deletedCourseOpt = coursesStorage.remove(id);
        if (None.has(deletedCourseOpt)) {
            return Err({ NotFound: `Course with ID ${id} not found` });
        }
        return Ok(`Course with ID ${id} deleted successfully`);
    }),

    // Update methods

    // Update student information
    updateStudent: update([text, StudentPayload], Result(Student, Message), (id, payload) => {
        const studentOpt = studentsStorage.get(id);
        if (None.has(studentOpt)) {
            return Err({ NotFound: "Student not

 found" });
        }
        const student = studentOpt.get;

        // Update student fields
        if (payload.name) student.name = payload.name;
        if (payload.age) student.age = payload.age;
        if (payload.email) student.email = payload.email;

        studentsStorage.insert(id, student);

        return Ok(student);
    }),

    // Update course information
    updateCourse: update([text, CoursePayload], Result(Course, Message), (id, payload) => {
        const courseOpt = coursesStorage.get(id);
        if (None.has(courseOpt)) {
            return Err({ NotFound: "Course not found" });
        }
        const course = courseOpt.get;

        // Update course fields
        if (payload.title) course.title = payload.title;
        if (payload.description) course.description = payload.description;
        if (payload.credits) course.credits = payload.credits;

        coursesStorage.insert(id, course);

        return Ok(course);
    }),

    // Pay course fee
    payCourseFee: update([text, FeePayload], Result(text, FeeMessage), (studentId, payload) => {
        const studentOpt = studentsStorage.get(studentId);
        const courseOpt = coursesStorage.get(payload.courseId);
        if (None.has(studentOpt) || None.has(courseOpt)) {
            return Err({ FeeNotFound: "Student or Course not found" });
        }
        const student = studentOpt.get;
        const course = courseOpt.get;

        const totalFee = payload.amount;
        const studentBalance = student.balance || 0;

        if (studentBalance < totalFee) {
            return Err({ InsufficientBalance: "Insufficient balance to pay the fee" });
        }

        // Deduct fee from student's balance
        student.balance = studentBalance - totalFee;
        studentsStorage.insert(studentId, student);

        // Record the fee payment
        const fee = { id: uuidv4(), studentId, courseId: payload.courseId, amount: totalFee };
        feesStorage.insert(fee.id, fee);

        return Ok(`Fee of ${totalFee} paid successfully for course ${payload.courseId}`);
    }),

    // Update course fee
    updateCourseFee: update([text, text, nat64], Result(text, FeeMessage), (studentId, courseId, newFee) => {
        const studentOpt = studentsStorage.get(studentId);
        const courseOpt = coursesStorage.get(courseId);
        if (None.has(studentOpt) || None.has(courseOpt)) {
            return Err({ FeeNotFound: "Student or Course not found" });
        }

        // Find the fee associated with the provided student and course
        const existingFee = feesStorage.values().find(fee => fee.studentId === studentId && fee.courseId === courseId);
        if (!existingFee) {
            return Err({ FeeNotFound: "Fee not found for the student and course" });
        }

        // Update the fee amount
        existingFee.amount = newFee;
        feesStorage.insert(existingFee.id, existingFee);

        return Ok(`Course fee updated to ${newFee} for student ${studentId} in course ${courseId}`);
    }),

    // Get fees for a specific student
    getStudentFees: query([text], Vec(Fee), (studentId) => {
        return feesStorage.values().filter(fee => fee.studentId === studentId);
    }),

    // Get fees for a specific course
    getCourseFees: query([text], Vec(Fee), (courseId) => {
        return feesStorage.values().filter(fee => fee.courseId === courseId);
    })
});

// a workaround to make uuid package work with Azle
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    }
};
