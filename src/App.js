import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';
import { ColorRing } from 'react-loader-spinner';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setisLoading] = useState(false);
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
      setisLoading(true)
      const parsedInput = JSON.parse(jsonInput);

      const res = await axios.post('https://bajaj-backend-1-uzex.onrender.com/bfhl', parsedInput);

      setResponse(res.data);
      setError('');
      setisLoading(false)
    } catch (err) {
      setisLoading(false)
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
        {isLoading ? <ColorRing
          visible={true}
          height="40"
          width="40"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        /> : <div className='submitspan'>Submit</div>}
      </button>
      <div className='warning'>It might take some time for the backend to start as it is hosted in the free tier of Render</div>

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

