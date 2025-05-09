# AI Resume Optimizer

A full-stack web application that helps users optimize their resumes for specific job descriptions using Google's Gemini API. The application generates tailored resume sections in STAR format and calculates relevancy scores.

## Features

- Generate tailored resume sections using STAR format
- Output in LaTeX format compatible with Overleaf
- Calculate relevancy score between resume and job description
- Modern, responsive UI with Material-UI
- In-memory storage (no database required)

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: Node.js with Express.js
- AI: Google Gemini API
- Styling: Material-UI components
- Code Highlighting: react-syntax-highlighter

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Gemini API key

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd ai-resume-optimizer
```

2. Install backend dependencies:

```bash
cd server
npm install
```

3. Create a `.env` file in the server directory:

```
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

4. Install frontend dependencies:

```bash
cd ../client
npm install
```

## Running the Application

1. Start the backend server:

```bash
cd server
npm start
```

2. In a new terminal, start the frontend development server:

```bash
cd client
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Paste a job description in the first text area
2. Paste your resume content (experience, projects, or skills) in the second text area
3. Click "Tailor My Resume" to generate optimized content
4. Copy the generated LaTeX code and use it in Overleaf
5. Use the Relevancy Score calculator to check how well your final resume matches the job description

## Security Notes

- The Gemini API key is stored securely in the backend
- Input validation is performed on both frontend and backend
- No sensitive data is stored permanently

## License

MIT License
