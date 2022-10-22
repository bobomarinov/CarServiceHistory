import { useState } from 'react';
import axios from 'axios';

const CarAdd = () => {
    const [CAR_NAME, setCarName] = useState('');
    const [CAR_BRAND, setCarBrand] = useState('');
    const [CAR_MODEL, setCarModel] = useState('');
    const [CAR_YEAR, setCarYear] = useState('');
    const [CAR_PLATE, setCarPlate] = useState('');

    let address = '78.130.158.235';

    const refreshPage = () => {
        window.location.reload();
    }

    const returnToHome = () => {
        window.location.href = '/';
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
            .post(`http://${address}:5000/api/cars?CAR_NAME=${CAR_NAME}&CAR_BRAND=${CAR_BRAND}&CAR_MODEL=${CAR_MODEL}&CAR_YEAR=${CAR_YEAR}&CAR_PLATE=${CAR_PLATE}`)
            .then(response => {
                console.log('Car Data:', response.data);
                //alet car add read string from response
                if (response.data === 'Car with the same plate already exists') {
                    alert(response.data);
                }
                else {
                    alert('Car added successfully with ID: ' + response.data);
                    refreshPage();
                }

            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container"
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: '50px',
            width: '50%'
        }}>
            <a href="#" onClick={returnToHome}>Return to Home</a>
            <h1>Add Car</h1>

                    <label>Car Name</label>
                    <input type="text" onChange={handleChange} />


                    <label>Car Brand</label>
                    <input type="text" onChange={handleChangeBrand} />


                    <label>Car Model</label>
                    <input type="text" onChange={handleChangeModel} />


                    <label>Car Year</label>
                    <input type="text" onChange={handleChangeYear} />


                    <label>Car Plate</label>
                    <input type="text" onChange={handleChangePlate} />


                <button onClick={addCar}>Add Car</button>

            </div>
    );
}

export default CarAdd;


