import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';





function App() {
  const [message, setMessage] = useState('');
  const [carData, setData] = useState('');
 


  const handleChange = event => {
    setMessage(event.target.value);
    console.log('Car ID field:', event.target.value);
  };

  /*
  useEffect(() => {
    getServicehistory();
  }, []);
  */

  const getServicehistory = () => {
    axios
    .get(`http://localhost:5000//api/events/car?CAR_ID=${message}`)
    .then((res)=>{
      setData(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  const deleteServicehistory = (eventId) => {
    axios
    .delete(`http://localhost:5000/api/events?EVENT_ID=${eventId}`)
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
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
      <h2>Service History</h2>
      {Object.keys(carData).map(function(keyName, keyIndex) {
    		return (
      			<div key={keyName}>
              <h3>Event ID: {carData[keyName]["ID"]}</h3>
              <p>Car ID: {carData[keyName]["CAR_ID"]}</p>
              <p>Event Description: {carData[keyName]["EVENT_DESCRITION"]}</p>
              <p>Event Date: {carData[keyName]["EVENT_DATE"]}</p>
              <p>Event Mileage: {carData[keyName]["EVENT_MILLAGE"]}</p>
              <p>Repeatable: {carData[keyName]["EVENT_REPEATABLE"]}</p>
              <p>Next Date: {carData[keyName]["NEXT_EVENT_DATE"]}</p>
              <p>Next Mileage: {carData[keyName]["NEXT_EVENT_MILLAGE"]}</p>
              <button>Update</button>
              <button onClick={deleteServicehistory(carData[keyName]["ID"])}>Delete</button>
          		</div>
    		)
		})}
    </>
  );
}



export default App;
