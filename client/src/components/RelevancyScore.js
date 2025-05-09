import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

const RelevancyScore = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [finalResume, setFinalResume] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setScore(null);
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5001/api/calculate-relevancy",
        {
          jobDescription,
          finalResume,
        }
      );
      setScore(res.data.score);
    } catch (err) {
      alert("Failed to calculate score. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="md" mx="auto" mt={4}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
        <Typography variant="h5" gutterBottom>
          📊 Calculate Relevancy Score
        </Typography>
        <form onSubmit={handleCalculate}>
          <TextField
            label="Job Description"
            multiline
            rows={5}
            fullWidth
            margin="normal"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
          <TextField
            label="Tailored Resume"
            multiline
            rows={5}
            fullWidth
            margin="normal"
            value={finalResume}
            onChange={(e) => setFinalResume(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Calculate Score"}
          </Button>
        </form>

        {score !== null && (
          <Box mt={4}>
            <Typography variant="h6">Relevancy Score: {score}/100</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default RelevancyScore;
