import { Principal } from "@dfinity/principal";

// Define functions for interacting with the data marketplace

export async function createStudent(student) {
  return window.canister.marketplace.addStudent(student);
}

export async function getStudent() {
  try {
    return await window.canister.marketplace.getStudent();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

export async function getStudents() {
  try {
    return await window.canister.marketplace.getStudents();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function deleteStudent(id) {
  return window.canister.marketplace.deleteStudent(id);
}

// Define functions for managing courses

export async function createCourse(course) {
  return window.canister.marketplace.addCourse(course);
}

export async function getCourse() {
  try {
    return await window.canister.marketplace.getCourse();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return {};
  }
}

export async function getCourses() {
  try {
    return await window.canister.marketplace.getCourses();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function deleteCourse(id) {
  return window.canister.marketplace.deleteCourse(id);
}

// Define function for paying course fee

export async function payCourseFee(fee) {
  return window.canister.marketplace.addCourseFee(fee);
}

export async function getStudentFees() {
  try {
    return await window.canister.marketplace.getStudentFees();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function deleteFee(id) {
  return window.canister.marketplace.deleteFee(id);
}

// Define functions for managing student enrollment in courses

export async function enrollStudent(studentId, courseId) {
  return window.canister.marketplace.enrollStudent(studentId, courseId);
}

export async function unenrollStudent(studentId, courseId) {
  return window.canister.marketplace.unenrollStudent(studentId, courseId);
}
