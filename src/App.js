import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);

      const res = await axios.post('http://localhost:5000/bfhl', parsedInput);

      setResponse(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Invalid JSON input or server error. Please check your input and try again.');
      setResponse(null);
    }
  };

  const handleDropdownChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        <h2>Response</h2>
        {selectedOptions.map(option => (
          <div key={option.value}>
            <strong>{option.label}:</strong> {JSON.stringify(response[option.value])}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <fieldset className="input-fieldset">
        <legend>API Input</legend>
        <textarea
          rows="5"
          cols="40"
          value={jsonInput}
          onChange={handleInputChange}
          placeholder='{"data":["M","1","334","4","B"]}'
          className="input-area"
        />
        <br />
      </fieldset>
      <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>

      {error && <div className="error-message">{error}</div>}

      {response && (
        <>
          <Select
            isMulti
            options={options}
            onChange={handleDropdownChange}
            className="multi-select"
            placeholder="Multi Filter"
          />
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;

