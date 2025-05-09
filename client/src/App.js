import React, { useState, useEffect } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import ResumeForm from "./components/ResumeForm";
import RelevancyScore from "./components/RelevancyScore";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#f5f7fa",
    },
  },
  typography: {
    fontFamily: "Segoe UI, Roboto, sans-serif",
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "medium",
      },
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  // Keep auth status updated even across tabs
  useEffect(() => {
    const checkToken = () => {
      setIsAuth(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="lg" sx={{ my: 4 }}>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={isAuth ? "/home" : "/login"} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/tailor"
              element={isAuth ? <ResumeForm /> : <Navigate to="/login" />}
            />
            <Route
              path="/score"
              element={isAuth ? <RelevancyScore /> : <Navigate to="/login" />}
            />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
