import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Button, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css'
import axios from 'axios';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import PieChart from '../Charts/PieChart';

const Home = () => {
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedValue, setSelectedValue] = useState('Self');
  const [sourcess, setsources] = useState('');
  const [selectedOption,setSelectedOption]=useState('')
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/item`, { userId });
      setData(response.data.items);
      setsources(response.data.sources);
      console.log(sourcess)
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setSelectedOption(event.target.value);
    // You can implement filtering logic based on the selected option here
  };

  const handlesubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post(`http://localhost:9000/api/item`, {
        selectedValue,
        note,
        amount,
        user: userId
      });
      console.log("Data submitted:", response.data);
      setNote("");
      setAmount("");
      // Optionally, you can update the UI or do something else after successful submission
      fetchData(); // Refresh the data after adding a new item
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle the error, such as displaying an error message to the user
    }
  };      
  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
  
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    
    const dateOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
  
    const formattedTime = dateTime.toLocaleTimeString(undefined, timeOptions);
    const formattedDate = dateTime.toLocaleDateString(undefined, dateOptions);
  
    return `${formattedTime} ${formattedDate}`;
  }
  

  return (
    <div className='hContainer'> 
    {/*First div */}
    <div className='hContainer-item1'><BarChart data={data}/></div>
{/* second div */}
<div className='hContainer-item2'>
  <h1 style={{}}>DATA</h1>
  
  {data.map((item, index) => (
    <div className='data' key={index}>
    <div style={{width:'10rem'}}><h5>{item.note}</h5></div>
      <p>{formatDateTime(item.createdAt)}</p>
      
      <h5>{item.amount}</h5>
    </div>
  ))}
  
</div>
<div>
<label htmlFor="mySelect">Select an option:</label>

</div>


       <div className='hContainer-item5'>
       <h1>Total Amount</h1>
       </div>
       <div className='hContainer-item6'>
       <LineChart data={data} />
        </div> 
        <div className='hContainer-item6'>
       <PieChart data={data}/>
        </div> 


        <div className='hContainer-item7'>
        <div className='entry'>
        <h3 style={{textAlign:'center'}}>Add</h3>
        <div>
        {sourcess.length === 0 ? (
          <div>CreateSource...</div>
        ) : (
          <select id="mySelect" value={selectedValue} onChange={handleChange}>
            <option value="">Select an option</option>
            {/* Map over the sources array to generate dynamic options */}
            {sourcess.map((source, index) => (
              <option key={index} value={source.textInput}>{source.textInput}</option>
            ))}
          </select>
        )}
      </div><br></br>
              <input type='text'  placeholder='Enter Note' onChange={(e)=>setNote(e.target.value)}/>
              <input type='number'  placeholder='Enter Amount'  onChange={(e)=>setAmount(e.target.value)}/>   
              <button style={{width:100}} onClick={handlesubmit}>Submit</button>

     </div></div>
       
    </div>
  )
}

export default Home
