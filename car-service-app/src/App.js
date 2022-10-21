import React, { Component } from 'react';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';

import CarInfo from './pages/CarInfo';
import CarAdd from './pages/CarAdd';
import EventAdd from './pages/EventAdd';

class App extends Component() {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<CarInfo />} />
                    <Route path="/add-car" element={<CarAdd />} />
                    <Route path="/add-event" element={<EventAdd />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
