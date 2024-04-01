import React, { useEffect, useCallback, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import "./App.css";
import coverImg from "./assets/img/sandwich.jpg";
import { login, logout as destroy } from "./utils/auth";
import Cover from "./components/utils/Cover";
import { Notification } from "./components/utils/Notifications";
import Student from "./components/marketplace/Students";
import Course from "./components/marketplace/Courses";

const App = function AppWrapper() {
  const isAuthenticated = window.auth.isAuthenticated;
 

  return (
    <>
    <Notification />
      {isAuthenticated ? (
        <Container fluid="md">
          <main>
            <Student />
            <Course />
          </main>
        </Container>
      ) : (
        <Cover name="marketplace" login={login} coverImg={coverImg} />
      )}
    </>
  );
};

export default App;