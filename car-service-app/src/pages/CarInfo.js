import { useState } from 'react';
import axios from 'axios';


function CarInfo() {
    const [carId, setCarId] = useState('');
    const [carEventData, setCarEventData] = useState('');
    const [carData, setCarData] = useState('');

    const refreshPage = () => {
        window.location.reload();
    }

    const handleChange = event => {
        setCarId(event.target.value);
        console.log('Car ID field:', event.target.value);
    };

    const getCarData = () => {
        axios
            .get(`http://localhost:5000/api/cars?CAR_ID=${carId}`)
            .then(response => {
                console.log('Car Data:', response.data);
                setCarData(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteCar = () => {
        axios
            .delete(`http://localhost:5000/api/cars?CAR_ID=${carId}`)
            .then(response => {
                console.log('Car Data:', response.data);
                alert('Car deleted successfully');
                refreshPage();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getServicehistory = () => {
        axios
            .get(`http://localhost:5000/api/events/car?CAR_ID=${carId}`)
            .then((res) => {
                setCarEventData(res.data);
                getCarData();
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const deleteServicehistory = (eventId) => {
        axios
            .delete(`http://localhost:5000/api/events?EVENT_ID=${eventId}`)
            .then((res) => {
                console.log(res);
                getServicehistory();
                if (res.status === 200) {
                    alert('Event deleted successfully');
                }

            })
            .catch((err) => {
                console.log(err);
            })
    };


    return (
        <>


            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <a href="#" onClick={refreshPage}>Refresh Page</a>
                <h1>Car Service App</h1>
                

                <div>
                    <input type={'text'} id={'car-id'} name={'car-id'} value={carId} onChange={handleChange} onKeyPress={event => {
                        if (event.key === 'Enter') {
                            getServicehistory();
                        }
                    }} />
                    <button onClick={() => {
                        getServicehistory()
                    }}>Get Car Data
                    </button>
                </div>
                <div><button onClick={() => {
                    window.location.href = '/add-car';
                }}>Add Car
                </button></div>
            </div>
           
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

                <h2>Car Details</h2>
                {Object.keys(carData).length > 0 && (

                    <div style={{
                        margin: 'auto',
                        width: '50%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '20px'
                    }}>
                        <p style={{ border: '1px solid black' }}>Car ID: {carData[0]["ID"]}</p>
                        <p style={{ border: '1px solid black' }}>Car Name: {carData[0]["CAR_NAME"]}</p>
                        <p style={{ border: '1px solid black' }}>Car Brand: {carData[0]["CAR_BRAND"]}</p>
                        <p style={{ border: '1px solid black' }}>Car Model: {carData[0]["CAR_MODEL"]}</p>
                        <p style={{ border: '1px solid black' }}>Car Year: {carData[0]["CAR_YEAR"]}</p>
                        <p style={{ border: '1px solid black' }}>Car Plate: {carData[0]["CAR_PLATE"]}</p>
                        <button onClick={() => { deleteCar(carData[0]["ID"]) }}>Delete Car</button>
                        <button onClick={() => { window.location.href = `/edit-car/${carData[0]["ID"]}` }}>Edit Car</button>
                    </div>
                )}
            </div>

                
            



            <div style={{
                display: 'flex',
                margin: 'auto',
                width: '50%',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '20px',
                flexDirection: 'column'
            }}>
                <button onClick={() => {
                    window.location.href = '/add-event';
                }}>Add Service Event
                </button>
                <h2>Service History</h2>
                <table>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>Car ID</th>
                            <th style={{ border: '1px solid black' }}>Event ID</th>
                            <th style={{ border: '1px solid black' }}>Event Description</th>
                            <th style={{ border: '1px solid black' }}>Event Date</th>
                            <th style={{ border: '1px solid black' }}>Event Mileage</th>
                            <th style={{ border: '1px solid black' }}>Repeatable</th>
                            <th style={{ border: '1px solid black' }}>Next Date</th>
                            <th style={{ border: '1px solid black' }}>Next Mileage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(carEventData).map(function (keyName, keyIndex) {
                            return (
                                <tr key={carEventData[keyName]["ID"]}>
                                    <td style={{ border: '1px solid black' }}>{carEventData[keyName]["CAR_ID"]}</td>
                                    <td style={{ border: '1px solid black' }}>{carEventData[keyName]["ID"]}</td>
                                    <td style={{ border: '1px solid black' }}>{carEventData[keyName]["EVENT_DESCRITION"]}</td>
                                    <td style={{ border: '1px solid black' }}>{carEventData[keyName]["EVENT_DATE"]}</td>
                                    <td style={{ border: '1px solid black' }}>{carEventData[keyName]["EVENT_MILLAGE"]}</td>
                                    <td style={{ border: '1px solid black' }}>{carEventData[keyName]["EVENT_REPEATABLE"]}</td>
                                    <td style={{ border: '1px solid black' }}>{carEventData[keyName]["NEXT_EVENT_DATE"]}</td>
                                    <td style={{ border: '1px solid black' }}>{carEventData[keyName]["NEXT_EVENT_MILLAGE"]}</td>
                                    <td style={{ border: '1px solid black' }}>
                                        <button onClick={() => {
                                            deleteServicehistory(carEventData[keyName]["ID"])
                                        }}>Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}


export default CarInfo;
