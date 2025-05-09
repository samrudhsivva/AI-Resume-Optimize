import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Stack, Paper } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to AI Resume Optimizer 🎯
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          Choose a feature to get started:
        </Typography>

        <Stack spacing={2} mt={4}>
          <Button
            variant="contained"
            size="medium"
            onClick={() => navigate("/tailor")}
          >
            ✨ Tailor My Resume
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={() => navigate("/score")}
          >
            📊 Calculate Relevancy Score
          </Button>
          <Button variant="text" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Home;
