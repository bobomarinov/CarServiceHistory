import './App.css';
import { useState } from 'react';
import axios from 'axios';

const CarAdd = () => {
    const [CAR_NAME, setCarName] = useState('');
    const [CAR_BRAND, setCarBrand] = useState('');
    const [CAR_MODEL, setCarModel] = useState('');
    const [CAR_YEAR, setCarYear] = useState('');
    const [CAR_PLATE, setCarPlate] = useState('');

    const refreshPage = () => {
        window.location.reload();
    }

    const handleChange = event => {
        setCarName(event.target.value);
        console.log('Car Name field:', event.target.value);
    };

    const handleChangeBrand = event => {
        setCarBrand(event.target.value);
        console.log('Car Brand field:', event.target.value);
    };

    const handleChangeModel = event => {
        setCarModel(event.target.value);
        console.log('Car Model field:', event.target.value);
    };

    const handleChangeYear = event => {
        setCarYear(event.target.value);
        console.log('Car Year field:', event.target.value);
    };

    const handleChangePlate = event => {
        setCarPlate(event.target.value);
        console.log('Car Plate field:', event.target.value);
    };

    const addCar = () => {
        axios
            .post(`http://localhost:5000/api/cars?CAR_NAME=${CAR_NAME}&CAR_BRAND=${CAR_BRAND}&CAR_MODEL=${CAR_MODEL}&CAR_YEAR=${CAR_YEAR}&CAR_PLATE=${CAR_PLATE}`)
            .then(response => {
                console.log('Car Data:', response.data);
                alert('Car added successfully');
                refreshPage();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="App">
            <h1>Add Car</h1>
            <div className="form" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div className="car-name" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <label>Car Name</label>
                    <input type="text" onChange={handleChange} />
                </div>
                <div className="car-brand" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <label>Car Brand</label>
                    <input type="text" onChange={handleChangeBrand} />
                </div>
                <div className="car-model" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <label>Car Model</label>
                    <input type="text" onChange={handleChangeModel} />
                </div>
                <div className="car-year" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <label>Car Year</label>
                    <input type="text" onChange={handleChangeYear} />
                </div>
                <div className="car-plate" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <label>Car Plate</label>
                    <input type="text" onChange={handleChangePlate} />
                </div>
                <button onClick={addCar}>Add Car</button>
            </div>
        </div>
    );
}

export default CarAdd;


