const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load environmeconst authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// CORS configuration to handle preflight and actual requests
const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// Explicitly handle OPTIONS preflight requests
app.options("*", cors());

app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// In-memory storage
const resumeData = new Map();

// Routes
app.post("/api/tailor-resume", async (req, res) => {
  try {
    const { jobDescription, resumeContent } = req.body;

    if (!jobDescription || !resumeContent) {
      return res
        .status(400)
        .json({ error: "Job description and resume content are required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });

    const prompt = `You are an expert resume writer. Given this Job Description:
${jobDescription}

And the following resume content:
${resumeContent}

Rewrite the resume content using STAR format.
- Each bullet must include 3–5 results-driven achievement statements
- Start with an action verb, and include metrics ($, %, numbers)
- Use specific examples, avoid generalizations
- Use strong, overhyped adjectives
- Ensure the resume aligns directly with the JD
Output the results using Jake's Overleaf LaTeX resume format`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const tailoredResume = response.text();

    // Store in memory
    const id = Date.now().toString();
    resumeData.set(id, { jobDescription, resumeContent, tailoredResume });

    res.json({ id, tailoredResume });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate tailored resume" });
  }
});

app.post("/api/calculate-relevancy", async (req, res) => {
  try {
    const { jobDescription, finalResume } = req.body;

    if (!jobDescription || !finalResume) {
      return res
        .status(400)
        .json({ error: "Job description and final resume are required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });

    const prompt = `Calculate the relevancy score (0-100) between this job description and resume:

Job Description:
${jobDescription}

Resume:
${finalResume}

Consider:
1. Keyword matching
2. Skill alignment
3. Experience relevance
4. Overall fit

Return only a number between 0 and 100.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const score = parseInt(response.text().trim());

    res.json({ score });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to calculate relevancy score" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
