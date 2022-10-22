import {useState} from 'react';
import axios from 'axios';
//import css
import './carInfo.css';
import {Link} from 'react-router-dom';


function CarInfo() {
    const [carId, setCarId] = useState('');
    const [carEventData, setCarEventData] = useState('');
    const [carData, setCarData] = useState('');

    let address = '78.130.158.235';

    const refreshPage = () => {
        window.location.reload();
    }

    const handleChange = event => {
        setCarId(event.target.value);
        console.log('Car ID field:', event.target.value);
    };

    const getCarData = () => {
        axios
            .get(`http://${address}:5000/api/cars?CAR_ID=${carId}`)
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
            .delete(`http://${address}:5000/api/cars?CAR_ID=${carId}`)
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
            .get(`http://${address}:5000/api/events/car?CAR_ID=${carId}`)
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
            .delete(`http://${address}:5000/api/events?EVENT_ID=${eventId}`)
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


                <div style={{
                    alignContent: 'center',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%'
                }}>
                    <input type={'text'} id={'car-id'} name={'car-id'} value={carId} onChange={handleChange}
                           onKeyPress={event => {
                               if (event.key === 'Enter') {
                                   getServicehistory();
                               }
                           }}/>
                    <button onClick={() => {
                        getServicehistory()
                    }}>Get Car Data
                    </button>
                </div>

                <div style={{
                    display: "flex",
                    alignContent: "center",
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '50%'
                }}>
                    <button onClick={() => {
                        window.location.href = '/add-car';
                    }}>Add Car
                    </button>
                </div>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '80%'
            }}>

                <h2>Car Details</h2>
                {Object.keys(carData).length > 0 && (

                    <div style={{
                        margin: 'auto',
                        display: 'flex',
                        width: '80%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        alignContent: 'center',
                        fontSize: '15px',
                        fontFamily: 'system-ui',
                        flexDirection: 'column'
                    }}>
                        <div>Car ID: {carData[0]["ID"]}</div>
                        <div>Car Name: {carData[0]["CAR_NAME"]}</div>
                        <div>Car Brand: {carData[0]["CAR_BRAND"]}</div>
                        <div>Car Model: {carData[0]["CAR_MODEL"]}</div>
                        <div>Car Year: {carData[0]["CAR_YEAR"]}</div>
                        <div>Car Plate: {carData[0]["CAR_PLATE"]}</div>
                        <button onClick={() => {
                            deleteCar(carData[0]["ID"])
                        }}>Delete Car
                        </button>
                        <button onClick={() => {
                            window.location.href = `/edit-car/${carData[0]["ID"]}`
                        }}>Edit Car
                        </button>
                    </div>
                )}
            </div>


            <div style={{
                display: 'flex',
                margin: 'auto',
                width: '80%',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '16px',
                flexDirection: 'column'
            }}>

                <h2>Service History</h2>
                <button onClick={() => {
                    window.location.href = '/add-event';
                }}>Add Service Event


                </button>
                <table>
                    <thead>
                    <tr>
                        <th>Car ID</th>
                        <th>Event ID</th>
                        <th>Event Description</th>
                        <th>Event Date</th>
                        <th>Event Mileage</th>
                        <th>Repeatable</th>
                        <th>Next Date</th>
                        <th>Next Mileage</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(carEventData).map(function (keyName, keyIndex) {
                        return (
                            <tr key={carEventData[keyName]["ID"]}>
                                <td>{carEventData[keyName]["CAR_ID"]}</td>
                                <td>{carEventData[keyName]["ID"]}</td>
                                <td>{carEventData[keyName]["EVENT_DESCRITION"]}</td>
                                <td>{carEventData[keyName]["EVENT_DATE"]}</td>
                                <td>{carEventData[keyName]["EVENT_MILLAGE"]}</td>
                                <td>{carEventData[keyName]["EVENT_REPEATABLE"].toString()}</td>
                                <td>{carEventData[keyName]["NEXT_EVENT_DATE"]}</td>
                                <td>{carEventData[keyName]["NEXT_EVENT_MILLAGE"]}</td>
                                <td>
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
