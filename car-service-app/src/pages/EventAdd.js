import { useState } from 'react';
import axios from 'axios';

const EventAdd = () => {
    const [CAR_ID, setCarId] = useState('');
    const [EVENT_DATE, setEventDate] = useState('');
    const [EVENT_MILLAGE, setEventMillage] = useState('');
    const [EVENT_DESCRITION, setEventDescription] = useState('');
    const [EVENT_REPEATABLE, setEventRepeatable] = useState('');
    const [NEXT_EVENT_DATE, setNextEventDate] = useState('');
    const [NEXT_EVENT_MILLAGE, setNextEventMillage] = useState('');

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
            .post(`http://localhost:5000/api/events?CAR_ID=${CAR_ID}&EVENT_DATE=${EVENT_DATE}&EVENT_MILLAGE=${EVENT_MILLAGE}&EVENT_DESCRITION=${EVENT_DESCRITION}&EVENT_REPEATABLE=${EVENT_REPEATABLE}&NEXT_EVENT_DATE=${NEXT_EVENT_DATE}&NEXT_EVENT_MILLAGE=${NEXT_EVENT_MILLAGE}`)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    alert('Event added successfully');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="container">
                <a href="#" onClick={returnToHome}>Return to Home</a>
                <h1>Car Service History</h1>
            
                <h2>Add Event</h2>

                    <label>Car ID</label>
                    <input type="text" onChange={handleChange} />

                    <label>Event Date</label>
                    <input type="text" onChange={handleChangeDate} />

                    <label>Event Millage</label>
                    <input type="text" onChange={handleChangeMillage} />

                    <label>Event Description</label>
                    <input type="text" onChange={handleChangeDescription} />

                    <label>Event Repeatable</label>
                    <input type="text" onChange={handleChangeRepeatable} />

                    <label>Next Event Date</label>
                    <input type="text" onChange={handleChangeNextEventDate} />

                    <label>Next Event Millage</label>
                    <input type="text" onChange={handleChangeNextEventMillage} />

                <button onClick={addEvent}>Add Event</button>
                <button onClick={refreshPage}>Refresh</button>
        </div>

    );
}

export default EventAdd;