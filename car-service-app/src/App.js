import './App.css';
import {useState} from 'react';
import axios from 'axios';





function App() {
  const [message, setMessage] = useState('');
  const [carData, setData] = useState('');


  const handleChange = event => {
    setMessage(event.target.value);
    console.log('Car ID field:', event.target.value);
  };


  const getServicehistory = async event => {
    event.preventDefault();
    console.log('Car ID:', message);
    //GET request with cross origin headers
    await fetch(`http://localhost:5000//api/events/car?CAR_ID=${message}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setData(data);
      console.log(typeof(data));
    }
    )
  };



  return (
    <>
      <input
        type={'text'}
        id={'car-id'}
        name={'car-id'}
        value={message}
        onChange={handleChange}
      />
      <button onClick={getServicehistory}>
        Show Service History
      </button>
      <p>Service History</p>

    </>
  );
}



export default App;
