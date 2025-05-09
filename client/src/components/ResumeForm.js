import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";

const ResumeForm = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeContent, setResumeContent] = useState("");
  const [tailoredResume, setTailoredResume] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTailoredResume("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5001/api/tailor-resume", {
        jobDescription,
        resumeContent,
      });
      setTailoredResume(res.data.tailoredResume);
    } catch (err) {
      alert("Failed to tailor resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="md" mx="auto" mt={4}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
        <Typography variant="h5" gutterBottom>
          ✨ Tailor My Resume
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Job Description"
            multiline
            rows={6}
            fullWidth
            margin="normal"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
          <TextField
            label="Your Current Resume"
            multiline
            rows={6}
            fullWidth
            margin="normal"
            value={resumeContent}
            onChange={(e) => setResumeContent(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Tailor Resume"}
          </Button>
        </form>

        {tailoredResume && (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Tailored Resume Output
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                padding: 2,
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
              }}
            >
              {tailoredResume}
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ResumeForm;
