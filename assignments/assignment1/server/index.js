// assignment1/server/server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(cors());

// Overview Section
const overview = {
  name: "Anmol Jaswal",
  title: "Junior Software Developer",
  summary: "Enthusiastic learner with experience in JavaScript, React, Express, and SQL. Strong problem-solving skills, a collaborative mindset, and a passion for clean, maintainable code."
};

// Education Section
const edu = [
  {
    school: "Humber College",
    degree: "Diploma in Computer Programming",
    year: "2024 - 2025"
  },
  {
    school: "Mount Carmel Public School",
    degree: "High School Diploma",
    year: "2020 - 2021"
  }
];

// Experience Section
const exp = [
  {
    role: "Frontend Intern",
    company: "TechNova Solutions",
    years: "May 2024 - Aug 2024",
    description: "Worked with the frontend team to build React components and improve UI accessibility."
  },
  {
    role: "Part-time IT Assistant",
    company: "Humber College IT Dept.",
    years: "Jan 2024 - Apr 2024",
    description: "Assisted with system maintenance, basic troubleshooting, and tech support for students and faculty."
  }
];

// Routes
app.get('/getOverview', (req, res) => res.json(overview));
app.get('/getEdu', (req, res) => res.json(edu));
app.get('/getExp', (req, res) => res.json(exp));

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
