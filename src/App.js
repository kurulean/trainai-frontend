import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    activity: '',
    time: '',
    goal: '',
    preference: ''
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult('');
    try {
      const res = await axios.post('https://trainai-backend.onrender.com/generate', formData);
      setResult(res.data.plan);
    } catch (err) {
      setResult('Error generating workout plan.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
    <img
      src={`${process.env.PUBLIC_URL}/logo.png`}
      alt="TrainAI Logo"
      className="logo"
    />
      <h1>TrainAI Workout Generator</h1>

      <div className="form-step">
        {step === 1 && (
          <>
            <input name="age" placeholder="Age" onChange={handleChange} required />
            <input name="height" placeholder="Height (cm)" onChange={handleChange} required />
            <input name="weight" placeholder="Weight (kg or lbs)" onChange={handleChange} required />
            <button onClick={() => setStep(2)}>Next</button>
          </>
        )}

        {step === 2 && (
          <>
            <select name="activity" onChange={handleChange} required>
              <option value="">Select Activity Level</option>
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="very">Very Active</option>
            </select>
            <button onClick={() => setStep(3)}>Next</button>
          </>
        )}

        {step === 3 && (
          <>
            <input name="time" placeholder="Workout time per day (e.g. 45 mins)" onChange={handleChange} required />
            <button onClick={() => setStep(4)}>Next</button>
          </>
        )}

        {step === 4 && (
          <>
            <input name="goal" placeholder="Your fitness goal (e.g. build muscle)" onChange={handleChange} required />
            <button onClick={() => setStep(5)}>Next</button>
          </>
        )}

        {step === 5 && (
          <>
            <select name="preference" onChange={handleChange} required>
              <option value="">Preferred Training Type</option>
              <option value="calisthenics">Calisthenics</option>
              <option value="gym">Gym</option>
              <option value="both">Both</option>
            </select>
            <button onClick={() => setStep(6)}>Next</button>
          </>
        )}

        {step === 6 && (
          <>
            <h3>Ready to generate your plan?</h3>
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Generating...' : 'Generate Plan'}
            </button>
          </>
        )}
      </div>

      {result && (
        <pre>{result}</pre>
      )}
    </div>
  );
}
