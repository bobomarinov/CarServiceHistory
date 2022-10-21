import { useState } from 'react';
import axios from 'axios';

const EventAdd = ({ }) => {




    const [CAR_ID, setCarId] = useState('');
    const [EVENT_DATE, setEventDate] = useState('');
    const [EVENT_MILLAGE, setEventMillage] = useState('');
    const [EVENT_DESCRITION, setEventDescription] = useState('');
    const [EVENT_REPEATABLE, setEventRepeatable] = useState('');
    const [NEXT_EVENT_DATE, setNextEventDate] = useState('');
    const [NEXT_EVENT_MILLAGE, setNextEventMillage] = useState('');
    console.log('Car ID:', CAR_ID);

    let address = '78.130.158.235';
    const returnToHome = () => {
        window.location.href = '/';
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const handleChange = event => {
        setCarId(event.target.value);
        console.log('Car ID field:', event.target.value);
    }


    const handleChangeDate = event => {
        setEventDate(event.target.value);
        console.log('Event Date field:', event.target.value);
    }

    const handleChangeMillage = event => {
        setEventMillage(event.target.value);
        console.log('Event Millage field:', event.target.value);
    }

    const handleChangeDescription = event => {
        setEventDescription(event.target.value);
        console.log('Event Description field:', event.target.value);
    }

    const handleChangeRepeatable = event => {
        setEventRepeatable(event.target.value);
        console.log('Event Repeatable field:', event.target.value);
    }

    const handleChangeNextEventDate = event => {
        setNextEventDate(event.target.value);
        console.log('Next Event Date field:', event.target.value);
    }

    const handleChangeNextEventMillage = event => {
        setNextEventMillage(event.target.value);
        console.log('Next Event Millage field:', event.target.value);
    }

    const addEvent = () => {
        axios
            .post(`http://${address}:5000/api/events?CAR_ID=${CAR_ID}&EVENT_DATE=${EVENT_DATE}&EVENT_MILLAGE=${EVENT_MILLAGE}&EVENT_DESCRITION=${EVENT_DESCRITION}&EVENT_REPEATABLE=${EVENT_REPEATABLE}&NEXT_EVENT_DATE=${NEXT_EVENT_DATE}&NEXT_EVENT_MILLAGE=${NEXT_EVENT_MILLAGE}`)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    alert('Event added successfully');
                    refreshPage();
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: '50px',
                width: '30%'
            }}>
                <a href="#" onClick={returnToHome}>Return to Home</a>
                <h1>Car Service History</h1>
            
                <h2>Add Event</h2>

                    <label>Car Plate</label>
                    <input type="text" value={CAR_ID} onChange={handleChange} />


                    <label>Event Date</label>
                    <input type="date" onChange={handleChangeDate} />

                    <label>Event Millage</label>
                    <input type="number" onChange={handleChangeMillage} />

                    <label>Event Description</label>
                    <input type="text" onChange={handleChangeDescription} />

                    <label>Event Repeatable</label>
                    <input type="radio" onChange={handleChangeRepeatable} />

                    <label>Next Event Date</label>
                    <input type="date" onChange={handleChangeNextEventDate} />

                    <label>Next Event Millage</label>
                    <input type="number" onChange={handleChangeNextEventMillage} />

                <button onClick={addEvent}>Add Event</button>
                <button onClick={refreshPage}>Refresh</button>
        </div>

    );
}

export default EventAdd;