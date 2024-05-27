import React, { useEffect, useState } from 'react';
import './create.css'; // Import your CSS file
import axios from 'axios';
import DateTimeDisplay from './DateTimeDisplay';

const MyForm = () => {
  const [selectedOption, setSelectedOption] = useState('Single');
  const [textInput, setTextInput] = useState('');
  const [groupId, setGroupId] = useState(''); // State to store the group ID
  const userId = localStorage.getItem("userId");
  const [sources, setsources] = useState('daily');
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, [userId]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/item`, { userId });
      setData(response.data.items);
      setsources(response.data.sources);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const postData = {
        selectedOption,
        textInput,
        user:userId
      };

      if (selectedOption === 'Group') {
        // Add the groupId to the post data if the selected option is 'Group'
        postData.groupId = groupId;
      }

      const response = await axios.post(`http://localhost:9000/api/item/createSource`, postData);
      console.log("Data submitted:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle the error, such as displaying an error message to the user
    }
  }; 

  return (
    <div className="my-form-container">
      <label htmlFor="selectBar">Select Option:</label>
      <select
        id="selectBar"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="select-bar"
      >
        <option value="self">Single</option>
        <option value="Group">Group</option>
      </select>

      <label htmlFor="textInput">Text Input:</label>
      <input
        type="text"
        id="textInput"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        className="text-input"
      />

      {selectedOption === 'Group' && ( // Display group ID input only if 'Group' is selected
        <div>
          <label htmlFor="groupIdInput">Group ID:</label>
          <input
            type="text"
            id="groupIdInput"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="group-id-input"
          />
        </div>
      )}

      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
      <DateTimeDisplay />
    </div>
  );
};

export default MyForm;
