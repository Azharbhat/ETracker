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
  const [data, setData] = useState([]);

    const [amount,setAmount]=useState('')
    const [note,setNote]=useState('')
    const [selectedValue, setSelectedValue] = useState('Self');
       //date and time code
       const [dateTime, setDateTime] = useState(new Date());
       const [savedDateTime, setSavedDateTime] = useState(null);
   
       useEffect(() => {
         const intervalId = setInterval(() => {
           setDateTime(new Date());
         }, 1000);
     
         return () => clearInterval(intervalId);
       }, []);
     
       const formattedDateTime = () => {
         const options = {
           hour: 'numeric',
           minute: 'numeric',
           second: 'numeric',
           day: 'numeric',
           weekday: 'long',
           month: 'long',
           year: 'numeric',
         };
     
         return dateTime.toLocaleString('en-US', options);
       };
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
  
      console.log(`Selected Value: ${event.target.value}`);
    };

    useEffect(()=>{
      axios.get(`http://localhost:3000/Home`).then((res)=>{
        setData(res.data)
      }).catch(()=>{
        console.log('error')
      })
    },[])
    const handleSelect =async (eventKey, event) => {
      const currentDateTime = new Date().toLocaleString();
      setSavedDateTime(currentDateTime);
      const userName="azhar"
      try{
        await axios.post(`http://localhost:3000/Home`,{
          selectedValue, note,amount,currentDateTime
        }).then((res)=>{
          if(res.data=='inserted'){
            alert("inserted")
            setAmount('')
            setNote('')
          }
          else{
            alert("NotInserted")
          }
        }).catch((err)=>{
          console.log('somme error')
        })
      }
      catch(err){
        console.log(err);
      }
    };


    const [selectedOption, setSelectedOption] = useState('daily');

                     // filter data
                     const [selectedInterval, setSelectedInterval] = useState('weekly');
                     const [filteredData, setFilteredData] = useState([]);
                   
                     const mongoDBData = data.map((item) => ({
                      date: item.date
                    }));
                    
                   
                     // ...

useEffect(() => {
  const formatData = () => {
    return mongoDBData.map(item => ({
      ...item,
      date: new Date(item.date),
    }));
  };

  const filterData = (data) => {
    switch (selectedOption) {
      case 'daily':
        return filterByInterval(data, 'daily');
      case 'weekly':
        return filterByInterval(data, 'weekly');
      case 'monthly':
        return filterByInterval(data, 'monthly');
      case 'yearly':
        return filterByInterval(data, 'yearly');
      default:
        return data;
    }
  };

  const filterByInterval = (data, interval) => {
    const currentDate = new Date();

    switch (interval) {
      case 'daily':
        // Filter data for the current day
        return data.filter(item => isSameDay(new Date(item.date), currentDate));
      case 'weekly':
        // Filter data for the current week
        return filterWeekly(data, currentDate);
      case 'monthly':
        // Filter data for the current month
        return filterMonthly(data, currentDate);
      case 'yearly':
        // Placeholder logic to filter data for the current year
        return data.filter(item => new Date(item.date).getFullYear() === currentDate.getFullYear());
      default:
        return data;
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const filterWeekly = (data, currentDate) => {
    // Placeholder logic to filter data based on weeks within the current month
    // ...

    return data; // Return the filtered data
  };

  const filterMonthly = (data, currentDate) => {
    // Placeholder logic to filter data for the current month
    // ...

    return data; // Return the filtered data
  };

  const formattedData = formatData();
  const filteredResult = filterData(formattedData);
  setFilteredData(filteredResult);
}, [selectedOption, mongoDBData]);

// ...
 //check box
  const handleCheckboxChange = (event) => {
    setSelectedOption(event.target.value);
  };
                

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px',position:'fixed',width:'100%' }}>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand >Etracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/Signup">About</Nav.Link>
            <NavDropdown title="Services" id="basic-nav-dropdown">
              <NavDropdown.Item href="#service1">Service 1</NavDropdown.Item>
              <NavDropdown.Item href="#service2">Service 2</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#more-services">More Services</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
           <Link to="/Create" style={{textDecoration:'none',color:'inherit'}}>Create</Link>
          </Nav>
          
        </Navbar.Collapse>
        <p style={{alignItems:'end',fontSize:'large'}}>{formattedDateTime()}</p>
      </Navbar>
      <div>
       <div className='hContainer'> 
       {/*First div */}
       <div className='hContainer-item1'><BarChart data={data}/></div>
{/* second div */}
<div className='hContainer-item2'>
  <h1 style={{}}>DATA</h1>
  
  {data.map((item) => (
    <div className='data' key={data._id}>
    
        <h5>{item.item}</h5>
        <p>{item.date}</p>
        <h5>{item.amount}</h5>
    </div>
  ))}
</div>

       {/*First div */}
       <div className='hContainer-item3'>
       <h1></h1>
       <p>self</p>
       <p>family</p>
       </div>
       <div className='hContainer-item4'>
       <div className='checkbox-item'>
       <label>
       Daily
     </label>
     <input className='checkbox-container'
     type="checkbox"
     name="option"
     value="option1"
     checked={selectedOption === 'option1'}
     onChange={handleCheckboxChange}
   />
       </div>
       <div className='checkbox-item'>
       <label>
       weekly
     </label>
     <input className='checkbox-container'
     type="checkbox"
     name="option"
     value="option2"
     checked={selectedOption === 'option2'}
     onChange={handleCheckboxChange}
   />
       </div>
       <div className='checkbox-item'>
       <label>
       Monthly
     </label>
     <input className='checkbox-container'
     type="checkbox"
     name="option"
     value="option3"
     checked={selectedOption === 'option3'}
     onChange={handleCheckboxChange}
   />
       </div>
       <div className='checkbox-item'>
       <label>
       Yearly
     </label>
     <input className='checkbox-container'
     type="checkbox"
     name="option"
     value="option4"
     checked={selectedOption === 'option4'}
     onChange={handleCheckboxChange}
   />
       </div>
       
       </div>
      {/*First div */}
       
       {/*First div */}
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
                <select id="mySelect" value={selectedValue} onChange={handleChange}>

                <option value="self">self</option>
                <option value="family">family</option>
                <option value="option3">Option 3</option>
              </select><br></br>
             <input type='text'  placeholder='Enter Note' onChange={(e)=>setNote(e.target.value)}/>
             <input type='number'  placeholder='Enter Amount'  onChange={(e)=>setAmount(e.target.value)}/>
              <Button style={{width:100}} onClick={handleSelect}>Submit</Button>
          </div>
    </div>
    </div>
    </div>
      
    </div>
  );
};

export default Home;
