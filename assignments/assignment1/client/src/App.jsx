import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [edu, setEdu] = useState([]);
  const [exp, setExp] = useState([]);
  const [overview, setOverview] = useState({});

  useEffect(() => {
    fetch('http://localhost:8000/getEdu').then(res => res.json()).then(setEdu);
    fetch('http://localhost:8000/getExp').then(res => res.json()).then(setExp);
    fetch('http://localhost:8000/getOverview').then(res => res.json()).then(setOverview);
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">{overview.name}</h1>
      <h3 className="text-center text-secondary">{overview.title}</h3>
      <p className="text-center">{overview.summary}</p>

      <hr />

      <section>
        <h2>Education</h2>
        {edu.map((item, index) => (
          <div key={index} className="mb-3">
            <h5>{item.school}</h5>
            <p>{item.degree}</p>
            <small>{item.year}</small>
          </div>
        ))}
      </section>

      <hr />

      <section>
        <h2>Experience</h2>
        {exp.map((item, index) => (
          <div key={index} className="mb-3">
            <h5>{item.company}</h5>
            <p>{item.role}</p>
            <small>{item.duration}</small>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
